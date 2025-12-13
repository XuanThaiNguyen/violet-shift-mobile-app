import { Source } from 'react-native-fast-image';

export enum DETAIL_SHIFT_TAB {
  DETAILS = 'DETAILS',
  TASKS = 'TASKS',
  PROGRESS = 'PROGRESS',
  EVENTS = 'EVENTS',
}

export enum ClockState {
  IN = 'IN',
  OUT = 'OUT',
  NONE = 'NONE',
}

export enum ProgressOptionKeyEnum {
  NOTE = 'note',
  FEEDBACK = 'feedback',
  INCIDENT = 'incident',
  ENQUIRY = 'enquiry',
  MILEAGE = 'mileage',
  EXPENSE = 'expense',
}

export interface ProgressOptionProps {
  key: ProgressOptionKeyEnum;
  label: string;
  icon: Source;
}

export enum ShiftTypeKey {
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

export enum MileageStartPointEnum {
  NONE = 'none',
  HOME = 'HOME',
  PREVIOUS_SHIFT = 'PREVIOUS_SHIFT',
}

export type DocumentItem = {
  id: string;
  uri: string;
  fileName: string;
  type: string;
  title: string;
};
