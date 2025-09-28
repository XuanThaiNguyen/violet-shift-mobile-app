import { User } from '@models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  currentUser: User | null;
  setCurrentUser: (newUser: User) => void;
  removeCurrentUser: () => void;
  updateCurrentUser: (updatedUser: User) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      currentUser: null,
      setCurrentUser: newUser => set({ currentUser: newUser }),
      removeCurrentUser: () => set({ currentUser: null }),
      updateCurrentUser: updatedUser => set({ currentUser: updatedUser }),
    }),
    {
      name: 'auth-storage', // key trong localStorage
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
