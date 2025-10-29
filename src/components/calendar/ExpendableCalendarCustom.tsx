import { Button } from '@components/button';
import colors from '@themes/color';
import images from '@themes/images';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import FastImage from 'react-native-fast-image';

interface ExpendableCalendarCustomProps {
  date: string; //2025-09-29
  onExpand?: () => void;
  isExpanded?: boolean;
  setDate?: (date: string) => void;
}

const ExpendableCalendarCustom = ({
  date = new Date().toDateString(),
  onExpand,
  isExpanded,
  setDate,
}: ExpendableCalendarCustomProps) => {
  return (
    <View style={[styles.container, isExpanded && styles.expanded]}>
      <CalendarProvider date={date}>
        <View style={styles.expandableCalendar}>
          <ExpandableCalendar
            disableWeekScroll
            disablePan
            hideKnob
            date={date}
            customHeaderTitle={<></>}
            hideArrows
            onDayPress={date => setDate?.(date.dateString)}
            initialPosition={Positions.CLOSED}
            firstDay={0}
            style={styles.calendar}
          />
          <Button onPress={onExpand} style={styles.btnExpand}>
            <FastImage
              source={images.doubleArrowDown}
              style={styles.icon20}
              tintColor={colors.primaryButton}
            />
          </Button>
        </View>
      </CalendarProvider>
    </View>
  );
};

export default ExpendableCalendarCustom;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    flex: 1,
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
  expandableCalendar: {
    backgroundColor: colors.white,
    paddingBottom: 4,
  },
  calendar: {
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});
