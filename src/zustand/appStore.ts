import AsyncStorage from '@react-native-async-storage/async-storage';
import { isIos } from '@themes/constant';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum CalendarKeyEnum {
  INITIAL = 'initial',
  READY = 'ready',
}

interface AppState {
  calendarKey: CalendarKeyEnum;
  setCalendarKey: (key: CalendarKeyEnum) => void;
}

const useAppStore = create<AppState>()(
  persist(
    set => ({
      calendarKey: isIos ? CalendarKeyEnum.READY : CalendarKeyEnum.INITIAL,
      setCalendarKey: key => set({ calendarKey: key }),
    }),
    {
      name: 'app-storage', // AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAppStore;
