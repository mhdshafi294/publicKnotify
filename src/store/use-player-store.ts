import { create } from "zustand";

type Store = {
  podcastId: number | null;
  setPodcastId: (podcastId: number | null) => void;

  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;

  duration: number;
  setDuration: (duration: number) => void;

  currentTime: number;
  setCurrentTime: (currentTime: number) => void;

  toggleRunning: () => void;
};

const usePlayerStore = create<Store>()((set) => ({
  podcastId: null,
  isRunning: false,

  setPodcastId: (podcastId) => set((state) => ({ ...state, podcastId })),
  setIsRunning: (isRunning) => set((state) => ({ ...state, isRunning })),

  duration: 0,
  setDuration: (duration) => set((state) => ({ ...state, duration })),

  currentTime: 0,
  setCurrentTime: (currentTime) => {
    set((state) => ({ ...state, currentTime }));
  },

  toggleRunning: () =>
    set((state) => ({ ...state, isRunning: !state.isRunning })),
}));

export default usePlayerStore;
