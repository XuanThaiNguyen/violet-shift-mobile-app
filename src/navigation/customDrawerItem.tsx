import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import Screen from './screen';

interface CustomDrawerItemProps {
  icon: number | Source;
  screen: Screen;
  onNavigate: (screen: Screen) => void;
  selectedRoute: Screen;
}

const CustomDrawerItem = ({
  icon,
  screen,
  onNavigate,
  selectedRoute,
}: CustomDrawerItemProps) => {
  const handleNavigate = () => {
    onNavigate(screen);
  };

  const isFocused = selectedRoute === screen;

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={[styles.btnItem, isFocused && styles.activeItem]}
    >
      <FastImage
        source={icon}
        style={styles.icon16}
        tintColor={isFocused ? '#0a7cff' : '#6a6a6b'}
      />
      <Spacer width={'medium'} />
      <Typo variant="regular_10" color={isFocused ? '#0a7cff' : '#6a6a6b'}>
        {screen}
      </Typo>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: SpacingDefault.smaller,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  activeItem: {
    backgroundColor: '#deedff',
  },
  icon16: {
    width: 16,
    height: 16,
  },
});

export default CustomDrawerItem;
