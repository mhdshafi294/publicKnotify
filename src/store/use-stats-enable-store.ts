import { EnabledStatistics } from "@/types/statistics";
import { create } from "zustand";

type Store = {
  enabled: EnabledStatistics | null;

  setEnabled: (enabled: EnabledStatistics) => void;

  updateEnabled: (
    statisticsType:
      | "playlist_statistics"
      | "top_episodes"
      | "youtube_channel"
      | "most_popular"
      | "time"
      | "platform"
      | "country"
  ) => void;
};

const useEnableStatsStore = create<Store>()((set) => ({
  enabled: null,

  setEnabled: (enabled: EnabledStatistics) => {
    set({ enabled });
  },

  updateEnabled: (
    statisticsType:
      | "playlist_statistics"
      | "top_episodes"
      | "youtube_channel"
      | "most_popular"
      | "time"
      | "platform"
      | "country"
  ) => {
    set((state) => {
      if (state.enabled) {
        return {
          ...state,
          enabled: {
            ...state.enabled,
            [statisticsType]: !state.enabled[statisticsType],
          },
        };
      }
      return state;
    });
  },
}));

export default useEnableStatsStore;
