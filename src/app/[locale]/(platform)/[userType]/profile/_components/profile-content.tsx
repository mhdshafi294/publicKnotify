import {
  getPlayListsAction,
  getPodcastsByPodcasterAction,
  getSelfPodcastsAction,
} from "@/app/actions/podcastActions";
import InfiniteScrollPodcasts from "@/components/infinite-scroll-podcasts";
import InfiniteScrollSelfPlaylists from "@/app/[locale]/(platform)/[userType]/profile/_components/infinite-scroll-self-playlist";
import InfiniteScrollSelfPodcasts from "@/app/[locale]/(platform)/[userType]/profile/_components/infinite-scroll-self-podcasts";
import Search from "@/components/search";
import { Company } from "@/types/company";
import { Playlist, Podcast, SelfPodcastDetails } from "@/types/podcast";
import { PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";
import { Session } from "next-auth";
import React from "react";

const ProfileContent = async ({
  profileData,
  session,
  profileType,
  isSelfProfile,
  params,
  searchParams,
}: {
  profileData: User | PodcasterDetails | Company;
  session: Session | null;
  profileType: string;
  isSelfProfile: boolean;
  params: { profileUserType: string; profileId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  let contentData1: Playlist[] | Podcast[] | undefined;
  let contentData2: SelfPodcastDetails[] | undefined;

  if (isSelfProfile) {
    if (profileType === "podcaster") {
      const data1Response = await getPlayListsAction({
        type: "podcaster",
        search,
      });
      contentData1 = data1Response.playlists;
      const data2Response = await getSelfPodcastsAction({
        type: "podcaster",
        search,
        is_published: true,
      });
      contentData2 = data2Response.podcasts;
    }
  } else {
    if (profileType === "podcaster") {
      const data1Response = await getPodcastsByPodcasterAction({
        podcasterId: params.profileId,
        type: session?.user?.type!,
      });
      contentData1 = data1Response.podcasts;
      // const data2Response = await getSelfPodcastsAction({
      //   type: "podcaster",
      //   search,
      //   is_published: true,
      // });
      // contentData2 = data2Response.podcasts;
    }
  }

  return (
    <div className="w-full lg:w-8/12">
      <div className="w-full flex justify-between min-h-10">
        {/* <Search searchText={search} searchFor="podcasts" /> */}
      </div>
      {isSelfProfile ? (
        profileType === "podcaster" ? (
          <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
            <InfiniteScrollSelfPlaylists
              initialData={contentData1 as Playlist[] | undefined}
              search={search}
              type={profileType}
            />
            <InfiniteScrollSelfPodcasts
              initialData={contentData2}
              search={search}
              type={profileType}
            />
          </div>
        ) : null
      ) : profileType === "podcaster" ? (
        <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
          <InfiniteScrollPodcasts
            initialData={contentData1 as Podcast[] | undefined}
            type={profileType}
            podcasterId={params.profileId}
          />
          {/* <InfiniteScrollSelfPodcasts
            initialData={contentData2}
            search={search}
            type={profileType}
          /> */}
        </div>
      ) : null}
    </div>
  );
};

export default ProfileContent;
