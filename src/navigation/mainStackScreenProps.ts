import { IClient } from '@models/Client';
import Screen from './screen';

export type MainStackScreenProps = {
  [Screen.MainStack]: undefined;
  [Screen.Login]: undefined;
  [Screen.Home]: undefined;
  [Screen.Notification]: undefined;
  [Screen.About]: undefined;
  [Screen.ShiftManager]: {
    shiftId: string;
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
};
