import { Button } from '@components/button';
import BottomModalHeader from '@components/header/BottomModalHeader';
import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import images from '@themes/images';
import { modalUtil } from '@utils/modalUtil';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { REPEATING_MODE } from '../constant';

interface RepeatingModeContentProps {
  selectedMode: any;
  onSelectMode?: (mode: any) => void;
}

const RepeatingModeContent = ({
  selectedMode,
  onSelectMode,
}: RepeatingModeContentProps) => {
  const _handleSelectMode = (mode: any) => () => {
    onSelectMode?.(mode);
    modalUtil.hideModal();
  };

  return (
    <View>
      <BottomModalHeader title="Select Repeating Mode" />
      <Spacer height={24} />
      {REPEATING_MODE.map(mode => {
        return (
          <Button
            onPress={_handleSelectMode(mode)}
            style={styles.btn}
            key={mode}
          >
            <Typo variant="regular_14">{mode}</Typo>
            {mode === selectedMode && (
              <FastImage source={images.check} style={styles.icon20} />
            )}
          </Button>
        );
      })}
    </View>
  );
};

export default RepeatingModeContent;

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon20: {
    width: 20,
    height: 20,
  },
});
