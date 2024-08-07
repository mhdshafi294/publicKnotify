import { create } from "zustand";

/**
 * Type definition for the store's state and actions.
 */
type Store = {
  /**
   * Indicates whether edit mode is active.
   */
  editMode: boolean;

  /**
   * Action to set the edit mode state.
   *
   * @param editMode - The new state for edit mode.
   */
  setEditMode: (editMode: boolean) => void;
};

/**
 * Zustand store for managing pricing edit mode state.
 */
const usePricingsStore = create<Store>()((set) => ({
  editMode: false,

  /**
   * Action to set the edit mode state.
   *
   * @param editMode - The new state for edit mode.
   */
  setEditMode: (editMode) => set((state) => ({ ...state, editMode })),
}));

export default usePricingsStore;
