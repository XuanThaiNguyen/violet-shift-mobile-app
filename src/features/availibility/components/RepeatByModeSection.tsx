import { Button } from '@components/button';
import CheckBox from '@components/checkbox';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import colors from '@themes/color';
import images from '@themes/images';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { WEEKLY } from '../constant';
import { RepeatingEnum } from '../type';

interface RepeatByModeSectionProps {
  repeatingMode: RepeatingEnum;
  monthOccur: number;
  onOpenMonthOccur: () => void;
  defaultRepeatUnit: string;
  weekDays?: number[];
  onChange?: (days: number[]) => void;
}

const RepeatByModeSection = ({
  repeatingMode,
  monthOccur,
  onOpenMonthOccur,
  defaultRepeatUnit,
  onChange,
  weekDays = [],
}: RepeatByModeSectionProps) => {
  const [selectedDays, setSelectedDays] = useState<number[]>(weekDays);

  const toggleDay = (dayIndex: number) => () => {
    let updated: number[];
    if (selectedDays.includes(dayIndex)) {
      updated = selectedDays.filter(d => d !== dayIndex);
    } else {
      updated = [...selectedDays, dayIndex];
    }
    setSelectedDays(updated);
    onChange?.(updated);
  };

  if (repeatingMode === RepeatingEnum.WEEKLY) {
    return (
      <>
        <View>
          <Typo variant="regular_14">Occurs on</Typo>
          <Spacer height={8} />
          <View style={styles.viewWeekdayItem}>
            {WEEKLY.map((day, index) => {
              const isSelected = selectedDays.includes(index);
              return (
                <Button
                  onPress={toggleDay(index)}
                  key={day}
                  style={styles.btnWeekdayItem}
                >
                  <CheckBox isSelected={isSelected} />
                  <Typo variant="regular_14">{day}</Typo>
                </Button>
              );
            })}
          </View>
        </View>
        <Spacer height={20} />
      </>
    );
  }

  if (repeatingMode === RepeatingEnum.MONTHLY) {
    return (
      <>
        <View style={styles.viewToggleDay}>
          <Typo variant="regular_14">Occurs on</Typo>
          <View style={styles.viewToggleDay}>
            <Typo variant="regular_14">Day</Typo>
            <Spacer width="smaller" />
            <Button onPress={onOpenMonthOccur} style={styles.btnMonthOccur}>
              <Typo variant="regular_14" color={colors.primaryButton}>
                {monthOccur}
              </Typo>
              <FastImage source={images.back} style={styles.icon12} />
            </Button>
            <Spacer width="smaller" />
            <Typo variant="regular_14">of {defaultRepeatUnit}</Typo>
          </View>
        </View>
        <Spacer height={20} />
      </>
    );
  }

  return <></>;
};

export default RepeatByModeSection;

const styles = StyleSheet.create({
  viewToggleDay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon12: {
    width: 12,
    height: 12,
    transform: [{ rotate: '270deg' }],
  },
  btnMonthOccur: {
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
  btnWeekdayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    marginBottom: 8,
    gap: SpacingDefault.smaller,
    marginRight: SpacingDefault.small,
  },
  viewWeekdayItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
