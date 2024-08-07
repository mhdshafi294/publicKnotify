import { create } from "zustand";

/**
 * Type definition for the store's state and actions.
 */
type Store = {
  /**
   * The ID of the currently playing podcast.
   */
  podcastId: number | null;

  /**
   * Sets the ID of the currently playing podcast.
   *
   * @param podcastId - The new podcast ID.
   */
  setPodcastId: (podcastId: number | null) => void;

  /**
   * Indicates whether the podcast player is currently running.
   */
  isRunning: boolean;

  /**
   * Sets the running state of the podcast player.
   *
   * @param isRunning - The new running state.
   */
  setIsRunning: (isRunning: boolean) => void;

  /**
   * The duration of the current podcast in seconds.
   */
  duration: number;

  /**
   * Sets the duration of the current podcast.
   *
   * @param duration - The new duration in seconds.
   */
  setDuration: (duration: number) => void;

  /**
   * The current playback time of the podcast in seconds.
   */
  currentTime: number;

  /**
   * Sets the current playback time of the podcast.
   *
   * @param currentTime - The new playback time in seconds.
   */
  setCurrentTime: (currentTime: number) => void;

  /**
   * Toggles the running state of the podcast player.
   */
  toggleRunning: () => void;
};

/**
 * Zustand store for managing the podcast player's state.
 */
const usePlayerStore = create<Store>()((set) => ({
  podcastId: null,
  isRunning: false,
  duration: 0,
  currentTime: 0,

  /**
   * Sets the ID of the currently playing podcast.
   *
   * @param podcastId - The new podcast ID.
   */
  setPodcastId: (podcastId) => set((state) => ({ ...state, podcastId })),

  /**
   * Sets the running state of the podcast player.
   *
   * @param isRunning - The new running state.
   */
  setIsRunning: (isRunning) => set((state) => ({ ...state, isRunning })),

  /**
   * Sets the duration of the current podcast.
   *
   * @param duration - The new duration in seconds.
   */
  setDuration: (duration) => set((state) => ({ ...state, duration })),

  /**
   * Sets the current playback time of the podcast.
   *
   * @param currentTime - The new playback time in seconds.
   */
  setCurrentTime: (currentTime) => set((state) => ({ ...state, currentTime })),

  /**
   * Toggles the running state of the podcast player.
   */
  toggleRunning: () =>
    set((state) => ({ ...state, isRunning: !state.isRunning })),
}));

export default usePlayerStore;
