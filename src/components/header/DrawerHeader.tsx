import { Button } from '@components/button';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { Typo } from '@components/typo/typo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useStyles } from './styles';

interface DrawerHeaderHeaderProps {
  renderRightHeader?: () => React.ReactNode;
  title?: string;
}

const DrawerHeader = ({
  title = '',
  renderRightHeader,
}: DrawerHeaderHeaderProps) => {
  const { dispatch } = useNavigation();
  const styles = useStyles();

  const openDrawer = () => {
    dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <InsetSubstitute />
      <View style={styles.header}>
        <Button onPress={openDrawer}>
          <FastImage
            source={images.menu}
            style={styles.icon20}
            tintColor={colors.white}
          />
        </Button>
        <Typo variant="semibold_12" color={colors.white}>
          {title}
        </Typo>
        {renderRightHeader ? (
          renderRightHeader()
        ) : (
          <View style={styles.icon20} />
        )}
      </View>
    </View>
  );
};

export default DrawerHeader;
