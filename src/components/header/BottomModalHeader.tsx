import { Button } from '@components/button';
import { Typo } from '@components/typo/typo';
import images from '@themes/images';
import { modalUtil } from '@utils/modalUtil';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface BottomModalHeaderProps {
  title: string;
}

const BottomModalHeader = ({ title }: BottomModalHeaderProps) => {
  const onCloseModal = () => {
    modalUtil.hideModal();
  };

  return (
    <View style={styles.container}>
      <Typo variant="medium_16">{title}</Typo>
      <Button onPress={onCloseModal}>
        <FastImage source={images.close} style={styles.icon20} />
      </Button>
    </View>
  );
};

export default BottomModalHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon20: {
    width: 20,
    height: 20,
  },
});
