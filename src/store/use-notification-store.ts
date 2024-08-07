import { create } from "zustand";

/**
 * Type definition for the store's state and actions.
 */
type Store = {
  /**
   * Number of unread notifications.
   */
  unread: number;

  /**
   * Indicates whether the notification panel is open.
   */
  isOpen: boolean;

  /**
   * Sets the number of unread notifications.
   *
   * @param unread - The new number of unread notifications.
   */
  setUnread: (unread: number) => void;

  /**
   * Increments the number of unread notifications by one.
   */
  plusOneUnread: () => void;

  /**
   * Sets the open state of the notification panel.
   *
   * @param isOpen - The new open state of the notification panel.
   */
  setIsOpen: (isOpen: boolean) => void;
};

/**
 * Zustand store for managing notification state.
 */
const useNotificationStore = create<Store>()((set) => ({
  unread: 0,
  isOpen: false,

  /**
   * Sets the number of unread notifications.
   *
   * @param unread - The new number of unread notifications.
   */
  setUnread: (unread) => set((state) => ({ ...state, unread })),

  /**
   * Increments the number of unread notifications by one.
   */
  plusOneUnread: () => set((state) => ({ ...state, unread: state.unread + 1 })),

  /**
   * Sets the open state of the notification panel.
   *
   * @param isOpen - The new open state of the notification panel.
   * If the panel is closed, the number of unread notifications is reset to 0.
   */
  setIsOpen: (isOpen) =>
    set((state) => ({
      ...state,
      isOpen,
      unread: !isOpen ? 0 : state.unread,
    })),
}));

export default useNotificationStore;
