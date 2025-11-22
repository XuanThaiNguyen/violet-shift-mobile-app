import dayjs from 'dayjs';

export interface IAvailibility {
  staff: string;
  type?: AvailabilityTypeEnum;
  from: number; // 0 -> 1440
  to: number; // 0 -> 1440
  note?: string;
  isApproved?: boolean;
  isDeleted?: boolean;
  _id: string;
}

export interface CreateAvailability {
  repeat?: {
    pattern: string;
    endsAt: number;
  };
  timeSegments: {
    from: number; // 0 -> 1440
    to: number; // 0 -> 1440
  }[];
  date: number; // unix timestamp
  tz: string;
  note?: string;
  type: AvailabilityTypeEnum;
}

export enum AvailabilityTypeEnum {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

export interface WeekDataAvailibility {
  id: string;
  date: dayjs.Dayjs;
  leaves: IAvailibility[];
}
