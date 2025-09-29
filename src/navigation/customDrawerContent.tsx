import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { ApiStatus } from '@services/ApiStatus';
import { authService } from '@services/auth';
import { ApiResponse } from '@services/type';
import { useMutation } from '@tanstack/react-query';
import colors from '@themes/color';
import images from '@themes/images';
import useAuthStore from '@zustand/authStore';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
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

  const { mutate, isPending } = useMutation({
    mutationFn: authService.logout,
    onSuccess: (data: ApiResponse) => {
      if (data.status === ApiStatus.OK) {
        removeCurrentUser();
      }
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });

  const onLogout = async () => {
    mutate();
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
      <Button style={styles.btnLogout} onPress={onLogout}>
        <Typo variant="regular_10" color={colors.secondaryText}>
          {isPending ? 'Logging out...' : 'Log out'}
        </Typo>
        <FastImage
          source={images.logout}
          style={styles.icon16}
          tintColor={colors.secondaryText}
        />
      </Button>
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
  icon16: {
    width: 16,
    height: 16,
  },
  btnLogout: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.smaller,
  },
});

export default CustomDrawerContent;
