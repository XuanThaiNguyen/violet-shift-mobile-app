import { SpacingDefault } from '@components/spacing/spacing';
import colors from '@themes/color';
import { modalUtil } from '@utils/modalUtil';
import { useModalStore } from '@zustand/modalStore';
import React from 'react';
import {
  Dimensions,
  Insets,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export const Modal = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);

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
      backdropColor={colors.backdrop}
      style={options?.mode === 'bottom' ? styles.rnmodal : undefined}
    >
      <TouchableWithoutFeedback onPress={modalUtil.hideModal}>
        <View
          style={[
            styles.centerBackdrop,
            options?.mode === 'bottom' && styles.bottomBackdrop,
          ]}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.centerContainer,
                options?.mode === 'bottom' && styles.bottomContainer,
              ]}
            >
              {options?.children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const useStyles = (insets: Insets) =>
  StyleSheet.create({
    rnmodal: {
      width: SpacingDefault.width,
      alignItems: 'center',
    },
    centerBackdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomBackdrop: {
      justifyContent: 'flex-end',
    },
    centerContainer: {
      width: SpacingDefault.width - SpacingDefault.normal * 2,
      backgroundColor: colors.white,
      padding: 20,
      borderRadius: 12,
    },
    bottomContainer: {
      borderRadius: 0,
      width: SpacingDefault.width,
      marginBottom: insets.bottom ? -insets.bottom : 0,
      paddingBottom: insets.bottom ? insets.bottom + 16 : 16,
    },
  });
