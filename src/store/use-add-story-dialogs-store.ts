import { create } from "zustand";

type Store = {
  isStoryMediaDialogOpen: boolean;
  isStoryTextDialogOpen: boolean;
  isStoryReviewDialogOpen: boolean;

  setStoryMediaDialogIsOpen: (editMode: boolean) => void;
  setStoryTextDialogIsOpen: (editMode: boolean) => void;
  setIsStoryReviewDialogOpen: (editMode: boolean) => void;
};

const useAddStoryDialogsStore = create<Store>()((set) => ({
  isStoryMediaDialogOpen: false,
  isStoryTextDialogOpen: false,
  isStoryReviewDialogOpen: false,

  setStoryMediaDialogIsOpen: (isStoryMediaDialogOpen) =>
    set((state) => ({ ...state, isStoryMediaDialogOpen })),
  setStoryTextDialogIsOpen: (isStoryTextDialogOpen) =>
    set((state) => ({ ...state, isStoryTextDialogOpen })),
  setIsStoryReviewDialogOpen: (isStoryReviewDialogOpen) =>
    set((state) => ({ ...state, isStoryReviewDialogOpen })),
}));

export default useAddStoryDialogsStore;
