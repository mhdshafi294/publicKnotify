import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";

/**
 * Custom storage wrapper to ensure compatibility with Zustand's persist middleware.
 */
const localStorageWrapper: PersistStorage<Store> = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

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
   * Indicates whether notifications are enabled.
   */
  isEnabled: boolean;

  /**
   * Sets whether notifications are enabled.
   *
   * @param isEnabled - The new state of notification enabling.
   */
  setIsEnabled: (isEnabled: boolean) => void;

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
   * If the panel is closed, the number of unread notifications is reset to 0.
   */
  setIsOpen: (isOpen: boolean) => void;
};

/**
 * Zustand store for managing notification state with persistence in local storage.
 */
const useNotificationStore = create<Store>()(
  persist(
    (set) => ({
      unread: 0,
      isOpen: false,
      isEnabled: false,

      /**
       * Sets whether notifications are enabled.
       *
       * @param isEnabled - The new state of notification enabling.
       */
      setIsEnabled: (isEnabled) => set((state) => ({ ...state, isEnabled })),

      /**
       * Sets the number of unread notifications.
       *
       * @param unread - The new number of unread notifications.
       */
      setUnread: (unread) => set((state) => ({ ...state, unread })),

      /**
       * Increments the number of unread notifications by one.
       */
      plusOneUnread: () =>
        set((state) => ({ ...state, unread: state.unread + 1 })),

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
    }),
    {
      name: "notification-store", // Unique name for local storage key
      storage: localStorageWrapper, // Custom localStorage wrapper
    }
  )
);

export default useNotificationStore;
