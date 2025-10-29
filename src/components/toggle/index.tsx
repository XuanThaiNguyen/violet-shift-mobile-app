import colors from '@themes/color';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SWITCH_WIDTH = 60;
const SWITCH_HEIGHT = 30;
const KNOB_SIZE = 24;
const PADDING = 3;

interface ToggleProps {
  isOn?: boolean;
  onPress?: () => void;
  width?: number;
  height?: number;
  knobSize?: number;
  padding?: number;
}

const Toggle: React.FC<ToggleProps> = ({
  isOn = false,
  onPress,
  width = SWITCH_WIDTH,
  height = SWITCH_HEIGHT,
  knobSize = KNOB_SIZE,
  padding = PADDING,
}) => {
  const progress = useSharedValue(isOn ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isOn ? 1 : 0, {
      duration: 300,
    });
  }, [isOn]);

  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.divider, colors.backgroundToggle],
    );
    return { backgroundColor };
  });

  const knobStyle = useAnimatedStyle(() => {
    const translateX = progress.value * (width - knobSize - padding * 2);
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.disabledToggle, colors.toggle],
    );
    return {
      transform: [{ translateX }],
      backgroundColor,
    };
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.container,
          { height, width, borderRadius: height / 2, padding },
          containerStyle,
        ]}
      >
        <Animated.View
          style={[
            { width: knobSize, height: knobSize, borderRadius: knobSize / 2 },
            knobStyle,
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default Toggle;
