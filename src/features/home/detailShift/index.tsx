import { Button } from '@components/button';
import BackHeader from '@components/header/BackHeader';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { showSnack } from '@components/snackBar';
import { Typo } from '@components/typo/typo';
import { IShiftTask } from '@models/Shift';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ApiStatus } from '@services/ApiStatus';
import { showErrorMessage } from '@services/errorHandler';
import { shiftService } from '@services/shift';
import { QueryObjectResponse } from '@services/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import colors from '@themes/color';
import images from '@themes/images';
import { modalUtil } from '@utils/modalUtil';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ClockInOutContent from '../components/clockInOutContent';
import { SHIFT_TABS } from '../constants';
import { ClockState, DETAIL_SHIFT_TAB } from '../types';
import ShiftDetails from './ShiftDetails';
import ShiftEvents from './ShiftEvents';
import ShiftProgress from './ShiftProgress';
import ShiftTasks from './ShiftTasks';
import { useStyles } from './styles';

const ShiftManager = () => {
  const styles = useStyles();

  const route =
    useRoute<RouteProp<MainStackScreenProps, Screen.ShiftManager>>();

  const shiftId = route.params.shiftId || '';
  const scheduleId = route.params.scheduleId || '';
  const isClocksInAt = route.params.isClocksInAt || 0;
  const isClocksOutAt = route.params.isClocksOutAt || 0;

  const [detailShifTab, setDetailShiftTab] = useState(DETAIL_SHIFT_TAB.DETAILS);
  const [clockState, setClockState] = useState<ClockState>(
    isClocksOutAt > 0
      ? ClockState.OUT
      : isClocksInAt > 0
      ? ClockState.IN
      : ClockState.NONE,
  );

  const queryClient = useQueryClient();

  const { mutate: mutateClockIn } = useMutation({
    mutationFn: shiftService.postClockInShiftByShiftId,
    onSuccess: (data: QueryObjectResponse<IShiftTask>) => {
      if (data.status === ApiStatus.OK) {
        showSnack({
          msg: 'Clock In successfully',
          position: 'top',
          type: 'success',
          iconColor: colors.green,
        });
        setClockState(ClockState.IN);
        queryClient.invalidateQueries({ queryKey: ['myShiftSchedules'] });
      }
    },
    onError: (error: AxiosError) => {
      showErrorMessage(error);
    },
  });

  const { mutate: mutateClockOut } = useMutation({
    mutationFn: shiftService.postClockOutShiftByShiftId,
    onSuccess: (data: QueryObjectResponse<IShiftTask>) => {
      if (data.status === ApiStatus.OK) {
        showSnack({
          msg: 'Clock Out successfully',
          position: 'top',
          type: 'success',
          iconColor: colors.green,
        });
        setClockState(ClockState.OUT);
        queryClient.invalidateQueries({ queryKey: ['myShiftSchedules'] });
      }
    },
    onError: (error: AxiosError) => {
      showErrorMessage(error);
    },
  });

  const onChangeTab = (tab: DETAIL_SHIFT_TAB) => () => {
    setDetailShiftTab(tab);
  };

  let content = <ShiftDetails shiftId={shiftId} />;
  let backTitle = 'Shift Detail';
  switch (detailShifTab) {
    case DETAIL_SHIFT_TAB.DETAILS:
      content = <ShiftDetails shiftId={shiftId} />;
      backTitle = 'Shift Detail';
      break;
    case DETAIL_SHIFT_TAB.TASKS:
      content = <ShiftTasks shiftId={shiftId} />;
      backTitle = 'Shift Tasks';
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

  const onConfirmClockIn = () => {
    mutateClockIn({
      scheduleId,
      shiftId,
    });
    modalUtil.hideModal();
  };

  const onConfirmClockOut = () => {
    mutateClockOut({
      scheduleId,
      shiftId,
    });
    modalUtil.hideModal();
  };

  const onClockIn = () => {
    modalUtil.showModal({
      mode: 'bottom',
      children: (
        <ClockInOutContent
          clockState={clockState}
          onConfirm={
            clockState === ClockState.IN ? onConfirmClockOut : onConfirmClockIn
          }
        />
      ),
    });
  };

  const renderTab = (tab: DETAIL_SHIFT_TAB) => {
    let icon = images.menu;
    switch (tab) {
      case DETAIL_SHIFT_TAB.DETAILS:
        icon = images.menu;
        break;
      case DETAIL_SHIFT_TAB.TASKS:
        icon = images.squareTick;
        break;
      default:
        break;
    }

    const isSelectedTab = detailShifTab === tab;

    return (
      <Button key={tab} style={styles.btnTab} onPress={onChangeTab(tab)}>
        <FastImage
          source={icon}
          style={styles.icon16}
          tintColor={isSelectedTab ? colors.primaryText : colors.secondaryText}
        />
        <Typo
          variant={isSelectedTab ? 'bold_10' : 'regular_10'}
          color={isSelectedTab ? colors.primaryText : colors.secondaryText}
        >
          {tab}
        </Typo>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader title={backTitle} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {content}
      </ScrollView>

      <View style={styles.footer}>
        {clockState !== ClockState.OUT &&
        detailShifTab === DETAIL_SHIFT_TAB.DETAILS ? (
          <View style={styles.viewClock}>
            <Button
              onPress={onClockIn}
              preset="primary"
              text={clockState === ClockState.IN ? 'Clock out' : 'Clock in'}
              style={styles.btnClock}
            />
          </View>
        ) : (
          <></>
        )}
        <View style={styles.shiftTab}>{SHIFT_TABS.map(renderTab)}</View>
        <InsetSubstitute type="bottom" />
      </View>
    </View>
  );
};

export default ShiftManager;
