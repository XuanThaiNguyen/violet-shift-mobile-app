/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BG_DEFAULT,
  BG_ERROR,
  BG_INFO,
  BG_SUCCESS,
  BG_WARN,
  DURATION_ANIMATED,
} from './constant';
import { SpacingDefault } from '@components/spacing/spacing';
import { Spacer } from '@components/spacer';
import { Button } from '@components/button';
import { sharedTiming, useSharedTransition } from '@utils/handleAnimated';
import images from '@themes/images';
import { SnackBarItemProps, TypeMessage } from './type';
import { useStyles } from './styles';
import { Typo } from '@components/typo/typo';

const { height } = Dimensions.get('window');
const POSITION = 140;
const VIEW_HEIGHT = 48;
const TAB_HEIGHT = 50;

const getColor = (
  typeMessage: TypeMessage,
  borderLeftColor: Omit<SnackBarItemProps, 'item' | 'onPop'>,
): string => {
  const {
    borderLeftColorError,
    borderLeftColorInfo,
    borderLeftColorSuccess,
    borderLeftColorWarn,
    borderLeftColorDefault,
  } = borderLeftColor;
  switch (typeMessage) {
    case 'success':
      return borderLeftColorSuccess ? borderLeftColorSuccess : BG_SUCCESS;
    case 'info':
      return borderLeftColorInfo ? borderLeftColorInfo : BG_INFO;
    case 'warn':
      return borderLeftColorWarn ? borderLeftColorWarn : BG_WARN;
    case 'error':
      return borderLeftColorError ? borderLeftColorError : BG_ERROR;
    default:
      return borderLeftColorDefault ? borderLeftColorDefault : BG_DEFAULT;
  }
};

const typeChecker = ['warn', 'success'];

export const SnackBarItem = memo(
  ({
    item,
    onPop,
    borderLeftColorError,
    borderLeftColorInfo,
    borderLeftColorSuccess,
    borderLeftColorWarn,
  }: SnackBarItemProps) => {
    //style
    const styles = useStyles();
    const insets = useSafeAreaInsets();

    // state
    const [isShow, setIsShow] = useState<boolean>(true);

    let initPosition = -POSITION;
    let showUpPosition = hasNotch() ? 0 : 10;
    if (item.position === 'bottom') {
      initPosition = height;
      showUpPosition = item.isIncludedBottomHeight
        ? height -
          VIEW_HEIGHT -
          TAB_HEIGHT -
          insets.bottom -
          (insets.top * 3) / 2
        : height - POSITION + 50 - insets.bottom - SpacingDefault.normal;
    }

    if (item.position === 'top_under_header') {
      showUpPosition += 52;
    }

    // reanimated
    const opacity = useSharedTransition(isShow, {
      duration: DURATION_ANIMATED,
    });
    const translateY = useSharedValue(initPosition);

    // function
    const _onClose = useCallback(() => {
      setIsShow(false);
    }, []);

    // effect
    useEffect(() => {
      const id = setTimeout(() => {
        setIsShow(false);
      }, item.interval + DURATION_ANIMATED);

      return () => {
        clearTimeout(id);
      };
    }, [item.interval]);

    useEffect(() => {
      if (isShow) {
        translateY.value = sharedTiming(showUpPosition, {
          duration: DURATION_ANIMATED,
          easing: Easing.inOut(Easing.ease),
        });
      } else {
        translateY.value = sharedTiming(initPosition, {
          duration: DURATION_ANIMATED,
          easing: Easing.inOut(Easing.ease),
        });
      }
    }, [isShow]);

    useEffect(() => {
      let id: ReturnType<typeof setTimeout> | null = null;

      if (!isShow) {
        id = setTimeout(() => {
          onPop(item);
        }, DURATION_ANIMATED);
      }

      return () => {
        if (id) {
          clearTimeout(id);
        }
      };
    }, [isShow, item, onPop]);

    // animated style
    const itemBarAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }));

    const getIconByType = () => {
      switch (item.type) {
        case 'success':
          return !item.icon ? images.circleCheck : item.icon;
        default:
          return;
      }
    };

    const renderIcon = () => {
      if (React.isValidElement(item.icon)) {
        return item.icon;
      }

      return (
        <FastImage
          source={getIconByType()}
          style={styles.icon24}
          tintColor={item.iconColor}
        />
      );
    };

    const onPressDetail = () => {};

    // render
    if (typeChecker.includes(item.type)) {
      return (
        <Animated.View
          style={[
            styles.defaultView,
            item?.bgTooltip ? { backgroundColor: item?.bgTooltip } : {},
            item?.disableHeight ? {} : styles.height,
            itemBarAnimatedStyle,
          ]}
        >
          <View style={[styles.viewIcon, { paddingVertical: item?.pVer || 0 }]}>
            {renderIcon()}
            <Spacer width={'small'} />
            <Typo style={styles.block} variant="semibold_12">
              {item.msg}
            </Typo>
          </View>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.defaultView,
          item?.disableHeight ? {} : styles.height,
          itemBarAnimatedStyle,
          styles.itemBar,
          {
            borderLeftColor: getColor(item.type, {
              borderLeftColorError,
              borderLeftColorInfo,
              borderLeftColorSuccess,
              borderLeftColorWarn,
              isIncludedBottomHeight: false,
            }),
          },
        ]}
      >
        <View style={styles.msg}>
          <Typo variant="semibold_12">{item.msg}</Typo>
          <Animated.View>
            <Button onPress={_onClose}>
              <FastImage source={images.close} style={styles.icon16} />
            </Button>
          </Animated.View>
        </View>
      </Animated.View>
    );
  },
  () => true,
);
