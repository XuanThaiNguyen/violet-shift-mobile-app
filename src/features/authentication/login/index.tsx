import { Typo } from '@components/typo/typo';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from './styles';

const Login = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Typo variant="semibold_10">Login</Typo>
    </View>
  );
};

export default Login;
