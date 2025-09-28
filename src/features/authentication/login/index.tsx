import { Button } from '@components/button';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { Spacer } from '@components/spacer';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import ApiKeys from '@navigation/api';
import colors from '@themes/color';
import images from '@themes/images';
import { isEmpty } from '@utils/handleUtils';
import http from '@utils/http';
import useAuthStore from '@zustand/authStore';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useStyles } from './styles';

const Login = () => {
  const styles = useStyles();
  const { setCurrentUser } = useAuthStore();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  // const [loginInfo, setLoginInfo] = useState({
  //   email: 'jackiechan.shanefilan.1997@gmail.com',
  //   password: 'Lamanh1998!',
  // });

  const onLogin = async () => {
    console.log('123123123');

    try {
      const { data } = await http.post(ApiKeys.LOGIN, loginInfo);
      console.log('data.data.user', data.data);

      if (data.data.user) {
        setCurrentUser(data.data);
      }
      // console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  const shouldBeDisabled = useMemo(
    () => isEmpty(loginInfo.email) || isEmpty(loginInfo.password),
    [loginInfo.email, loginInfo.password],
  );

  return (
    <View style={styles.container}>
      <InsetSubstitute />
      <Spacer height={40} />
      <View style={styles.upper}>
        <FastImage source={images.logo} style={styles.logo} />
        <Spacer height={20} />
        <Typo center variant="bold_20">
          Log into Violet Shift
        </Typo>
        <Spacer height={40} />
        <TextField title="Email" placeholder="Enter your email" value="" />
        <Spacer height={16} />
        <TextField
          title="Password"
          placeholder="Enter your password"
          value=""
        />
        <Spacer height={16} />
        <Typo
          variant="medium_14"
          color={colors.primaryButton}
          style={styles.txtForget}
        >
          Forgot your password?
        </Typo>
      </View>
      <Button
        text="Login"
        preset="primary"
        onPress={onLogin}
        disabled={shouldBeDisabled}
      />
      <Spacer height={16} />
      <InsetSubstitute type="bottom" />
    </View>
  );
};

export default Login;
