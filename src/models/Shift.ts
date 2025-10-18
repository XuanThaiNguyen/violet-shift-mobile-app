import dayjs from 'dayjs';
import { IClient } from './Client';
import { IUser } from './User';

export interface IShiftRepeat {
  pattern: string; // cron pattern [second] [minute] [hour] [day of month] [month] [day of week]
  endDate: number; // unix timestamp
  tz: string; // timezone
}

export const ShiftTypes = [
  'personal_care',
  'board_n_lodging',
  'domestic_assistance',
  'night_shift',
  'on_call',
  'recall_to_work',
  'remote_work',
  'respite_care',
  'sleepover',
  'support_coordination',
  'transport',
  '24_hour_care',
] as const;
export const Allowances = ['expense', 'mileage', 'sleepover'] as const;
export const ShiftStatus = ['booked', 'started', 'completed'] as const;

export type AllowancesEnum = (typeof Allowances)[number];
export type ShiftTypesEnum = (typeof ShiftTypes)[number];
export type ShiftStatusEnum = (typeof ShiftStatus)[number];

export interface IStaffSchedule {
  _id: string;
  shift: {
    _id: string;
    shiftType: string;
    address: string;
  };
  staff: string;
  timeFrom: number;
  timeTo: number;
  clientNames: string[];
  paymentMethod: 'default' | 'cash';
  status: ShiftStatusEnum;
  clocksInAt: number; // unix timestamp
  clocksOutAt: number; // unix timestamp
}

export interface WeekDataSchedule {
  id: string;
  date: dayjs.Dayjs;
  shifts: IStaffSchedule[];
}

export interface IShiftTask {
  shift: IDetailShift | string;
  name: string;
  description: string;
  isMandatory: boolean;
  isCompleted: boolean;
  completedAt: Date;
  _id: string;
}

export interface IDetailShift {
  // shift information
  shiftType: ShiftTypesEnum;
  additionalShiftTypes: ShiftTypesEnum[];
  allowances: AllowancesEnum[];
  mileageInvoicing: Array<string | IUser>;
  shiftMileage: number;
  additionalCost: number;
  ignoreStaffCount: boolean;
  confirmationRequired: boolean;
  acceptedDeclinable: boolean;

  // time and location
  timeFrom: number; // unix timestamp
  timeTo: number; // unix timestamp
  breakTime: number; // minutes
  address: string; // address
  unitNumber: string; // unit/department/door number
  bonus: number; // bonus
  dropOffAddress?: string; // drop off address
  dropOffUnitNumber?: string; // drop off unit/department/door number
  repeat: IShiftRepeat | string;

  // instruction
  instruction: string; // rich text

  // tasks
  tasks: IShiftTask[];

  // mileage information
  mileageCap: number; // miles
  mileage: number; // miles
  isCompanyVehicle: boolean;

  // clock-out information
  clientClockOutRequired: boolean;
  staffClockOutRequired: boolean;
  clientClockOutTime: number; // unix timestamp
  staffClockOutTime: number; // unix timestamp
}

export interface IClientScheduleOfDetailShift {
  _id: string;
  shift: IDetailShift | string;
  client: IClient;
  timeFrom: number; // unix timestamp
  timeTo: number; // unix timestamp
}

export interface IStaffScheduleOfDetailShift {
  _id: string;
  shift: string;
  staff: IUser;
  timeFrom: number;
  timeTo: number;
}
