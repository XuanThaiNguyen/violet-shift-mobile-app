import { SpacingDefault } from '@components/spacing/spacing';
import colors from '@themes/color';
import { modalUtil } from '@utils/modalUtil';
import { useModalStore } from '@zustand/modalStore';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNModal from 'react-native-modal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export const CenterModal = () => {
  const { visible, options } = useModalStore();

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={visible}
      useNativeDriver
      animationIn="slideInUp"
      animationOut="slideOutDown"
      renderToHardwareTextureAndroid
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={1}
      deviceHeight={SCREEN_HEIGHT}
      deviceWidth={SCREEN_WIDTH}
      avoidKeyboard
      backdropColor={'rgba(0,0,0,0.6)'}
    >
      <TouchableWithoutFeedback onPress={modalUtil.hideModal}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>{options?.children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SpacingDefault.width - SpacingDefault.normal * 2,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
  },
});
