"use client";

import React, { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSelfStoriesAction } from "@/app/actions/storyActions";
import AddStoryMediaDialog from "./add-story-media-dialog";
import AddStoryTextDialog from "./add-story-text-dialog";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStoriesResponse, SelfStory } from "@/types/stories";
import StoriesViewerDialog from "./stories-Viewer-dialog";

const SelfStoriesDialogsContainer = () => {
  const { isStoryReviewDialogOpen, setIsStoryReviewDialogOpen } =
    useAddStoryDialogsStore();

  const { data } = useQuery<SelfStoriesResponse>({
    queryKey: ["self_stories"],
    queryFn: () =>
      getSelfStoriesAction({
        type: "podcaster",
      }),
  });

  const handleFinishStories = () => {
    setIsStoryReviewDialogOpen(false);
  };

  // Create a storyGroup object that matches the expected structure
  const storyGroup = data?.stories
    ? {
        podcaster: {
          id: 0, // Assuming the podcaster's own ID is 0 for self-stories
          name: "You", // Or any other appropriate name for self-stories
          image: data.stories[0]?.image || "/placeholder.svg", // Use the first story's image or a placeholder
        },
        stories: data.stories,
      }
    : null;

  return (
    <Fragment>
      <AddStoryMediaDialog />
      <AddStoryTextDialog />
      {isStoryReviewDialogOpen && storyGroup && (
        <StoriesViewerDialog
          storyGroup={storyGroup}
          allStories={[storyGroup]}
          currentIndex={0}
          onIndexChange={() => {}}
          onFinish={handleFinishStories}
        />
      )}
    </Fragment>
  );
};

export default SelfStoriesDialogsContainer;
