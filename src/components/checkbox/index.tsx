import colors from '@themes/color';
import images from '@themes/images';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useStyles } from './styles';

const CheckBox = ({ isSelected = true }: { isSelected: boolean }) => {
  const styles = useStyles();

  return (
    <View style={[styles.container, isSelected && styles.active]}>
      {isSelected ? (
        <FastImage
          source={images.check}
          style={styles.icon16}
          tintColor={colors.white}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default CheckBox;
