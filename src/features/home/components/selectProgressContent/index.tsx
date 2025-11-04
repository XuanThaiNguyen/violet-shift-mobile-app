import { Button } from '@components/button';
import BottomModalHeader from '@components/header/BottomModalHeader';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { PROGRESS_OPTIONS } from '@features/home/constants';
import {
  ProgressOptionKeyEnum,
  ProgressOptionProps,
} from '@features/home/types';
import colors from '@themes/color';
import { modalUtil } from '@utils/modalUtil';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface SelectProgressContentProps {
  onSelectProgress: ({
    key,
    label,
  }: {
    key: ProgressOptionKeyEnum;
    label: string;
  }) => void;
}

const SelectProgressContent = ({
  onSelectProgress,
}: SelectProgressContentProps) => {
  const handleSelect = (key: ProgressOptionKeyEnum, label: string) => () => {
    onSelectProgress?.({ key, label });
    modalUtil.hideModal();
  };

  const renderOption = (option: ProgressOptionProps) => {
    return (
      <Button
        onPress={handleSelect(option.key, option.label)}
        key={option.key}
        style={styles.option}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FastImage
            source={option.icon}
            style={styles.icon16}
            tintColor={colors.white}
          />
        </View>
        <Typo variant="medium_14">{option.label}</Typo>
      </Button>
    );
  };

  return (
    <View>
      <BottomModalHeader title="Select a Progress" />
      <Spacer height={32} />
      {PROGRESS_OPTIONS.map(renderOption)}
    </View>
  );
};

const styles = StyleSheet.create({
  icon16: {
    width: 16,
    height: 16,
  },
  option: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.normal,
  },
});

export default SelectProgressContent;
