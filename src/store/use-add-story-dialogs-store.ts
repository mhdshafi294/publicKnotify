import { create } from "zustand";

type Store = {
  isStoryMediaDialogOpen: boolean;
  isStoryTextDialogOpen: boolean;

  setStoryMediaDialogIsOpen: (editMode: boolean) => void;
  setStoryTextDialogIsOpen: (editMode: boolean) => void;
};

const useAddStoryDialogsStore = create<Store>()((set) => ({
  isStoryMediaDialogOpen: false,
  isStoryTextDialogOpen: false,

  setStoryMediaDialogIsOpen: (isStoryMediaDialogOpen) =>
    set((state) => ({ ...state, isStoryMediaDialogOpen })),
  setStoryTextDialogIsOpen: (isStoryTextDialogOpen) =>
    set((state) => ({ ...state, isStoryTextDialogOpen })),
}));

export default useAddStoryDialogsStore;
