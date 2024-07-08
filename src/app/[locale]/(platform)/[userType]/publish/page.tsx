"use client";

import { useTranslations } from "next-intl";
import CreatePodcastForm from "./_components/create-podcast-form";
import InfiniteScrollDrafts from "./_components/infinite-scroll-drafts";
import { useState } from "react";

export default function NewPublish({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = useTranslations("Index");
  const [isShow, setIsShow] = useState(false);

  const request_id = searchParams.request_id;
  const podcast_id = searchParams.podcast_id;

  return (
    <div className="flex relative mt-10">
      <InfiniteScrollDrafts isShow={isShow} setIsShow={setIsShow} />
      <CreatePodcastForm setIsShow={setIsShow} />
    </div>
  );
}
