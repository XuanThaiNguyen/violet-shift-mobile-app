import { ProgressOptionKeyEnum } from '@features/home/types';
import { IClient } from '@models/Client';
import { IShiftProgress } from '@models/Shift';
import Screen from './screen';

export type MainStackScreenProps = {
  [Screen.MainStack]: undefined;
  [Screen.Login]: undefined;
  [Screen.Home]: undefined;
  [Screen.Notification]: undefined;
  [Screen.About]: undefined;
  [Screen.ShiftManager]: {
    shiftId: string;
    scheduleId: string;
    isClocksInAt: number;
    isClocksOutAt: number;
  };
  [Screen.Availibility]: undefined;
  [Screen.SetAvailibility]: undefined;
  [Screen.Profile]: {
    mode: 'mine' | 'client';
    clientInfo?: IClient;
  };
  [Screen.AllShiftClients]: {
    clients: IClient[];
  };
  [Screen.AddProgress]: {
    key: ProgressOptionKeyEnum;
    label: string;
    shiftId: string;
  };
  [Screen.UpdateProgress]: {
    detailProgress: IShiftProgress;
  };
  [Screen.ProgressDetail]: {
    shiftId: string;
    shiftProgressId: string;
  };
};
