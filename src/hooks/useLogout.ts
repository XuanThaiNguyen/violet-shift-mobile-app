import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@zustand/authStore';

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
    onError: () => {},
  });
};
