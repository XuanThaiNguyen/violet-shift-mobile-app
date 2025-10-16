import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import useAuthStore from '@zustand/authStore';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useLogout } from 'src/hooks/useLogout';
import CustomDrawerItem from './customDrawerItem';
import Screen from './screen';

const CustomDrawerContent = (props: any) => {
  const { navigate } = useNavigation<any>();
  const [selectedRoute, setSelectedRoute] = useState(Screen.Home);
  const { currentUser } = useAuthStore();

  const onNavigate = (screen: Screen) => {
    setSelectedRoute(screen);
    navigate(screen);
  };

  const onProfile = () => {
    navigate(Screen.Profile);
  };

  const { mutate: logout, isPending } = useLogout();

  return (
    <DrawerContentScrollView contentContainerStyle={styles.block} {...props}>
      <View style={styles.block}>
        <Button onPress={onProfile} style={styles.userInfo}>
          <View style={styles.avatar}>
            <FastImage
              source={images.avatar}
              style={styles.icon32}
              tintColor={colors.white}
            />
          </View>
          <Spacer height={12} />
          <Typo center variant="semibold_10">
            {currentUser?.user?.preferredName || ''}
          </Typo>
          <Spacer height={4} />
          <Typo center variant="regular_10">
            {currentUser?.user?.email || ''}
          </Typo>
        </Button>
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
          icon={images.home}
          screen={Screen.Availibility}
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
      <Button style={styles.btnLogout} onPress={logout} disabled={isPending}>
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryButton,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon32: {
    width: 32,
    height: 32,
  },
});

export default CustomDrawerContent;
