import { useTranslations } from "next-intl";
import CreatePodcastForm from "./_components/createPodcastForm";
import InfiniteScrollDrafts from "./_components/infinite-scroll-drafts";

export default function NewPublish({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = useTranslations("Index");

  const request_id = searchParams.request_id;
  const podcast_id = searchParams.podcast_id;

  return (
    <div className="flex relative mt-10">
      <InfiniteScrollDrafts />
      <CreatePodcastForm />
    </div>
  );
}
