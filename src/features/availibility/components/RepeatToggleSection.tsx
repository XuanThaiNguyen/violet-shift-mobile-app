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
import { BOX_WIDTH } from '../constant';
import { DatePickerField, RepeatingEnum } from '../type';
import RepeatByModeSection from './RepeatByModeSection';

interface RepeatToggleSectionProps {
  onToggleRepeat: () => void;
  isRepeat: boolean;
  onOpenRepeatingModal: () => void;
  repeatingMode: RepeatingEnum;
  repeatLoop: number;
  onOpenRepeatingLoopModal: () => void;
  onOpenDatePickerModal: (field: DatePickerField) => () => void;
  endDate: Date;
  onOpenMonthOccur: () => void;
  monthOccur: number;
  weekDays: number[];
  onChangeWeekDays: (days: number[]) => void;
}

const RepeatToggleSection = ({
  onToggleRepeat,
  isRepeat,
  onOpenRepeatingModal,
  repeatingMode,
  repeatLoop,
  onOpenRepeatingLoopModal,
  onOpenDatePickerModal,
  endDate,
  monthOccur,
  onOpenMonthOccur,
  weekDays,
  onChangeWeekDays,
}: RepeatToggleSectionProps) => {
  let defaultRepeatUnit = 'day';
  if (repeatingMode === RepeatingEnum.WEEKLY) {
    defaultRepeatUnit = 'week';
  } else if (repeatingMode === RepeatingEnum.MONTHLY) {
    defaultRepeatUnit = 'month';
  }

  return (
    <>
      <View style={styles.viewToggleDay}>
        <Typo variant="regular_14">Repeat</Typo>
        <Toggle onPress={onToggleRepeat} isOn={isRepeat} />
      </View>
      <Spacer height={20} />
      {isRepeat ? (
        <>
          <View style={styles.viewToggleDay}>
            <Typo variant="regular_14">Repeating</Typo>
            <Button onPress={onOpenRepeatingModal} style={styles.toggleRepeat}>
              <Typo variant="regular_14" color={colors.primaryButton}>
                {repeatingMode}
              </Typo>
              <FastImage source={images.back} style={styles.icon12} />
            </Button>
          </View>
          <Spacer height={20} />
          <View style={styles.viewToggleDay}>
            <Typo variant="regular_14">Repeat every</Typo>
            <View style={styles.viewBoxRepeat}>
              <Button
                onPress={onOpenRepeatingLoopModal}
                style={styles.btnRepeatEvery}
              >
                <Typo variant="regular_14" color={colors.primaryButton}>
                  {repeatLoop}
                </Typo>
                <FastImage source={images.back} style={styles.icon12} />
              </Button>
              <Spacer width="smaller" />
              <View style={styles.viewUnit}>
                <Typo style={styles.textUnit} variant="regular_14">
                  {defaultRepeatUnit}
                </Typo>
              </View>
            </View>
          </View>
          <Spacer height={20} />
          <RepeatByModeSection
            monthOccur={monthOccur}
            onOpenMonthOccur={onOpenMonthOccur}
            repeatingMode={repeatingMode}
            defaultRepeatUnit={defaultRepeatUnit}
            weekDays={weekDays}
            onChange={onChangeWeekDays}
          />
          <View style={styles.viewToggleDay}>
            <Typo variant="regular_14">Ends on</Typo>
            <Button
              onPress={onOpenDatePickerModal('endDate')}
              style={styles.boxEndsOn}
            >
              <Typo variant="regular_14">
                {formatDate(endDate, DATE_FORMAT.FIRST)}
              </Typo>
            </Button>
          </View>
          <Spacer height={20} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RepeatToggleSection;

const styles = StyleSheet.create({
  viewToggleDay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleRepeat: {
    borderWidth: 1,
    borderColor: colors.divider,
    paddingVertical: 8,
    paddingHorizontal: SpacingDefault.smaller,
    borderRadius: 4,
    width: BOX_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon12: {
    width: 12,
    height: 12,
    transform: [{ rotate: '270deg' }],
  },
  viewBoxRepeat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnRepeatEvery: {
    borderWidth: 1,
    borderColor: colors.divider,
    paddingVertical: 8,
    paddingHorizontal: SpacingDefault.smaller,
    borderRadius: 4,
    width: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewUnit: {
    width: 48,
  },
  textUnit: {
    alignSelf: 'flex-end',
  },
  boxEndsOn: {
    borderWidth: 1,
    borderColor: colors.divider,
    paddingVertical: 8,
    borderRadius: 4,
    width: BOX_WIDTH,
    alignItems: 'center',
  },
});
