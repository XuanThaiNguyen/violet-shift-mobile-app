import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import images from '@themes/images';
import http from '@utils/http';
import useAuthStore from '@zustand/authStore';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ApiKeys from './api';
import CustomDrawerItem from './customDrawerItem';
import Screen from './screen';

const CustomDrawerContent = (props: any) => {
  const { navigate } = useNavigation<any>();
  const [selectedRoute, setSelectedRoute] = useState(Screen.Home);
  const { currentUser, removeCurrentUser } = useAuthStore();

  const onNavigate = (screen: Screen) => {
    setSelectedRoute(screen);
    navigate(screen);
  };

  const onLogout = async () => {
    try {
      await http.post(ApiKeys.LOGOUT);
      removeCurrentUser();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.block} {...props}>
      <View style={styles.block}>
        <View style={styles.userInfo}>
          <Typo center variant="semibold_10">
            {currentUser?.user?.fullName || ''}
          </Typo>
          <Spacer height={4} />
          <Typo center variant="regular_10">
            {currentUser?.user?.email || ''}
          </Typo>
        </View>
        <Spacer height={36} />
        <CustomDrawerItem
          icon={images.notification}
          screen={Screen.Notification}
          onNavigate={onNavigate}
          selectedRoute={selectedRoute}
        />
        <CustomDrawerItem
          icon={images.home}
          screen={Screen.Home}
          onNavigate={onNavigate}
          selectedRoute={selectedRoute}
        />
        <CustomDrawerItem
          icon={images.info}
          screen={Screen.About}
          onNavigate={onNavigate}
          selectedRoute={selectedRoute}
        />
      </View>
      <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={onLogout}>
        <Typo variant="semibold_10">Logout</Typo>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  userInfo: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default CustomDrawerContent;
