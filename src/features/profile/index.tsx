import BackHeader from '@components/header/BackHeader';
import { Spacer } from '@components/spacer';
import { IClient } from '@models/Client';
import { IUser } from '@models/User';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import useAuthStore from '@zustand/authStore';
import isEmpty from 'lodash.isempty';
import React from 'react';
import { View } from 'react-native';
import ProfileHeader from './components/ProfileHeader';
import ProfileInformation from './components/ProfileInformation';

const Profile = () => {
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.Profile>>();
  const mode = route.params?.mode || 'mine';
  const clientInfo = route.params?.clientInfo;

  const { currentUser } = useAuthStore();

  const dataProfile: IUser | IClient | undefined =
    mode === 'client' ? clientInfo : currentUser ? currentUser : undefined;

  if (isEmpty(dataProfile)) return <></>;

  return (
    <View>
      <BackHeader title="Profile" />
      <ProfileHeader dataProfile={dataProfile} />
      <Spacer height={8} />
      <ProfileInformation
        dataProfile={dataProfile}
        currentUser={currentUser}
        mode={mode}
      />
    </View>
  );
};

export default Profile;
