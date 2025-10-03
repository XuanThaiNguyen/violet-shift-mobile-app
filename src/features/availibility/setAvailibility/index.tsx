import { Button } from '@components/button';
import BackHeader from '@components/header/BackHeader';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import Radio from '@components/radio';
import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import colors from '@themes/color';
import { DATE_FORMAT, formatDate } from '@utils/handleDateTime';
import { modalUtil } from '@utils/modalUtil';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import DayToggleSection from '../components/DayToggleSection';
import MonthOccurContent from '../components/MonthOccurContent';
import ReasonForm from '../components/ReasonForm';
import RepeatingLoopContent from '../components/RepeatingLoopContent';
import RepeatingModeContent from '../components/RepeatingModeContent';
import RepeatToggleSection from '../components/RepeatToggleSection';
import {
  DatePickerField,
  DatePickerProps,
  RepeatingEnum,
  TimePickerField,
  TimePickerProps,
  TimeRange,
} from '../type';
import { useStyles } from './styles';

const SetAvailibility = () => {
  const styles = useStyles();
  const [availableDate, setAvailableDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState<DatePickerProps>({
    visible: false,
    field: null,
  });

  const [isAvailable, setIsAvailable] = useState(true);
  const [isAllDay, setIsAllDay] = useState(true);
  const [isRepeat, setIsRepeat] = useState(false);
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([
    { startTime: new Date(), endTime: new Date() },
  ]);
  const [timePicker, setTimePicker] = useState<TimePickerProps>({
    visible: false,
    field: null,
    index: null,
  });
  const [repeatingMode, setRepeatingMode] = useState<RepeatingEnum>(
    RepeatingEnum.DAILY,
  );
  const [repeatLoop, setRepeatLoop] = useState(1);
  const [monthOccur, setMonthOccur] = useState(1);
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const [unavailableReason, setUnavailableReason] = useState('');

  const onOpenDatePickerModal = (field: DatePickerField) => () => {
    setDatePicker(prev => ({ ...prev, visible: true, field }));
  };

  const onCloseDatePickerModal = () => {
    setDatePicker(prev => ({ ...prev, visible: false, field: null }));
  };

  const addTimeRange = () => {
    setTimeRanges(prev => [
      ...prev,
      { startTime: new Date(), endTime: new Date() },
    ]);
  };

  const updateTimeRange = (value: Date) => {
    if (timePicker.index !== null && timePicker.field) {
      const updated = [...timeRanges];
      updated[timePicker.index][timePicker.field] = value;
      setTimeRanges(updated);
    }
    setTimePicker(prev => ({
      ...prev,
      visible: false,
      index: null,
      field: null,
    }));
  };

  const removeTimeRange = (index: number) => () => {
    setTimeRanges(prev => prev.filter((_, i) => i !== index));
  };

  const onSetAvalable = (val: boolean) => () => {
    setIsAvailable(val);
  };

  const onToggleAllDay = () => {
    setIsAllDay(prev => !prev);
  };

  const onToggleRepeat = () => {
    setIsRepeat(prev => !prev);
  };

  const onOpenTimePicker =
    (index: number, field: TimePickerField, currentDate: Date) => () => {
      setAvailableDate(currentDate);
      setTimePicker(prev => ({ ...prev, visible: true, index, field }));
    };

  const onCloseTimePicker = () => {
    setTimePicker(prev => ({
      ...prev,
      visible: false,
      index: null,
      field: null,
    }));
  };

  const onConfirmSelectDate = (date: Date) => {
    onCloseDatePickerModal();
    if (datePicker.field === 'availableDate') {
      setAvailableDate(date);
    } else if (datePicker.field === 'endDate') {
      setEndDate(date);
    }
  };

  const onOpenRepeatingModal = () => {
    modalUtil.showModal({
      mode: 'bottom',
      children: (
        <RepeatingModeContent
          selectedMode={repeatingMode}
          onSelectMode={mode => {
            setRepeatingMode(mode);
            setRepeatLoop(1);
          }}
        />
      ),
    });
  };

  const onOpenRepeatingLoopModal = () => {
    modalUtil.showModal({
      mode: 'bottom',
      children: (
        <RepeatingLoopContent
          repeatingMode={repeatingMode}
          selectedRepeatLoop={repeatLoop}
          onSelectRepeatLoop={setRepeatLoop}
        />
      ),
    });
  };

  const onOpenMonthOccur = () => {
    modalUtil.showModal({
      mode: 'bottom',
      children: (
        <MonthOccurContent
          selectedMonthOccur={monthOccur}
          onSelectMonthOccur={setMonthOccur}
        />
      ),
    });
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Set Availibility" />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <View style={styles.viewAvailableOn}>
            <Typo variant="regular_14">Available on</Typo>
            <Button
              onPress={onOpenDatePickerModal('availableDate')}
              style={styles.btnAvailableBox}
            >
              <Typo variant="regular_14">
                {formatDate(availableDate, DATE_FORMAT.FIRST)}
              </Typo>
            </Button>
          </View>
          <Spacer height={20} />
          <DayToggleSection
            timeRanges={timeRanges}
            isAllDay={isAllDay}
            onToggleAllDay={onToggleAllDay}
            onOpenTimePicker={onOpenTimePicker}
            removeTimeRange={removeTimeRange}
            addTimeRange={addTimeRange}
          />
          <RepeatToggleSection
            onOpenMonthOccur={onOpenMonthOccur}
            monthOccur={monthOccur}
            endDate={endDate}
            onOpenDatePickerModal={onOpenDatePickerModal}
            onOpenRepeatingLoopModal={onOpenRepeatingLoopModal}
            onToggleRepeat={onToggleRepeat}
            isRepeat={isRepeat}
            repeatingMode={repeatingMode}
            onOpenRepeatingModal={onOpenRepeatingModal}
            repeatLoop={repeatLoop}
            weekDays={weekDays}
            onChangeWeekDays={setWeekDays}
          />
          <ReasonForm
            isAvailable={isAvailable}
            unavailableReason={unavailableReason}
            setUnavailableReason={setUnavailableReason}
          />
          <Button style={styles.btnSave}>
            <Typo variant="semibold_14" color={colors.white}>
              Save
            </Typo>
          </Button>
        </View>
        <InsetSubstitute type="bottom" />
      </ScrollView>

      <DatePicker
        modal
        mode="date"
        open={datePicker.visible}
        date={availableDate}
        onConfirm={onConfirmSelectDate}
        onCancel={onCloseDatePickerModal}
      />
      <DatePicker
        modal
        mode="time"
        open={timePicker.visible}
        date={availableDate}
        onConfirm={updateTimeRange}
        onCancel={onCloseTimePicker}
      />
    </View>
  );
};

export default SetAvailibility;
