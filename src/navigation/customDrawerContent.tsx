import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import images from '@themes/images';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomDrawerItem from './customDrawerItem';
import Screen from './screen';

const CustomDrawerContent = (props: any) => {
  const { navigate } = useNavigation<any>();
  const [selectedRoute, setSelectedRoute] = useState(Screen.Home);

  const onNavigate = (screen: Screen) => {
    setSelectedRoute(screen);
    navigate(screen);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfo}>
        <Typo center variant="semibold_10">
          Thai Xuan Nguyen
        </Typo>
        <Spacer height={4} />
        <Typo center variant="regular_10">
          nguyenxuanthai7@gmail.com
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
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default CustomDrawerContent;
