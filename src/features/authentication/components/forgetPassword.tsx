import { Button } from '@components/button';
import { showSnack } from '@components/snackBar';
import { Spacer } from '@components/spacer';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import { ApiStatus } from '@services/ApiStatus';
import { authService } from '@services/auth';
import { getErrorMessage } from '@services/errorHandler';
import { QueryObjectResponse } from '@services/type';
import { useMutation } from '@tanstack/react-query';
import colors from '@themes/color';
import { modalUtil } from '@utils/modalUtil';
import isEmpty from 'lodash.isempty';
import React, { useState } from 'react';
import { View } from 'react-native';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onCloseModal = () => {
    modalUtil.hideModal();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data: QueryObjectResponse) => {
      if (data.status === ApiStatus.OK) {
        modalUtil.hideModal();
        showSnack({
          msg: 'An email is sent to your email address, please check!',
          position: 'top',
          type: 'success',
          iconColor: colors.green,
        });
      }
    },
    onError: error => {
      const msg = getErrorMessage(error);
      setErrorMsg(msg);
    },
  });

  const onReset = () => {
    if (!isEmpty(errorMsg)) {
      setErrorMsg('');
    }
    mutate(email);
  };

  return (
    <View>
      <Typo center variant="bold_20">
        Reset your password
      </Typo>
      <Spacer height={8} />
      <Typo variant="regular_14" center color={colors.primaryButton}>
        Enter your email address and we'll send you a link so you can reset your
        password
      </Typo>
      <Spacer height={20} />
      <TextField
        title="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        error={!isEmpty(errorMsg)}
        errorMessage={errorMsg}
      />
      <Spacer height={20} />
      <Button
        text="Send an email"
        preset="primary"
        onPress={onReset}
        loading={isPending}
        disabled={isEmpty(email) || isPending}
      />
      <Spacer height={16} />
      <Button onPress={onCloseModal}>
        <Typo variant="regular_14" center color={colors.primaryButton}>
          Go Back
        </Typo>
      </Button>
    </View>
  );
};

export default ForgetPassword;
