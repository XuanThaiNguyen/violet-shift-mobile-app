import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import { ApiStatus } from '@services/ApiStatus';
import { authService } from '@services/auth';
import { ApiResponse } from '@services/type';
import { useMutation } from '@tanstack/react-query';
import colors from '@themes/color';
import { devLog } from '@utils/handleLog';
import { isEmpty } from '@utils/handleUtils';
import { modalUtil } from '@utils/modalUtil';
import React, { useState } from 'react';
import { View } from 'react-native';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const onCloseModal = () => {
    modalUtil.hideModal();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (data: ApiResponse) => {
      if (data.status === ApiStatus.OK) {
        devLog.log('reset password success');
      }
    },
    onError: (error: any) => {
      devLog.log('reset password failed:', error);
    },
  });

  const onReset = () => mutate(email);

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
