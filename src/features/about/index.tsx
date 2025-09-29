import DrawerHeader from '@components/header/DrawerHeader';
import { Typo } from '@components/typo/typo';
import React from 'react';
import { View } from 'react-native';

const About = () => {
  return (
    <View>
      <DrawerHeader />
      <Typo variant="semibold_12">About</Typo>
    </View>
  );
};

export default About;
