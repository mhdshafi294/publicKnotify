import { getSelfStoriesAction } from "@/app/actions/storiesActions";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStoriesResponse, Story } from "@/types/stories";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useProfileStories = (
  isSelfProfile: boolean,
  initialStories?: Story[]
) => {
  const { setIsStoryReviewDialogOpen } = useAddStoryDialogsStore();
  const [stories, setStories] = useState<Story[] | undefined>(initialStories);
  const [firstUnreadIndex, setFirstUnreadIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: selfStoriesData } = useQuery<SelfStoriesResponse>({
    queryKey: ["self_stories", session?.user?.id],
    queryFn: () => getSelfStoriesAction({ type: session?.user?.type! }),
    enabled: session?.user?.type === "podcaster" && isSelfProfile,
  });

  const storyGroup = selfStoriesData?.stories
    ? {
        podcaster: {
          id: 0,
          name: "You",
          image: session?.user?.image || "/podcaster-filler.webp",
        },
        stories: selfStoriesData.stories,
      }
    : stories
    ? {
        podcaster: {
          id: 0,
          name: "You",
          image: session?.user?.image || "/podcaster-filler.webp",
        },
        stories: stories,
      }
    : null;

  useEffect(() => {
    if (stories && "is_viewd" in stories[0]) {
      const unreadIndex = stories?.findIndex((story) => !story.is_viewd);
      setFirstUnreadIndex(!unreadIndex || unreadIndex === -1 ? 0 : unreadIndex);
    }
  }, [stories]);

  const handleOpenStories = () => {
    if (
      (stories && stories?.length > 0) ||
      (storyGroup && storyGroup?.stories?.length > 0)
    ) {
      setIsDialogOpen(true);
      setIsStoryReviewDialogOpen(true);
    }
  };

  const handleCloseStories = () => {
    setIsDialogOpen(false);
    setIsStoryReviewDialogOpen(false);
  };

  return {
    stories,
    setStories,
    firstUnreadIndex,
    isDialogOpen,
    storyGroup,
    handleOpenStories,
    handleCloseStories,
  };
};
