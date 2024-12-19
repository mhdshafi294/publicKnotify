"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect } from "react";

import { getSelfStoriesAction } from "@/app/actions/storiesActions";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStoriesResponse } from "@/types/stories";
import AddStoryMediaDialog from "./add-story-media-dialog";
import AddStoryTextDialog from "./add-story-text-dialog";
import StoriesPlayerDialog from "./stories-player-dialog";

/**
 * SelfStoriesDialogsContainer Component
 * Renders the necessary dialogs and controls to manage user's self-stories.
 * It fetches the user's stories using `react-query`, tracks dialog states, and
 * passes the story data to `StoriesPlayerDialog` for display.
 *
 * @component
 */
const SelfStoriesDialogsContainer: React.FC = () => {
  // Extract dialog state and toggle function from the store
  const { isStoryReviewDialogOpen, setIsStoryReviewDialogOpen } =
    useAddStoryDialogsStore();

  // Fetch session data for the current user
  const { data: session } = useSession();

  // Fetch self-stories data for the user, refetched every 30 seconds if uncommented
  const { data } = useQuery<SelfStoriesResponse>({
    queryKey: ["self_stories", session?.user?.id],
    queryFn: () =>
      getSelfStoriesAction({
        type: session?.user?.type!,
      }),
    enabled: !!session?.user?.type,
    // refetchInterval: 30000, // 30 seconds
  });

  // Initialize react-query client
  const queryClient = useQueryClient();

  /**
   * Effect hook to invalidate stories query when `isStoryReviewDialogOpen` changes,
   * ensuring fresh data is fetched.
   */
  useEffect(() => {
    if (isStoryReviewDialogOpen) {
      queryClient.invalidateQueries({
        queryKey: ["self_stories", session?.user?.id],
      });
    }
  }, [isStoryReviewDialogOpen, queryClient, session?.user?.id]);

  /**
   * Closes the story review dialog upon completion.
   */
  const handleFinishStories = () => {
    setIsStoryReviewDialogOpen(false);
  };

  /**
   * Constructs a storyGroup object based on the user's self-stories.
   * This structure is required by `StoriesPlayerDialog`.
   */
  const storyGroup = data?.stories
    ? {
        podcaster: {
          id: 0, // Self-stories identifier
          name: "You", // Placeholder name for user's own stories
          image: session?.user?.image || "/podcaster-filler.webp", // User's image or a default
        },
        stories: data.stories,
      }
    : null;

  return (
    <Fragment>
      <AddStoryMediaDialog />
      <AddStoryTextDialog />
      {storyGroup ? (
        <StoriesPlayerDialog
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
