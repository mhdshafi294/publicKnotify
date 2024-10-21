"use client";

import React, { Fragment, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSelfStoriesAction } from "@/app/actions/storiesActions";
import AddStoryMediaDialog from "./add-story-media-dialog";
import AddStoryTextDialog from "./add-story-text-dialog";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStoriesResponse } from "@/types/stories";
import StoriesViewerDialog from "./stories-Viewer-dialog";
import { useSession } from "next-auth/react";

const SelfStoriesDialogsContainer = () => {
  const { isStoryReviewDialogOpen, setIsStoryReviewDialogOpen } =
    useAddStoryDialogsStore();

  const { data: session } = useSession();

  const { data } = useQuery<SelfStoriesResponse>({
    queryKey: ["self_stories", session?.user?.id],
    queryFn: () =>
      getSelfStoriesAction({
        type: session?.user?.type!,
      }),
    enabled: !!session?.user?.type,
    // refetchInterval: 30000, // 30 seconds
  });

  const queryClient = useQueryClient();

  // Invalidate the query when `isStoryReviewDialogOpen` changes
  useEffect(() => {
    if (isStoryReviewDialogOpen) {
      queryClient.invalidateQueries({
        queryKey: ["self_stories", session?.user?.id], // Pass the queryKey correctly in an object
      });
    }
  }, [isStoryReviewDialogOpen, queryClient, session?.user?.id]);

  const handleFinishStories = () => {
    setIsStoryReviewDialogOpen(false);
  };

  // Create a storyGroup object that matches the expected structure
  const storyGroup = data?.stories
    ? {
        podcaster: {
          id: 0, // Assuming the podcaster's own ID is 0 for self-stories
          name: "You", // Or any other appropriate name for self-stories
          image: session?.user?.image || "/podcaster-filler.webp", // Use the first story's image or a placeholder
        },
        stories: data.stories,
      }
    : null;

  return (
    <Fragment>
      <AddStoryMediaDialog />
      <AddStoryTextDialog />
      {storyGroup ? (
        <StoriesViewerDialog
          storyGroup={storyGroup}
          allStories={[storyGroup]}
          currentIndex={0}
          initialStoryIndex={0}
          onIndexChange={() => {}}
          onFinish={handleFinishStories}
        />
      ) : null}
    </Fragment>
  );
};

export default SelfStoriesDialogsContainer;
