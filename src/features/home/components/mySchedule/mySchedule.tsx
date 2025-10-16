import { Button } from '@components/button';
import CalendarListCustom from '@components/calendar/CalendarListCustom';
import ExpendableCalendarCustom from '@components/calendar/ExpendableCalendarCustom';
import DrawerHeader from '@components/header/DrawerHeader';
import Loading from '@components/loading';
import { Spacer } from '@components/spacer';
import { useGetMyShiftSchedules } from '@features/home/hooks';
import { IStaffSchedule, WeekDataSchedule } from '@models/Shift';
import colors from '@themes/color';
import images from '@themes/images';
import { getRangeByViewMode } from '@utils/handleDateTime';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import MyScheduleItem from './myScheduleItem';

const HEADER_EXPANDABLE_CALENDAR_HEIGHT = 110;

const MySchedule = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); //Default: Today (format: 2025-09-29)

  const [isExpanded, setIsExpanded] = useState(false);

  const { fromUnix, toUnix } = getRangeByViewMode(date);

  const {
    data: myShiftSchedules,
    refetch,
    isFetching,
  } = useGetMyShiftSchedules({
    from: fromUnix,
    to: toUnix,
  });

  const weekData = useMemo(() => {
    const start = dayjs(date).startOf('week'); // Sunday
    const result: WeekDataSchedule[] = [];

    for (let i = 0; i < 7; i++) {
      const current = start.add(i, 'day');
      const shiftsForDay = myShiftSchedules?.data?.filter(
        (shift: IStaffSchedule) => dayjs(shift.timeFrom).isSame(current, 'day'),
      );

      result.push({
        id: current.format('YYYY-MM-DD'),
        date: current,
        shifts: shiftsForDay || [],
      });
    }

    return result;
  }, [myShiftSchedules?.data, date]);

  const onReload = async () => {
    await refetch();
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

  const renderItem = ({ item }: { item: WeekDataSchedule }) => {
    const dayLabel = item.date.format('dd');
    const dateLabel = item.date.format('D');

    return (
      <MyScheduleItem item={item} dateLabel={dateLabel} dayLabel={dayLabel} />
    );
  };

  return (
    <>
      <DrawerHeader
        renderRightHeader={_renderRightHeader}
        title={dayjs(date).format('MMM YYYY')}
      />
      <View style={styles.container}>
        <ExpendableCalendarCustom
          date={date}
          onExpand={() => setIsExpanded(true)}
          isExpanded={isExpanded}
          setDate={setDate}
        />
        {isExpanded ? (
          <CalendarListCustom
            onExpand={() => setIsExpanded(false)}
            date={date}
            setDate={setDate}
          />
        ) : (
          <></>
        )}
        <Spacer height={8} />
        <FlatList
          data={weekData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistContainer}
        />
      </View>

      <Loading isLoading={isFetching} />
    </>
  );
};

export default MySchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    marginTop: HEADER_EXPANDABLE_CALENDAR_HEIGHT,
    paddingBottom: 16,
  },
  icon20: {
    width: 20,
    height: 20,
  },
});
