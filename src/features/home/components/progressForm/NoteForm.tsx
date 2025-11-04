import TextField from '@components/textField';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface NoteFormProps {
  note: string;
  setNote: (note: string) => void;
}

const NoteForm = ({ note, setNote }: NoteFormProps) => {
  return (
    <TextField
      value={note}
      onChangeText={setNote}
      placeholder="Enter your notes"
      multiline
      blockInputStyle={styles.note}
    />
  );
};

const styles = StyleSheet.create({
  note: {
    borderWidth: 0,
    paddingHorizontal: 0,
    height: 240,
    paddingTop: 0,
    marginTop: 0,
    alignItems: 'flex-start',
  },
});

export default NoteForm;
