import { Button } from '@components/button';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { Typo } from '@components/typo/typo';
import { useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useStyles } from './styles';

interface BackHeaderProps {
  renderRightHeader?: () => React.ReactNode;
  title?: string;
}

const BackHeader = ({ title = '', renderRightHeader }: BackHeaderProps) => {
  const { goBack } = useNavigation();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <InsetSubstitute />
      <View style={styles.header}>
        <Button style={styles.btnBack} onPress={goBack}>
          <FastImage
            source={images.back}
            style={styles.icon16}
            tintColor={colors.white}
          />
          <Typo variant="semibold_14" color={colors.white}>
            {title}
          </Typo>
        </Button>
        {renderRightHeader ? (
          renderRightHeader()
        ) : (
          <View style={styles.icon20} />
        )}
      </View>
    </View>
  );
};

export default BackHeader;
