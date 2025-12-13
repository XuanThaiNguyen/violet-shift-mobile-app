import { Button } from '@components/button';
import BottomModalHeader from '@components/header/BottomModalHeader';
import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import images from '@themes/images';
import { modalUtil } from '@utils/modalUtil';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface SaveSignatureContentProps {
  onConfirm: () => void;
  loading: boolean;
}

const SaveSignatureContent = ({
  onConfirm,
  loading,
}: SaveSignatureContentProps) => {
  const _onConfirmSave = () => {
    modalUtil.hideModal();
    onConfirm();
  };

  const _onCancel = () => {
    modalUtil.hideModal();
  };

  return (
    <View>
      <BottomModalHeader title="" />
      <Spacer height={32} />
      <FastImage source={images.warningAlert} style={styles.image} />
      <Spacer height={16} />
      <Typo center variant="semibold_16">
        Save Signature
      </Typo>
      <Spacer height={8} />
      <Typo center variant="regular_12">
        {`Are you sure you want to save this signature?\nYou can't undo this action.`}
      </Typo>
      <Spacer height={16} />
      <Button
        onPress={_onConfirmSave}
        loading={loading}
        text="Confirm"
        preset="primary"
      />
      <Spacer height={16} />
      <Button onPress={_onCancel} text="Cancel" preset="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});

export default SaveSignatureContent;
