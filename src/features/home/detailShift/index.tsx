import { Button } from '@components/button';
import BackHeader from '@components/header/BackHeader';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import colors from '@themes/color';
import images from '@themes/images';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ShiftDetails from './ShiftDetails';
import ShiftEvents from './ShiftEvents';
import ShiftProgress from './ShiftProgress';
import ShiftTasks from './ShiftTasks';
import { useStyles } from './styles';

enum DETAIL_SHIFT_TAB {
  DETAILS = 'DETAILS',
  TASKS = 'TASKS',
  PROGRESS = 'PROGRESS',
  EVENTS = 'EVENTS',
}

const DetailShift = () => {
  const styles = useStyles();

  const [detailShifTab, setDetailShiftTab] = useState(DETAIL_SHIFT_TAB.DETAILS);

  const onChangeTab = (tab: DETAIL_SHIFT_TAB) => () => {
    setDetailShiftTab(tab);
  };

  let content = <ShiftDetails />;
  switch (detailShifTab) {
    case DETAIL_SHIFT_TAB.DETAILS:
      content = <ShiftDetails />;
      break;
    case DETAIL_SHIFT_TAB.TASKS:
      content = <ShiftTasks />;
      break;
    case DETAIL_SHIFT_TAB.PROGRESS:
      content = <ShiftProgress />;
      break;
    case DETAIL_SHIFT_TAB.EVENTS:
      content = <ShiftEvents />;
      break;
    default:
      break;
  }

  return (
    <View style={styles.container}>
      <BackHeader title="Sample - Personal Care" />
      <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>

      <View style={styles.footer}>
        {detailShifTab === DETAIL_SHIFT_TAB.DETAILS ? (
          <View style={styles.viewClock}>
            <Button preset="primary" text="Clock in" style={styles.btnClock} />
          </View>
        ) : (
          <></>
        )}
        <View style={styles.shiftTab}>
          <Button
            style={styles.btnTab}
            onPress={onChangeTab(DETAIL_SHIFT_TAB.DETAILS)}
          >
            <FastImage
              source={images.menu}
              style={styles.icon16}
              tintColor={
                detailShifTab === DETAIL_SHIFT_TAB.DETAILS
                  ? colors.primaryText
                  : colors.secondaryText
              }
            />
            <Typo
              variant={
                detailShifTab === DETAIL_SHIFT_TAB.DETAILS
                  ? 'medium_10'
                  : 'regular_10'
              }
              color={
                detailShifTab === DETAIL_SHIFT_TAB.DETAILS
                  ? colors.primaryText
                  : colors.secondaryText
              }
            >
              {DETAIL_SHIFT_TAB.DETAILS}
            </Typo>
          </Button>
          <Button
            style={styles.btnTab}
            onPress={onChangeTab(DETAIL_SHIFT_TAB.TASKS)}
          >
            <FastImage
              source={images.squareTick}
              style={styles.icon16}
              tintColor={
                detailShifTab === DETAIL_SHIFT_TAB.TASKS
                  ? colors.primaryText
                  : colors.secondaryText
              }
            />
            <Typo
              variant={
                detailShifTab === DETAIL_SHIFT_TAB.TASKS
                  ? 'medium_10'
                  : 'regular_10'
              }
              color={
                detailShifTab === DETAIL_SHIFT_TAB.TASKS
                  ? colors.primaryText
                  : colors.secondaryText
              }
            >
              {DETAIL_SHIFT_TAB.TASKS}
            </Typo>
          </Button>
          <Button
            style={styles.btnTab}
            onPress={onChangeTab(DETAIL_SHIFT_TAB.PROGRESS)}
          >
            <FastImage
              source={images.squareTick}
              style={styles.icon16}
              tintColor={
                detailShifTab === DETAIL_SHIFT_TAB.PROGRESS
                  ? colors.primaryText
                  : colors.secondaryText
              }
            />
            <Typo
              variant={
                detailShifTab === DETAIL_SHIFT_TAB.PROGRESS
                  ? 'medium_10'
                  : 'regular_10'
              }
              color={
                detailShifTab === DETAIL_SHIFT_TAB.PROGRESS
                  ? colors.primaryText
                  : colors.secondaryText
              }
            >
              {DETAIL_SHIFT_TAB.PROGRESS}
            </Typo>
          </Button>
          <Button
            style={styles.btnTab}
            onPress={onChangeTab(DETAIL_SHIFT_TAB.EVENTS)}
          >
            <FastImage
              source={images.squareTick}
              style={styles.icon16}
              tintColor={
                detailShifTab === DETAIL_SHIFT_TAB.EVENTS
                  ? colors.primaryText
                  : colors.secondaryText
              }
            />
            <Typo
              variant={
                detailShifTab === DETAIL_SHIFT_TAB.EVENTS
                  ? 'medium_10'
                  : 'regular_10'
              }
              color={
                detailShifTab === DETAIL_SHIFT_TAB.EVENTS
                  ? colors.primaryText
                  : colors.secondaryText
              }
            >
              {DETAIL_SHIFT_TAB.EVENTS}
            </Typo>
          </Button>
        </View>
        <InsetSubstitute type="bottom" />
      </View>
    </View>
  );
};

export default DetailShift;
