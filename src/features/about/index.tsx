import Header from '@components/header';
import { Typo } from '@components/typo/typo';
import React from 'react';
import { View } from 'react-native';

const About = () => {
  return (
    <View>
      <Header />
      <Typo variant="semibold_12">About</Typo>
    </View>
  );
};

export default About;
