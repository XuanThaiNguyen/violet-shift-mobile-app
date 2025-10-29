import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { getShiftTypeLabel } from '@features/home/utils';
import {
  IStaffSchedule,
  ShiftStatusEnum,
  WeekDataSchedule,
} from '@models/Shift';
import { navigationRef } from '@navigation/navigationUtil';
import Screen from '@navigation/screen';
import colors from '@themes/color';
import { capitalizeFirst } from '@utils/handleStrings';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MyScheduleItemProps {
  item: WeekDataSchedule;
  dateLabel: string;
  dayLabel: string;
}

const MyScheduleItem = ({ item, dateLabel, dayLabel }: MyScheduleItemProps) => {
  const onDetailShift = (shift: IStaffSchedule) => () => {
    navigationRef.current?.navigate(Screen.ShiftManager, {
      shiftId: shift.shift._id,
      scheduleId: shift._id,
      isClocksInAt: shift?.clocksInAt ? shift.clocksInAt : 0,
      isClocksOutAt: shift?.clocksOutAt ? shift.clocksOutAt : 0,
    });
  };

  const renderShifts = (shift: IStaffSchedule, index: number) => {
    let _defaultShiftStatus: ShiftStatusEnum = 'booked';
    if (shift.clocksOutAt) {
      _defaultShiftStatus = 'completed';
    } else if (shift.clocksInAt && !shift.clocksOutAt) {
      _defaultShiftStatus = 'started';
    }

    return (
      <Button
        onPress={onDetailShift(shift)}
        key={shift._id}
        style={[
          styles.shift,
          index === item.shifts.length - 1 && styles.lastShift,
        ]}
      >
        <View style={styles.time}>
          <Typo variant="semibold_10">
            {dayjs(shift.timeFrom).format('h:mm A')} -{' '}
            {dayjs(shift.timeTo).format('h:mm A')}
          </Typo>
          <Typo variant="regular_10">
            {getShiftTypeLabel(shift.shift?.shiftType)}
          </Typo>
        </View>
        <Spacer height={20} />
        <Typo variant="medium_14">
          Client:{' '}
          <Typo variant="regular_14">
            {!!shift.clientNames?.[0] ? shift.clientNames[0] : ''}
          </Typo>
        </Typo>
        <Spacer height={16} />
        <Typo variant="medium_14">
          Address: <Typo variant="regular_14">{shift.shift.address || ''}</Typo>
        </Typo>
        <Spacer height={24} />
        <Typo variant="regular_14" style={styles.status} color={colors.green}>
          {capitalizeFirst(_defaultShiftStatus)}
        </Typo>
      </Button>
    );
  };

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Typo variant="medium_10" color={colors.secondaryText}>
        No Shifts
      </Typo>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <Typo center variant="medium_16" color={colors.black}>
          {dateLabel}
        </Typo>
        <Typo center variant="medium_16" color={colors.black}>
          {dayLabel}
        </Typo>
      </View>

      <View style={styles.rightPart}>
        {item?.shifts?.length > 0
          ? item.shifts.map(renderShifts)
          : renderEmpty()}
      </View>
    </View>
  );
};

export default MyScheduleItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  leftPart: {
    width: SpacingDefault.width * 0.15,
    alignItems: 'center',
  },
  rightPart: {
    flex: 1,
    marginRight: SpacingDefault.normal,
  },
  empty: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  shift: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  lastShift: {
    marginBottom: 0,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    textAlign: 'right',
  },
});
