import { getPlayListsAction } from "@/app/actions/podcastActions";
import ShowPopover from "./show-popover";

const PodcasterShow = async () => {
  const data = await getPlayListsAction({ type: "podcaster" });
  return <ShowPopover playlists={data.playlists} />;
};

export default PodcasterShow;
