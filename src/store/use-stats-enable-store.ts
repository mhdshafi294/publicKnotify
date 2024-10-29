import { EnabledStatistics } from "@/types/statistics";
import { create } from "zustand";

type StatisticsType =
  | "playlist_statistics"
  | "top_episodes"
  | "youtube_channel"
  | "most_popular"
  | "time"
  | "platform"
  | "country";

type Store = {
  enabled: EnabledStatistics | null;

  /**
   * Sets the entire enabled statistics object in the store.
   * @param {EnabledStatistics} enabled - The statistics object to set as enabled.
   */
  setEnabled: (enabled: EnabledStatistics) => void;

  /**
   * Toggles the enabled state of a specific statistics type.
   * @param {StatisticsType} statisticsType - The statistics type to update in the enabled state.
   */
  toggleSpecificEnabled: (statisticsType: StatisticsType) => void;
};

/**
 * useEnableStatsStore Hook
 * Zustand store to manage enabled statistics states for various statistics types.
 * Allows setting the entire enabled object and toggling individual statistics types.
 *
 * @example
 * const { enabled, setEnabled, updateEnabled } = useEnableStatsStore();
 */
const useEnableStatsStore = create<Store>()((set) => ({
  enabled: null,

  setEnabled: (enabled: EnabledStatistics) => {
    set({ enabled });
  },

  toggleSpecificEnabled: (statisticsType: StatisticsType) => {
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
