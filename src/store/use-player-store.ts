import { create } from "zustand";

type Store = {
  podcastId: number | null;
  setPodcastId: (podcastId: number | null) => void;
};

const usePlayerStore = create<Store>()((set) => ({
  podcastId: null,

  setPodcastId: (podcastId) => set((state) => ({ ...state, podcastId })),
}));

export default usePlayerStore;
