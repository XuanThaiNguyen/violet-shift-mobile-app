import { Button } from '@components/button';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { Spacer } from '@components/spacer';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import { User } from '@models/User';
import { ApiStatus } from '@services/ApiStatus';
import { authService } from '@services/auth';
import { ApiResponse } from '@services/type';
import { useMutation } from '@tanstack/react-query';
import colors from '@themes/color';
import images from '@themes/images';
import { isEmpty } from '@utils/handleUtils';
import { modalUtil } from '@utils/modalUtil';
import useAuthStore from '@zustand/authStore';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ForgetPassword from '../components/forgetPassword';
import { useStyles } from './styles';

const Login = () => {
  const styles = useStyles();
  const { setCurrentUser } = useAuthStore();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [email, setEmail] = useState('jackiechan.shanefilan.1997@gmail.com');
  const [password, setPassword] = useState('Lamanh1998!');
  const [isHidePassword, setIsHidePassword] = useState(true);

  const onHandleHidePassword = () => {
    setIsHidePassword(prev => !prev);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data: ApiResponse<User>) => {
      if (data.status === ApiStatus.OK && data.data?.user) {
        setCurrentUser(data.data);
      }
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });

  const onLogin = async () => {
    const loginInfo = {
      email,
      password,
    };

    mutate(loginInfo);
  };

  const shouldBeDisabled = useMemo(
    () => isEmpty(email) || isEmpty(password) || isPending,
    [email, password, isPending],
  );

  const onForgetPassword = () => {
    modalUtil.showModal({
      children: <ForgetPassword />,
    });
  };

  const _renderRightChildren = () => {
    return (
      <>
        <Spacer width="smaller" />
        <Button onPress={onHandleHidePassword}>
          <FastImage
            source={isHidePassword ? images.eyeShow : images.eyeHide}
            style={styles.icon16}
            tintColor={colors.secondaryText}
          />
        </Button>
      </>
    );
  };

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
        <TextField
          title="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Spacer height={16} />
        <TextField
          renderRightChildren={_renderRightChildren}
          title="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isHidePassword}
        />
        <Spacer height={16} />
        <Button onPress={onForgetPassword}>
          <Typo
            variant="medium_14"
            color={colors.primaryButton}
            style={styles.txtForget}
          >
            Forgot your password?
          </Typo>
        </Button>
      </View>
      <Button
        text="Login"
        preset="primary"
        onPress={onLogin}
        loading={isPending}
        disabled={shouldBeDisabled}
      />
      <InsetSubstitute type="bottom" />
    </View>
  );
};

export default Login;
