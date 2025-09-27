import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { Typo } from '@components/typo/typo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useStyles } from './styles';

interface HeaderProps {
  showReload?: boolean;
  title?: string;
}

const Header = ({ showReload, title = '' }: HeaderProps) => {
  const { dispatch } = useNavigation();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <InsetSubstitute />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => dispatch(DrawerActions.openDrawer())}>
          <FastImage
            source={images.menu}
            style={styles.icon20}
            tintColor={colors.white}
          />
        </TouchableOpacity>
        <Typo variant="semibold_12" color={colors.white}>
          {title}
        </Typo>
        {showReload ? (
          <FastImage
            source={images.reload}
            style={styles.icon20}
            tintColor={colors.white}
          />
        ) : (
          <View style={styles.icon20} />
        )}
      </View>
    </View>
  );
};

export default Header;
