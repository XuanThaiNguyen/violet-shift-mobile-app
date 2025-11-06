import { EmploymentTypeEnum } from '@models/User';
import {
  DETAIL_SHIFT_TAB,
  ProgressOptionKeyEnum,
  ProgressOptionProps,
  ShiftTypeKey,
} from './types';
import images from '@themes/images';

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

export const SHIFT_TABS = [
  DETAIL_SHIFT_TAB.DETAILS,
  DETAIL_SHIFT_TAB.TASKS,
  DETAIL_SHIFT_TAB.PROGRESS,
  DETAIL_SHIFT_TAB.EVENTS,
];

export const PROGRESS_OPTIONS: ProgressOptionProps[] = [
  {
    key: ProgressOptionKeyEnum.NOTE,
    label: 'Note',
    icon: images.note,
  },
  {
    key: ProgressOptionKeyEnum.FEEDBACK,
    label: 'Feedback',
    icon: images.feedback,
  },
  {
    key: ProgressOptionKeyEnum.INCIDENT,
    label: 'Incident',
    icon: images.avatar,
  },
  {
    key: ProgressOptionKeyEnum.ENQUIRY,
    label: 'Enquiry',
    icon: images.avatar,
  },
  {
    key: ProgressOptionKeyEnum.MILEAGE,
    label: 'Mileage',
    icon: images.avatar,
  },
  {
    key: ProgressOptionKeyEnum.EXPENSE,
    label: 'Expense',
    icon: images.avatar,
  },
];

export const SIGNATURE_TYPES = ['client', 'staff'] as const;
