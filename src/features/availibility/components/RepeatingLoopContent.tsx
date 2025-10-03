import { Button } from '@components/button';
import BottomModalHeader from '@components/header/BottomModalHeader';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import images from '@themes/images';
import { modalUtil } from '@utils/modalUtil';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  MONTHLY_BY_DAY,
  REPEAT_EVERY_BY_DAY,
  REPEAT_EVERY_BY_WEEK,
} from '../constant';
import { RepeatingEnum } from '../type';

interface RepeatingLoopContentProps {
  selectedRepeatLoop: number;
  onSelectRepeatLoop?: (mode: any) => void;
  repeatingMode: any;
}

const RepeatingLoopContent = ({
  selectedRepeatLoop,
  onSelectRepeatLoop,
  repeatingMode,
}: RepeatingLoopContentProps) => {
  let defaultRepeatNumbers = REPEAT_EVERY_BY_DAY;
  if (repeatingMode === RepeatingEnum.WEEKLY) {
    defaultRepeatNumbers = REPEAT_EVERY_BY_WEEK;
  } else if (repeatingMode === RepeatingEnum.MONTHLY) {
    defaultRepeatNumbers = MONTHLY_BY_DAY;
  }

  const _handleSelectMode = (number: number) => () => {
    onSelectRepeatLoop?.(number);
    modalUtil.hideModal();
  };

  return (
    <View style={styles.container}>
      <BottomModalHeader title="Select Repeating Mode" />
      <Spacer height={24} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {defaultRepeatNumbers.map(number => {
          return (
            <Button
              onPress={_handleSelectMode(number)}
              style={styles.btn}
              key={number}
            >
              <Typo variant="regular_14">{number}</Typo>
              {number === selectedRepeatLoop && (
                <FastImage source={images.check} style={styles.icon20} />
              )}
            </Button>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RepeatingLoopContent;

const styles = StyleSheet.create({
  container: {
    maxHeight: SpacingDefault.height / 2,
  },
  btn: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon20: {
    width: 20,
    height: 20,
  },
});
