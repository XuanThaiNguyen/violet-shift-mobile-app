import { Spacer } from '@components/spacer';
import TextField from '@components/textField';
import React from 'react';
import { StyleSheet } from 'react-native';

interface ReasonFormProps {
  isAvailable: boolean;
  unavailableReason: string;
  setUnavailableReason: (reason: string) => void;
}

const ReasonForm = ({
  isAvailable,
  unavailableReason,
  setUnavailableReason,
}: ReasonFormProps) => {
  if (isAvailable) {
    return <></>;
  }

  return (
    <>
      <TextField
        title="Reason"
        placeholder="Enter your reason"
        value={unavailableReason}
        onChangeText={setUnavailableReason}
        multiline
        blockInputStyle={styles.blockInput}
        inputStyle={styles.input}
      />
      <Spacer height={20} />
    </>
  );
};

export default ReasonForm;

const styles = StyleSheet.create({
  blockInput: {
    height: 120,
    alignItems: 'flex-start',
  },
  input: {
    marginVertical: 8,
  },
});
