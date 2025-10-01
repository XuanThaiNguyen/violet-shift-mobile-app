import { Button } from '@components/button';
import CalendarListCustom from '@components/calendar/CalendarListCustom';
import ExpendableCalendarCustom from '@components/calendar/ExpendableCalendarCustom';
import DrawerHeader from '@components/header/DrawerHeader';
import colors from '@themes/color';
import images from '@themes/images';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import MyScheduleItem from './myScheduleItem';

const HEADER_EXPANDABLE_CALENDAR_HEIGHT = 110;

const MOCK_ITEMS = {
  '2025-09-14': [
    {
      id: '1',
      name: 'Shift 6:00 AM - 2:00 PM',
      time: '6:00 AM - 2:00 PM',
      type: 'Personal Care',
      user: {
        name: 'Nguyen 1',
      },
      address: '512 Te Hanh, Hai Chau, DN',
      status: 'Booked',
    },
    {
      id: '2',
      name: 'Shift 6:00 AM - 2:00 PM',
      time: '6:00 AM - 2:00 PM',
      type: 'Personal Care',
      user: {
        name: 'Nguyen 2',
      },
      address: '512 Te Hanh, Hai Chau, DN',
      status: 'Booked',
    },
    {
      id: '3',
      name: 'Shift 6:00 AM - 2:00 PM',
      time: '6:00 AM - 2:00 PM',
      type: 'Personal Care',
      user: {
        name: 'Nguyen',
      },
      address: '512 Te Hanh, Hai Chau, DN',
      status: 'Booked',
    },
  ],
  '2025-09-15': [
    {
      id: '4',
      name: 'Shift 6:00 AM - 2:00 PM',
      time: '6:00 AM - 2:00 PM',
      type: 'Personal Care',
      user: {
        name: 'Nguyen 3',
      },
      address: '512 Te Hanh, Hai Chau, DN',
      status: 'Booked',
    },
    {
      id: '5',
      name: 'Shift 6:00 AM - 2:00 PM',
      time: '6:00 AM - 2:00 PM',
      type: 'Personal Care',
      user: {
        name: 'Nguyen 4',
      },
      address: '512 Te Hanh, Hai Chau, DN',
      status: 'Booked',
    },
  ],
  '2025-09-16': [],
};

const MySchedule = () => {
  let lastDate = '';

  const today = new Date().toISOString().split('T')[0]; // "2025-09-29"
  const [date, setDate] = useState(today);

  const [isExpanded, setIsExpanded] = useState(false);

  const flatData = Object.entries(MOCK_ITEMS).flatMap(([date, items]) =>
    items.map(item => ({ ...item, date })),
  );

  const _renderItem = ({ item }: { item: any }) => {
    const showDate = item.date !== lastDate;
    lastDate = item.date;

    return <MyScheduleItem item={item} showDate={showDate} />;
  };

  const onReload = () => {
    //
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
        <FlatList
          data={flatData}
          keyExtractor={item => item.id}
          renderItem={_renderItem}
          contentContainerStyle={styles.flatlistContainer}
        />
      </View>
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
  },
  icon20: {
    width: 20,
    height: 20,
  },
});
