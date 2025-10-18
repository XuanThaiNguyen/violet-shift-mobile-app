import { Button } from '@components/button';
import DrawerHeader from '@components/header/DrawerHeader';
import { Typo } from '@components/typo/typo';
import Screen from '@navigation/screen';
import { useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from './styles';

const Availibility = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { navigate } = useNavigation();

  const onSetAvailibility = () => {
    navigate(Screen.SetAvailibility);
  };

  return (
    <View style={styles.container}>
      <DrawerHeader />
      <Typo variant="semibold_16">Availibility</Typo>
      <Button onPress={onSetAvailibility} style={styles.btnOnSet}>
        <FastImage
          source={images.add}
          style={styles.icon32}
          tintColor={colors.white}
        />
      </Button>
    </View>
  );
};

export default Availibility;
