import { User } from "@/types/profile";
import { create } from "zustand";

/**
 * Type definition for the store's state and actions.
 */
type Store = {
  /**
   * The current user's access token.
   */
  accessToken: string;

  /**
   * The current user's profile information.
   */
  user: User | undefined;

  /**
   * The number of active notifications for the current user.
   */
  UserActiveNotification: number | null;

  /**
   * Sets the current user's access token.
   *
   * @param accessToken - The new access token.
   */
  setAccessToken: (accessToken: string) => void;

  /**
   * Sets the current user's profile information.
   *
   * @param user - The new user profile information.
   */
  setUser: (user: User | undefined) => void;

  /**
   * Sets the number of active notifications for the current user.
   *
   * @param UserActiveNotification - The new number of active notifications.
   */
  setUserActiveNotification: (UserActiveNotification: number | null) => void;
};

/**
 * Zustand store for managing the current user's state.
 */
const useCurrentUser = create<Store>()((set) => ({
  accessToken: "",
  user: undefined,
  UserActiveNotification: 0,

  /**
   * Sets the current user's access token.
   *
   * @param accessToken - The new access token.
   */
  setAccessToken: (accessToken) => set((state) => ({ ...state, accessToken })),

  /**
   * Sets the current user's profile information.
   *
   * @param user - The new user profile information.
   */
  setUser: (user) => set((state) => ({ ...state, user })),

  /**
   * Sets the number of active notifications for the current user.
   *
   * @param UserActiveNotification - The new number of active notifications.
   */
  setUserActiveNotification: (UserActiveNotification) =>
    set((state) => ({ ...state, UserActiveNotification })),
}));

export default useCurrentUser;
