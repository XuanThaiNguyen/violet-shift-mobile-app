import { ReactNode } from 'react';
import { create } from 'zustand';

type ModalOptions = {
  children?: ReactNode;
};

interface ModalState {
  visible: boolean;
  hideTimer?: ReturnType<typeof setTimeout> | null;
  hideModal: (delay?: number) => void;
  options: ModalOptions | null;
  showModal: (options: ModalOptions) => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  visible: false,
  options: null,
  hideTimer: null,

  showModal: options => {
    // clear any existing hide timer before showing again
    const { hideTimer } = get();
    if (hideTimer) clearTimeout(hideTimer);

    set({ visible: true, options, hideTimer: null });
  },

  hideModal: (delay = 300) => {
    // clear any existing hide timer
    const { hideTimer } = get();
    if (hideTimer) clearTimeout(hideTimer);

    set({ visible: false });
    const timer = setTimeout(() => {
      set({ options: null, hideTimer: null });
    }, delay);

    set({ hideTimer: timer });
  },
}));
