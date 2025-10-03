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
import { OCCUR_ON_DAY_OF_MONTH } from '../constant';

interface MonthOccurContentProps {
  selectedMonthOccur: number;
  onSelectMonthOccur?: (value: number) => void;
}

const MonthOccurContent = ({
  selectedMonthOccur,
  onSelectMonthOccur,
}: MonthOccurContentProps) => {
  const _handleSelectMode = (number: number) => () => {
    onSelectMonthOccur?.(number);
    modalUtil.hideModal();
  };

  return (
    <View style={styles.container}>
      <BottomModalHeader title="Select Repeating Mode" />
      <Spacer height={24} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {OCCUR_ON_DAY_OF_MONTH.map(number => {
          return (
            <Button
              onPress={_handleSelectMode(number)}
              style={styles.btn}
              key={number}
            >
              <Typo variant="regular_14">{number}</Typo>
              {number === selectedMonthOccur && (
                <FastImage source={images.check} style={styles.icon20} />
              )}
            </Button>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MonthOccurContent;

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
