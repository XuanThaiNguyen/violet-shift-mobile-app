import { Button } from '@components/button';
import CalendarListCustom from '@components/calendar/CalendarListCustom';
import ExpendableCalendarCustom from '@components/calendar/ExpendableCalendarCustom';
import DrawerHeader from '@components/header/DrawerHeader';
import Loading from '@components/loading';
import { Spacer } from '@components/spacer';
import { IAvailibility, WeekDataAvailibility } from '@models/Availibility';
import Screen from '@navigation/screen';
import { useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import { DATE_FORMAT, getRangeByViewMode } from '@utils/handleDateTime';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AvailibilityItem from './components/AvailibilityItem';
import { useGetMyAvailibilities } from './hooks';
import { useStyles } from './styles';

const Availibility = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { navigate } = useNavigation();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); //Default: Today (format: 2025-09-29)
  const [isExpanded, setIsExpanded] = useState(false);

  const { fromUnix, toUnix } = getRangeByViewMode(date);

  const onSetAvailibility = () => {
    navigate(Screen.SetAvailibility);
  };

  const {
    data: myAvailibilities,
    refetch,
    isFetching,
  } = useGetMyAvailibilities({
    from: fromUnix,
    to: toUnix,
  });

  const weekData = useMemo(() => {
    const start = dayjs(date).startOf('week'); // Sunday
    const result: WeekDataAvailibility[] = [];

    for (let i = 0; i < 7; i++) {
      const current = start.add(i, 'day');
      const availibilityforDays = myAvailibilities?.data?.filter(
        (availibility: IAvailibility) =>
          dayjs(availibility.from).isSame(current, 'day'),
      );

      result.push({
        id: current.format(DATE_FORMAT.THIRD),
        date: current,
        leaves: availibilityforDays || [],
      });
    }

    return result;
  }, [myAvailibilities?.data, date]);

  const onReload = async () => {
    await refetch();
  };

  const onCloseCalendar = () => {
    setIsExpanded(false);
  };

  const onOpenCalendar = () => {
    setIsExpanded(true);
  };

  const _renderRightHeader = () => {
    return (
      <Button onPress={onReload}>
        <FastImage
          source={images.reload}
          style={styles.icon20}
          tintColor={colors.white}
        />
      </Button>
    );
  };

  const renderItem = ({ item }: { item: WeekDataAvailibility }) => {
    const dayLabel = item.date.format('dd');
    const dateLabel = item.date.format('D');

    return (
      <AvailibilityItem item={item} dayLabel={dayLabel} dateLabel={dateLabel} />
    );
  };

  return (
    <View style={styles.container}>
      <DrawerHeader
        renderRightHeader={_renderRightHeader}
        title={dayjs(date).format(DATE_FORMAT.FOUR)}
      />
      <View style={styles.container}>
        <ExpendableCalendarCustom
          date={date}
          onExpand={onOpenCalendar}
          isExpanded={isExpanded}
          setDate={setDate}
        />
        <CalendarListCustom
          visible={isExpanded}
          onExpand={onCloseCalendar}
          date={date}
          setDate={setDate}
        />
        <Spacer height={8} />
        <FlatList
          data={weekData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistContainer}
        />
      </View>
      <Button onPress={onSetAvailibility} style={styles.btnOnSet}>
        <FastImage
          source={images.add}
          style={styles.icon32}
          tintColor={colors.white}
        />
      </Button>

      <Loading isLoading={isFetching} />
    </View>
  );
};

export default Availibility;
