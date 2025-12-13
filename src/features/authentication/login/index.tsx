import { Button } from '@components/button';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { Spacer } from '@components/spacer';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import WrapperKeyboardShown from '@components/wrapper/WrapperKeyboardShown';
import { IAuth } from '@models/User';
import { ApiStatus } from '@services/ApiStatus';
import { authService } from '@services/auth';
import { showErrorMessage } from '@services/errorHandler';
import { QueryObjectResponse } from '@services/type';
import { useMutation } from '@tanstack/react-query';
import colors from '@themes/color';
import images from '@themes/images';
import { modalUtil } from '@utils/modalUtil';
import useAuthStore from '@zustand/authStore';
import { AxiosError } from 'axios';
import isEmpty from 'lodash.isempty';
import React, { useMemo, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ForgetPassword from '../components/forgetPassword';
import { useStyles } from './styles';

const Login = () => {
  const styles = useStyles();
  const { setCurrentUser, setToken } = useAuthStore();

  const [email, setEmail] = useState(__DEV__ ? 'thainguyen2@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? '123123' : '');
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [reviewHeight, setReviewHeight] = useState(0);

  const onHandleHidePassword = () => {
    setIsHidePassword(prev => !prev);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data: QueryObjectResponse<IAuth>) => {
      if (data.status === ApiStatus.OK && data.data?.user) {
        setCurrentUser(data.data.user);
        setToken(data.data.token);
      }
    },
    onError: (error: AxiosError) => {
      showErrorMessage(error);
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
      mode: 'center',
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
      <ScrollView contentContainerStyle={{ paddingBottom: reviewHeight }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.upper}>
            <FastImage source={images.logo} style={styles.logo} />
            <Spacer height={20} />
            <Typo center variant="bold_20" color={colors.primaryText}>
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
        </TouchableWithoutFeedback>
      </ScrollView>
      <WrapperKeyboardShown callBackHeight={setReviewHeight}>
        <Button
          style={styles.btnLogin}
          text="Login"
          preset="primary"
          onPress={onLogin}
          loading={isPending}
          disabled={shouldBeDisabled}
        />
        <InsetSubstitute type="bottom" />
      </WrapperKeyboardShown>
    </View>
  );
};

export default Login;
