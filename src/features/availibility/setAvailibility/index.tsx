import { Button } from '@components/button';
import BackHeader from '@components/header/BackHeader';
import Radio from '@components/radio';
import { Spacer } from '@components/spacer';
import Toggle from '@components/toggle';
import { Typo } from '@components/typo/typo';
import ForgetPassword from '@features/authentication/components/forgetPassword';
import { modalUtil } from '@utils/modalUtil';
import React, { useState } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useStyles } from './styles';

const SetAvailibility = () => {
  const styles = useStyles();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [isAvailable, setIsAvailable] = useState(true);
  const [isAllDay, setIsAllDay] = useState(true);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [isOpenTimePicker, setIsOpenTimePicker] = useState(false);

  const onSetAvalable = (val: boolean) => () => {
    setIsAvailable(val);
  };

  const onToggleAllDay = () => {
    setIsAllDay(prev => !prev);
  };

  const openModal = () => {
    modalUtil.showModal({
      mode: 'bottom',
      children: <ForgetPassword />,
    });
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Set Availibility" />
      <Spacer height={20} />
      <View style={styles.wrapper}>
        <View style={styles.viewSet}>
          <Typo variant="regular_14">Set for</Typo>
          <View style={styles.viewSelect}>
            <Button onPress={onSetAvalable(true)} style={styles.btnRadio}>
              <Radio isSelected={isAvailable} />
              <Typo variant="regular_14">Available</Typo>
            </Button>
            <Button onPress={onSetAvalable(false)} style={styles.btnRadio}>
              <Radio isSelected={!isAvailable} />
              <Typo variant="regular_14">Unavailable</Typo>
            </Button>
          </View>
        </View>
        <Spacer height={20} />
        <View style={styles.viewToggleDay}>
          <Typo variant="regular_14">All day</Typo>
          <Toggle onPress={onToggleAllDay} isOn={isAllDay} />
        </View>
        <Spacer height={20} />
        <Button onPress={() => setIsOpenDatePicker(true)}>
          <Typo variant="regular_14">{`Pick date: ${date}`}</Typo>
        </Button>
        <Spacer height={20} />
        <Button onPress={() => setIsOpenTimePicker(true)}>
          <Typo variant="regular_14">{`Pick time: ${time}`}</Typo>
        </Button>
        <Spacer height={20} />
        <Button onPress={openModal}>
          <Typo variant="regular_14">Open Modal</Typo>
        </Button>
      </View>

      <DatePicker
        modal
        mode="date"
        open={isOpenDatePicker}
        date={date}
        onConfirm={date => {
          setIsOpenDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setIsOpenDatePicker(false);
        }}
      />
      <DatePicker
        modal
        mode="time"
        open={isOpenTimePicker}
        date={time}
        onConfirm={date => {
          setIsOpenTimePicker(false);
          setTime(date);
        }}
        onCancel={() => {
          setIsOpenTimePicker(false);
        }}
      />
    </View>
  );
};

export default SetAvailibility;
