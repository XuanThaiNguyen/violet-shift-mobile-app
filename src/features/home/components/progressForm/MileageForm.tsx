import { Button } from '@components/button';
import { Divider } from '@components/divider';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import { MileageStartPointEnum } from '@features/home/types';
import colors from '@themes/color';
import images from '@themes/images';
import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

interface MileageFormProps {
  mileage?: string;
  setMileage: (mileage: string) => void;
  mileageStartPoint: MileageStartPointEnum;
  setMileageStartPoint: (mileageStartPoint: MileageStartPointEnum) => void;
}

const MileageForm = ({
  mileage = '',
  setMileage,
  mileageStartPoint,
  setMileageStartPoint,
}: MileageFormProps) => {
  return (
    <>
      <TextField
        value={mileage}
        onChangeText={setMileage}
        placeholder="Mileage"
        blockInputStyle={styles.note}
        iconLeft={images.avatar}
        keyboardType="numeric"
      />
      <Divider />
      <Spacer height={16} />
      <Typo variant="medium_14">Start point</Typo>
      <Spacer height={8} />
      <Button
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: colors.divider,
          paddingVertical: 8,
          paddingHorizontal: SpacingDefault.small,
          borderRadius: 8,
        }}
      >
        <Typo variant="regular_14">{mileageStartPoint}</Typo>
        <FastImage
          source={images.back}
          tintColor={colors.secondaryText}
          style={{ width: 12, height: 12, transform: [{ rotate: '270deg' }] }}
        />
      </Button>
      <Spacer height={4} />
      <Typo variant="regular_10" color={colors.secondaryText}>
        This is where your claimable mileage to the shift location started
      </Typo>
      <Spacer height={24} />
    </>
  );
};

const styles = StyleSheet.create({
  note: {
    borderWidth: 0,
    paddingHorizontal: 0,
  },
});

export default MileageForm;
