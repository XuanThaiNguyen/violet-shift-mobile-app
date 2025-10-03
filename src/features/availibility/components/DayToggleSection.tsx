import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import Toggle from '@components/toggle';
import { Typo } from '@components/typo/typo';
import colors from '@themes/color';
import images from '@themes/images';
import { DATE_FORMAT, formatDate } from '@utils/handleDateTime';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TimeRange } from '../type';

interface DayToggleSectionProps {
  isAllDay: boolean;
  onToggleAllDay: () => void;
  timeRanges: TimeRange[];
  onOpenTimePicker: (
    index: number,
    field: 'startTime' | 'endTime',
    currentDate: Date,
  ) => () => void;
  removeTimeRange: (index: number) => () => void;
  addTimeRange: () => void;
}

const DayToggleSection = ({
  isAllDay,
  onToggleAllDay,
  timeRanges,
  onOpenTimePicker,
  removeTimeRange,
  addTimeRange,
}: DayToggleSectionProps) => {
  const renderTimeRange = (range: TimeRange, index: number) => {
    return (
      <View key={index} style={styles.viewTimeRange}>
        <Button
          onPress={onOpenTimePicker(index, 'startTime', range.startTime)}
          style={styles.btn}
        >
          <Typo variant="regular_14">Start time</Typo>
          <Typo variant="regular_14">
            {formatDate(range.startTime, DATE_FORMAT.SECOND)}
          </Typo>
        </Button>
        <Spacer width="small" />
        <Button
          onPress={onOpenTimePicker(index, 'endTime', range.endTime)}
          style={styles.btn}
        >
          <Typo variant="regular_14">End time</Typo>
          <Typo variant="regular_14">
            {formatDate(range.endTime, DATE_FORMAT.SECOND)}
          </Typo>
        </Button>
        <Spacer width={'small'} />
        {index > 0 ? (
          <Button onPress={removeTimeRange(index)}>
            <FastImage source={images.close} style={styles.icon24} />
          </Button>
        ) : (
          <View style={styles.icon24} />
        )}
      </View>
    );
  };

  const renderAddMoreTimeRange = () => (
    <>
      <Button onPress={addTimeRange} style={styles.btnAddTime}>
        <FastImage source={images.add} style={styles.icon16} />
        <Typo variant="semibold_14">Add another time</Typo>
      </Button>
      <Spacer height={20} />
    </>
  );

  return (
    <>
      <View style={styles.viewToggleDay}>
        <Typo variant="regular_14">All day</Typo>
        <Toggle onPress={onToggleAllDay} isOn={isAllDay} />
      </View>
      <Spacer height={20} />
      {isAllDay ? <></> : timeRanges.map(renderTimeRange)}
      {isAllDay ? <></> : renderAddMoreTimeRange()}
    </>
  );
};

export default DayToggleSection;

const styles = StyleSheet.create({
  viewToggleDay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewTimeRange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  btn: {
    backgroundColor: colors.disabledBox,
    paddingVertical: 8,
    flex: 1,
    paddingLeft: SpacingDefault.small,
    borderRadius: 8,
  },
  icon24: {
    width: 24,
    height: 24,
  },
  btnAddTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.smaller,
  },
  icon16: {
    width: 16,
    height: 16,
  },
});
