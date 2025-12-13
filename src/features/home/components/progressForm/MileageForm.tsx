import { Divider } from '@components/divider';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MileageFormProps {
  mileage?: string;
  setMileage: (mileage: string) => void;
}

const MileageForm = ({ mileage = '', setMileage }: MileageFormProps) => {
  const renderLeftChild = () => (
    <View style={{ marginRight: SpacingDefault.smaller }}>
      <Typo variant="regular_14">KM/Miles</Typo>
    </View>
  );

  return (
    <>
      <TextField
        value={`${mileage}`}
        onChangeText={setMileage}
        placeholder="Enter Mileage"
        blockInputStyle={styles.note}
        renderLeftChildren={renderLeftChild}
        keyboardType="numeric"
      />
      <Divider />
      <Spacer height={16} />
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
