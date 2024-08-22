"use client";

import { useState } from "react";
import CreatePodcastForm from "./_components/create-podcast-form";
import InfiniteScrollDrafts from "./_components/infinite-scroll-drafts";

interface NewPublishProps {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * NewPublish component that renders the podcast creation form and drafts section.
 *
 * @param {NewPublishProps} props - The properties passed to the component.
 * @returns {JSX.Element} The Add Podcast component.
 *
 * @example
 * ```tsx
 * <NewPublish searchParams={{ request_id: "123", podcast_id: "456" }} />
 * ```
 */
export default function NewPublish({ params, searchParams }: NewPublishProps) {
  // Initialize the state to show or hide drafts
  const [isShow, setIsShow] = useState(false);

  // Destructure search parameters
  const { request_id, podcast_id } = searchParams;

  return (
    <div className="flex relative  min-h-[calc(100vh-112px)]">
      {/* InfiniteScrollDrafts component for displaying the list of drafts */}
      <InfiniteScrollDrafts isShow={isShow} setIsShow={setIsShow} />
      {/* CreatePodcastForm component for creating a new podcast */}
      <CreatePodcastForm
        isShow={isShow}
        setIsShow={setIsShow}
        showId={params.showId}
      />
    </div>
  );
}
