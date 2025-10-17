import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@zustand/authStore';
import { AxiosError } from 'axios';

const fakeLogout = async () => {
  return new Promise((resolve: any) => setTimeout(resolve, 1500)); // simulate API delay
};

export const useLogout = () => {
  const { resetAuthStore } = useAuthStore();

  return useMutation({
    mutationFn: fakeLogout,
    onSuccess: () => {
      resetAuthStore();
    },
    onError: (error: AxiosError) => {
      console.error('Logout failed:', error);
    },
  });
};
