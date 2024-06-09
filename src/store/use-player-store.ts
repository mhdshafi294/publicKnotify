import { create } from "zustand";

type Store = {
  podcastId: number | null;
  setPodcastId: (podcastId: number | null) => void;

  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  toggleRunning: () => void;
};

const usePlayerStore = create<Store>()((set) => ({
  podcastId: null,
  isRunning: false,

  setPodcastId: (podcastId) => set((state) => ({ ...state, podcastId })),
  setIsRunning: (isRunning) => set((state) => ({ ...state, isRunning })),
  toggleRunning: () =>
    set((state) => ({ ...state, isRunning: !state.isRunning })),
}));

export default usePlayerStore;
