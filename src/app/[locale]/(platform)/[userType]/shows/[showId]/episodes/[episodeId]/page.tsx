
import EpisodePageContent from "./_components/episode_page_content";
const EpisodeDetailsPage = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string, episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  
  return (
    <EpisodePageContent {...{ params, searchParams }} />
  );
};

export default EpisodeDetailsPage;
