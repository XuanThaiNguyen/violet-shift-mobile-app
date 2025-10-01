import { ModalOptions, useModalStore } from '@zustand/modalStore';

export const modalUtil = {
  showModal: (options: ModalOptions) =>
    useModalStore.getState().showModal(options),
  hideModal: () => useModalStore.getState().hideModal(),
};
