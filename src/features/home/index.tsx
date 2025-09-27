import Header from '@components/header';
import React from 'react';
import { View } from 'react-native';
import { Typo } from '../../components/typo/typo';
import { useStyles } from './styles';

const Home = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header showReload title="SEP 2025" />
      <Typo variant="semibold_12">Home</Typo>
    </View>
  );
};

export default Home;
