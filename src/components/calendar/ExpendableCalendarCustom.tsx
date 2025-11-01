import { Button } from '@components/button';
import colors from '@themes/color';
import { isAndroid } from '@themes/constant';
import images from '@themes/images';
import useAppStore, { CalendarKeyEnum } from '@zustand/appStore';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import FastImage from 'react-native-fast-image';
import { CalendarTheme } from './theme';

interface ExpendableCalendarCustomProps {
  date: string; //2025-09-29
  onExpand?: () => void;
  isExpanded?: boolean;
  setDate?: (date: string) => void;
}

const ExpendableCalendarCustom = ({
  date,
  onExpand,
  isExpanded,
  setDate,
}: ExpendableCalendarCustomProps) => {
  const { calendarKey, setCalendarKey } = useAppStore();

  useEffect(() => {
    if (calendarKey === CalendarKeyEnum.INITIAL && isAndroid) {
      const timeoutId = setTimeout(() => {
        setCalendarKey(CalendarKeyEnum.READY);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [calendarKey, isAndroid]);

  return (
    <CalendarProvider
      style={[styles.container, isExpanded && styles.expanded]}
      date={date}
      theme={CalendarTheme}
    >
      <ExpandableCalendar
        key={calendarKey}
        disableWeekScroll
        disablePan
        futureScrollRange={1}
        pastScrollRange={1}
        hideKnob
        date={date}
        customHeaderTitle={<></>}
        hideArrows
        onDayPress={date => setDate?.(date.dateString)}
        initialPosition={Positions.CLOSED}
        firstDay={0}
        theme={CalendarTheme}
        style={styles.calendar}
      />
      <Button onPress={onExpand} style={styles.btnExpand}>
        <FastImage
          source={images.doubleArrowDown}
          style={styles.icon20}
          tintColor={colors.primaryButton}
        />
      </Button>
    </CalendarProvider>
  );
};

export default ExpendableCalendarCustom;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 4,
  },
  expanded: {
    zIndex: -1,
  },
  btnExpand: {
    alignSelf: 'center',
  },
  icon20: {
    width: 20,
    height: 20,
  },
  calendar: {
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});
