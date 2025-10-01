import React from 'react';
import { View } from 'react-native';
import { useStyles } from './styles';
import { RadioProps } from './type';

const Radio = ({ isSelected }: RadioProps) => {
  const styles = useStyles();

  return (
    <View style={isSelected ? styles.activeOuter : styles.inactiveOuter}>
      <View style={isSelected ? styles.activeInner : styles.inactiveInner} />
    </View>
  );
};

export default Radio;
