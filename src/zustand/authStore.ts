import { IAuth } from '@models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  currentUser: IAuth | null;
  setCurrentUser: (newUser: IAuth) => void;
  updateCurrentUser: (updatedUser: IAuth) => void;
  resetAuthStore: () => void;
}

const initialState: Pick<AuthState, 'currentUser'> = {
  currentUser: null,
};

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      ...initialState,
      setCurrentUser: newUser => set({ currentUser: newUser }),
      updateCurrentUser: updatedUser => set({ currentUser: updatedUser }),
      resetAuthStore: () => set(initialState),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
