import { useModalStore } from '@zustand/modalStore';

export const modalUtil = {
  showModal: (options: { children?: React.ReactNode }) =>
    useModalStore.getState().showModal(options),
  hideModal: () => useModalStore.getState().hideModal(),
};
