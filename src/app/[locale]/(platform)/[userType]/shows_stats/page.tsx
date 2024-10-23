import { getPlayListsByPodcasterAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import React from "react";

const ShowsStatsPage = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);

  if (!session || session.expires || session.user.type !== "company") {
    redirect(`/${session?.user?.type}`);
  }

  const podcaster_id =
    typeof searchParams.podcaster_id === "string" ? searchParams.search : "1";
  const show_id =
    typeof searchParams.show_id === "string" ? searchParams.show_id : undefined;

  const initial_podcaster_playlist_response =
    await getPlayListsByPodcasterAction({
      podcasterId: podcaster_id as string,
      type: session?.user?.type!,
    });

  return (
    <div>
      ShowsStatsPage
      <div>
        {initial_podcaster_playlist_response?.playlists?.map((playlist) => (
          <div key={playlist.id}>{playlist.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ShowsStatsPage;
