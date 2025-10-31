import { Button } from '@components/button';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import Toggle from '@components/toggle';
import { Typo } from '@components/typo/typo';
import { useLogout } from '@hooks/useLogout';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import { getFullName } from '@utils/handleStrings';
import useAuthStore from '@zustand/authStore';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomDrawerItem from './customDrawerItem';
import Screen from './screen';

const CustomDrawerContent = (props: any) => {
  const { navigate } = useNavigation<any>();
  const [selectedRoute, setSelectedRoute] = useState(Screen.Home);
  const { currentUser } = useAuthStore();

  const [isShiftNotification, setIsShiftNotification] = useState(false);

  const toggleShiftNotification = () => {
    setIsShiftNotification(prev => !prev);
  };

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
            {currentUser ? getFullName(currentUser) : ''}
          </Typo>
          <Spacer height={4} />
          <Typo center variant="regular_10">
            {currentUser?.email || ''}
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
        {/* <CustomDrawerItem
          icon={images.home}
          screen={Screen.Availibility}
          onNavigate={onNavigate}
          selectedRoute={selectedRoute}
        /> */}
        {/* <CustomDrawerItem
          icon={images.info}
          screen={Screen.About}
          onNavigate={onNavigate}
          selectedRoute={selectedRoute}
        /> */}
        <View style={styles.toggle}>
          <Toggle
            isOn={isShiftNotification}
            onPress={toggleShiftNotification}
            width={30}
            height={15}
            knobSize={12}
            padding={1.5}
          />
          <Typo variant="semibold_10">Shift Notifications</Typo>
        </View>
      </View>
      <Button style={styles.btnLogout} onPress={logout} disabled={isPending}>
        <Typo variant="regular_10" color={colors.red}>
          {isPending ? 'Logging out...' : 'Log out'}
        </Typo>
        <FastImage
          source={images.logout}
          style={styles.icon16}
          tintColor={colors.red}
        />
      </Button>
      <InsetSubstitute type="bottom" />
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
    gap: SpacingDefault.tiny,
    marginRight: SpacingDefault.normal,
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
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.smaller,
    marginLeft: SpacingDefault.smaller,
    paddingVertical: 12,
  },
});

export default CustomDrawerContent;
