import { Button } from '@components/button';
import BackHeader from '@components/header/BackHeader';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import Radio from '@components/radio';
import { showSnack } from '@components/snackBar';
import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import { AvailabilityTypeEnum, CreateAvailability } from '@models/Availibility';
import { useNavigation } from '@react-navigation/native';
import { ApiStatus } from '@services/ApiStatus';
import { availibilityService } from '@services/availibility';
import { showErrorMessage } from '@services/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import colors from '@themes/color';
import { DATE_FORMAT, formatDate } from '@utils/handleDateTime';
import { modalUtil } from '@utils/modalUtil';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RRule, Weekday } from 'rrule';
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

// 0–6 => SU–SA (adjust if your numbering is different)
const WEEKDAY_MAP: Record<number, Weekday> = {
  0: RRule.SU,
  1: RRule.MO,
  2: RRule.TU,
  3: RRule.WE,
  4: RRule.TH,
  5: RRule.FR,
  6: RRule.SA,
};

type BuildPatternArgs = {
  startDate?: Date; // optional, if BE needs dtstart
  repeatingMode: RepeatingEnum;
  repeatLoop: number;
  monthOccur: number;
  weekDays: number[];
};

export const buildRRulePattern = ({
  startDate,
  repeatingMode,
  repeatLoop,
  monthOccur,
  weekDays,
}: BuildPatternArgs): string => {
  const options: Partial<any> = {
    interval: repeatLoop || 1,
  };

  if (startDate) {
    options.dtstart = startDate;
  }

  switch (repeatingMode) {
    case RepeatingEnum.DAILY:
      options.freq = RRule.DAILY;
      break;

    case RepeatingEnum.WEEKLY:
      options.freq = RRule.WEEKLY;
      if (weekDays.length) {
        options.byweekday = weekDays.map(d => WEEKDAY_MAP[d]);
      }
      break;

    case RepeatingEnum.MONTHLY:
      options.freq = RRule.MONTHLY;
      options.bymonthday = [monthOccur];
      break;

    default:
      options.freq = RRule.DAILY;
      break;
  }

  return new RRule(options as any).toString();
};

const SetAvailibility = () => {
  const styles = useStyles();
  const { goBack } = useNavigation();

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

  const queryClient = useQueryClient();

  const { mutate: mutateAvailibility, isPending: isPendingAvailibility } =
    useMutation({
      mutationFn: availibilityService.addAvailibity,
      onSuccess: data => {
        if (data.status === ApiStatus.OK) {
          showSnack({
            msg: 'Availibility successfully',
            position: 'top',
            type: 'success',
            iconColor: colors.green,
          });
          queryClient.invalidateQueries({ queryKey: ['myAvailibilities'] });
          goBack();
        }
      },
      onError: (error: AxiosError) => {
        showErrorMessage(error);
      },
    });

  const onSave = () => {
    if (isRepeat && endDate < availableDate) {
      showSnack({
        msg: 'End date should be the same or after start date',
        position: 'top',
        type: 'error',
      });
      return;
    }

    const timeSegments = isAllDay
      ? [{ from: 0, to: 1439 }]
      : timeRanges.map(range => ({
          from: range.startTime.getHours() * 60 + range.startTime.getMinutes(),
          to: range.endTime.getHours() * 60 + range.endTime.getMinutes(),
        }));

    const params: CreateAvailability = {
      type: isAvailable
        ? AvailabilityTypeEnum.AVAILABLE
        : AvailabilityTypeEnum.UNAVAILABLE,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      date: availableDate.getTime(),
      timeSegments,
    };

    if (!isAvailable && !!unavailableReason) {
      params.note = unavailableReason;
    }

    if (isRepeat) {
      params.repeat = {
        endsAt: endDate.getTime(),
        pattern: buildRRulePattern({
          startDate: availableDate,
          repeatingMode,
          repeatLoop,
          monthOccur,
          weekDays,
        }),
      };
    }

    mutateAvailibility({ params });
  };

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

  const onOpenTimePicker = (index: number, field: TimePickerField) => () => {
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
          <Button
            buttonColor={
              !isAvailable && !unavailableReason
                ? colors.disabledButton
                : colors.primary
            }
            style={styles.btnSave}
            onPress={onSave}
            loading={isPendingAvailibility}
            disabled={!isAvailable && !unavailableReason}
          >
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
