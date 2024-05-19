import { create } from "zustand";

type Store = {
  unread: number;
  isOpen: boolean;

  setUnread: (unread: number) => void;
  plusOneUnread: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

const useNotificationStore = create<Store>()((set) => ({
  unread: 0,
  isOpen: false,

  setUnread: (unread) => set((state) => ({ ...state, unread: unread })),
  plusOneUnread: () => set((state) => ({ ...state, unread: state.unread + 1 })),
  setIsOpen: (isOpen) =>
    set((state) => {
      if (!isOpen) {
        return { ...state, isOpen: isOpen, unread: 0 };
      }
      return { ...state, isOpen: isOpen };
    }),
}));

export default useNotificationStore;
