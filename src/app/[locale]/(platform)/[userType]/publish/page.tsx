import { useTranslations } from "next-intl";
import CreatePodcastForm from "./_components/create-podcast-form";
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
      <div className="w-[20dvw] rounded-tr-3xl absolute bottom-0 start-0 h-full bg-card/50 border border-card-foreground/10 pt-10 hidden lg:block">
        <InfiniteScrollDrafts />
      </div>
      <CreatePodcastForm />
    </div>
  );
}
