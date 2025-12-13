import { Divider } from '@components/divider';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ExpenseFormProps {
  expense?: string;
  setExpense: (expense: string) => void;
}

const ExpenseForm = ({ expense = '', setExpense }: ExpenseFormProps) => {
  const renderLeftChild = () => (
    <View style={{ marginRight: SpacingDefault.smaller }}>
      <Typo variant="regular_14">$$</Typo>
    </View>
  );

  return (
    <>
      <TextField
        value={`${expense}`}
        onChangeText={setExpense}
        placeholder="Expense"
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

export default ExpenseForm;
