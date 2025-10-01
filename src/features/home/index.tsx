import React from 'react';
import { View } from 'react-native';
import MySchedule from './components/mySchedule/mySchedule';
import { useStyles } from './styles';

const Home = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <MySchedule />
    </View>
  );
};

export default Home;
