import { IUser } from '@models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  currentUser: IUser | null;
  token: string | null;
  setCurrentUser: (newUser: IUser) => void;
  setToken: (token: string) => void;
  updateCurrentUser: (updatedUser: IUser) => void;
  resetAuthStore: () => void;
}

const initialState: Pick<AuthState, 'currentUser' | 'token'> = {
  currentUser: null,
  token: null,
};

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      ...initialState,
      setCurrentUser: newUser => set({ currentUser: newUser }),
      setToken: token => set({ token }),
      updateCurrentUser: updatedUser => set({ currentUser: updatedUser }),
      resetAuthStore: () => set(initialState),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const resetAuthStore = () => {
  const { resetAuthStore } = useAuthStore.getState();
  resetAuthStore();
};

export default useAuthStore;
