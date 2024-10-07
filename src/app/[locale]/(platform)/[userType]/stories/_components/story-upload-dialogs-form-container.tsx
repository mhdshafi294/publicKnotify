import React, { Dispatch, Fragment, SetStateAction } from "react";
import AddStoryMediaDialog from "./add-story-media-dialog";
import AddStoryTextDialog from "./add-story-text-dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AddStorySchema } from "@/schema/addStorySchema";
import { zodResolver } from "@hookform/resolvers/zod";

const StoryUploadDialogsFormContainer = () => {
  return (
    <Fragment>
      <AddStoryMediaDialog />
      <AddStoryTextDialog />
    </Fragment>
  );
};

export default StoryUploadDialogsFormContainer;
