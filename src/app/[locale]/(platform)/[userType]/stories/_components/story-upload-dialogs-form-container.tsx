import React, { Dispatch, Fragment, SetStateAction } from "react";
import AddStoryMediaDialog from "./add-story-media-dialog";
import AddStoryTextDialog from "./add-story-text-dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AddStorySchema } from "@/schema/addStorySchema";
import { zodResolver } from "@hookform/resolvers/zod";

type StoryUploadDialogsFormContainerProps = {
  isStoryMediaDialogOpen: boolean;
  setStoryMediaDialogIsOpen: Dispatch<SetStateAction<boolean>>;
  isStoryTextDialogOpen: boolean;
  setStoryTextDialogIsOpen: Dispatch<SetStateAction<boolean>>;
};

const StoryUploadDialogsFormContainer: React.FC<
  StoryUploadDialogsFormContainerProps
> = ({
  isStoryMediaDialogOpen,
  setStoryMediaDialogIsOpen,
  isStoryTextDialogOpen,
  setStoryTextDialogIsOpen,
}) => {
  return (
    <Fragment>
      <AddStoryMediaDialog
        isOpen={isStoryMediaDialogOpen}
        onClose={setStoryMediaDialogIsOpen}
      />
      <AddStoryTextDialog
        isOpen={isStoryTextDialogOpen}
        onClose={setStoryTextDialogIsOpen}
      />
    </Fragment>
  );
};

export default StoryUploadDialogsFormContainer;
