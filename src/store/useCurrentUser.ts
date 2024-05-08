import { User } from "@/types/profile";
import { create } from "zustand";

type Store = {
  accessToken: string;
  user: User | undefined;
  UserActiveNotification: number | null;

  setAccessToken: (accessToken: string) => void;
  setUser: (user: User | undefined) => void;
  setUserActiveNotification: (UserActiveNotification: number | null) => void;
};

const useCurrentUser = create<Store>()((set) => ({
  accessToken: "",
  user: undefined,
  UserActiveNotification: 0,

  setAccessToken: (accessToken) => set((state) => ({ ...state, accessToken })),
  setUser: (user) => set((state) => ({ ...state, user })),
  setUserActiveNotification: (UserActiveNotification) =>
    set((state) => ({ ...state, UserActiveNotification })),
}));

export default useCurrentUser;
