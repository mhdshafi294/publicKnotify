import { create } from "zustand";

type Store = {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

const usePricingsStore = create<Store>()((set) => ({
  editMode: false,
  setEditMode: (editMode) => set((state) => ({ ...state, editMode })),
}));

export default usePricingsStore;
