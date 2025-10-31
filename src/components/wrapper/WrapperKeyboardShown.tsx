import colors from '@themes/color';
import { useSharedTransition } from '@utils/handleAnimated';
import { useKeyboard } from '@utils/handleKeyboard';
import React, { useEffect, useState } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface AnimatedBottomBoxProps {
  children: React.ReactNode;
  callBackHeight?: (value: number) => void;
  zIndex?: number;
}

const WrapperKeyboardShown = ({
  children,
  callBackHeight,
  zIndex,
}: AnimatedBottomBoxProps) => {
  const { keyboardShown } = useKeyboard();
  const progress = useSharedTransition(!!keyboardShown);
  const [heightBottomBox, setHeightBottomBox] = useState<number>(0);
  const animStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: zIndex,
      right: 0,
      backgroundColor: colors.transparent,
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 1],
            [0, heightBottomBox + 32],
          ),
        },
      ],
    };
  });

  useEffect(() => {
    if (heightBottomBox && typeof callBackHeight === 'function') {
      callBackHeight(heightBottomBox);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightBottomBox]);

  return (
    <Animated.View
      style={animStyle}
      onLayout={({ nativeEvent }) =>
        setHeightBottomBox(nativeEvent.layout.height)
      }
    >
      {children}
    </Animated.View>
  );
};

export default WrapperKeyboardShown;
