import Header from '@components/header';
import { Typo } from '@components/typo/typo';
import React from 'react';
import { View } from 'react-native';

const Notification = () => {
  return (
    <View>
      <Header title="Unread Notifications" />
      <Typo variant="semibold_12">Notification</Typo>
    </View>
  );
};

export default Notification;
