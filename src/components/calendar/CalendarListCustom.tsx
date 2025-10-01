import { Button } from '@components/button';
import { SpacingDefault } from '@components/spacing/spacing';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

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
  return (
    <Animated.View
      entering={FadeInUp.duration(500)}
      exiting={FadeOutDown.duration(500)}
    >
      <View style={styles.container}>
        <CalendarList
          pastScrollRange={12}
          futureScrollRange={12}
          scrollEnabled
          current={date}
          markedDates={{
            [date]: {
              selected: true,
              selectedColor: '#00adf5', // or your theme color
              selectedTextColor: '#ffffff',
            },
          }}
          showScrollIndicator
          onDayPress={day => {
            setDate?.(day.dateString);
            onExpand?.();
          }}
        />
        <Button
          onPress={onExpand}
          variant="semibold_14"
          style={styles.btnExpand}
          text="Close Calendar"
          preset="primary"
        />
      </View>
    </Animated.View>
  );
};

export default CalendarListCustom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
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
