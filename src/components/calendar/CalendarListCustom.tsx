import { Button } from '@components/button';
import { SpacingDefault } from '@components/spacing/spacing';
import colors from '@themes/color';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CalendarListCustomProps {
  onExpand?: () => void;
  date: string;
  setDate?: (date: string) => void;
}

const CalendarListCustom = ({
  onExpand,
  setDate,
  date = new Date().toDateString(),
}: CalendarListCustomProps) => {
  const _onDayPress = (day: DateData) => {
    setDate?.(day.dateString);
    onExpand?.();
  };

  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withTiming(0, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const _handleClose = () => {
    opacity.value = withTiming(0, { duration: 500 });
    translateY.value = withTiming(-50, { duration: 500 }, () => {
      runOnJS(onExpand ?? (() => {}))();
    });
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <CalendarList
        pastScrollRange={12}
        futureScrollRange={12}
        scrollEnabled
        current={date}
        markedDates={{
          [date]: {
            selected: true,
            selectedColor: colors.primaryButton,
            selectedTextColor: colors.white,
          },
        }}
        showScrollIndicator
        onDayPress={_onDayPress}
      />
      <Button
        onPress={_handleClose}
        variant="semibold_14"
        style={styles.btnExpand}
        text="Close Calendar"
        preset="primary"
      />
    </Animated.View>
  );
};

export default CalendarListCustom;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignSelf: 'flex-start',
  },
  btnExpand: {
    position: 'absolute',
    bottom: 28,
    zIndex: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: SpacingDefault.normal,
    height: 32,
  },
});
