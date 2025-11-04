import { Divider } from '@components/divider';
import { Spacer } from '@components/spacer';
import TextField from '@components/textField';
import images from '@themes/images';
import React from 'react';
import { StyleSheet } from 'react-native';

interface ExpenseFormProps {
  expense?: string;
  setExpense: (expense: string) => void;
}

const ExpenseForm = ({ expense = '', setExpense }: ExpenseFormProps) => {
  return (
    <>
      <TextField
        value={expense}
        onChangeText={setExpense}
        placeholder="Expense"
        blockInputStyle={styles.note}
        iconLeft={images.avatar}
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

export default ExpenseForm;
