import React from "react";

import ShowPopover from "./show-popover";
import { Playlist } from "@/types/podcast";

/**
 * The PodcasterShow component is responsible for rendering the ShowPopover component
 * with the provided playlists.
 *
 * @param {Object} props - Component props.
 * @param {Playlist[]} props.playlists - The list of playlists to pass to the ShowPopover component.
 *
 * @returns {JSX.Element} The rendered PodcasterShow component.
 */
const PodcasterShow = async ({
  playlists,
}: {
  playlists: Playlist[];
}): Promise<JSX.Element> => {
  return <ShowPopover playlists={playlists} />;
};

export default PodcasterShow;
