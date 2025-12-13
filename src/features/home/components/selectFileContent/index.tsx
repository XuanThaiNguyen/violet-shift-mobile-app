import { Button } from '@components/button';
import BottomModalHeader from '@components/header/BottomModalHeader';
import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SelectFileContentProps {
  onSelectPhoto: () => void;
  onTakePhoto: () => void;
}

const SelectFileContent = ({
  onSelectPhoto,
  onTakePhoto,
}: SelectFileContentProps) => {
  return (
    <View>
      <BottomModalHeader title="Select File" />
      <Spacer height={32} />
      <Button style={styles.btnSelect} onPress={onTakePhoto}>
        <Typo variant="medium_14">Take Photo</Typo>
      </Button>
      <Button style={styles.btnSelect} onPress={onSelectPhoto}>
        <Typo variant="medium_14">Choose from Library</Typo>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btnSelect: {
    paddingVertical: 16,
  },
});

export default SelectFileContent;
