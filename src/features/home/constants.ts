import { EmploymentTypeEnum } from '@models/User';
import { DETAIL_SHIFT_TAB } from './types';

enum ShiftTypeKey {
  PERSONAL_CARE = 'personal_care',
  BOARD_N_LODGING = 'board_n_lodging',
  DOMESTIC_ASSISTANCE = 'domestic_assistance',
  NIGHT_SHIFT = 'night_shift',
  ON_CALL = 'on_call',
  RECALL_TO_WORK = 'recall_to_work',
  REMOTE_WORK = 'remote_work',
  RESPITE_CARE = 'respite_care',
  SLEEPOVER = 'sleepover',
  SUPPORT_COORDINATION = 'support_coordination',
  TRANSPORT = 'transport',
  FULL_HOUR_CARE = '24_hour_care',
}

export const ShiftTypeOptions = [
  {
    label: 'Personal Care',
    key: ShiftTypeKey.PERSONAL_CARE,
  },
  {
    label: 'Board and Lodging',
    key: ShiftTypeKey.BOARD_N_LODGING,
  },
  {
    label: 'Domestic Assistance',
    key: ShiftTypeKey.DOMESTIC_ASSISTANCE,
  },
  {
    label: 'Night Shift',
    key: ShiftTypeKey.NIGHT_SHIFT,
  },
  {
    label: 'On Call',
    key: ShiftTypeKey.ON_CALL,
  },
  {
    label: 'Recall to work',
    key: ShiftTypeKey.RECALL_TO_WORK,
  },
  {
    label: 'Remote Work',
    key: ShiftTypeKey.REMOTE_WORK,
  },
  {
    label: 'Respite Care',
    key: ShiftTypeKey.RESPITE_CARE,
  },
  {
    label: 'Sleepover',
    key: ShiftTypeKey.SLEEPOVER,
  },
  {
    label: 'Support Coordication',
    key: ShiftTypeKey.SUPPORT_COORDINATION,
  },
  {
    label: 'Transport',
    key: ShiftTypeKey.TRANSPORT,
  },
  {
    label: '24 Hour Care',
    key: ShiftTypeKey.FULL_HOUR_CARE,
  },
];

export const EmploymentTypeOptions = {
  [EmploymentTypeEnum.FULL_TIME]: 'Full Time',
  [EmploymentTypeEnum.PART_TIME]: 'Part Time',
  [EmploymentTypeEnum.CONTRACT]: 'Contract',
  [EmploymentTypeEnum.CASUAL]: 'Casual',
  [EmploymentTypeEnum.OTHER]: 'Other',
};

export const SHIFT_TABS = [DETAIL_SHIFT_TAB.DETAILS, DETAIL_SHIFT_TAB.TASKS];
