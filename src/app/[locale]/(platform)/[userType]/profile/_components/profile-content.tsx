import {
  getPlayListsAction,
  getPlayListsByPodcasterAction,
  getPodcastsByCompanyAction,
  getPodcastsByPodcasterAction,
  getSelfPlaybackAction,
  getSelfPodcastsAction,
} from "@/app/actions/podcastActions";
import InfiniteScrollPodcasts from "@/components/infinite-scroll-podcasts";
import InfiniteScrollSelfPlaylists from "@/app/[locale]/(platform)/[userType]/profile/_components/infinite-scroll-self-playlists";
import InfiniteScrollSelfPodcasts from "@/app/[locale]/(platform)/[userType]/profile/_components/infinite-scroll-self-podcasts";
import Search from "@/components/search";
import { Company } from "@/types/company";
import { Playlist, Podcast, SelfPodcastDetails } from "@/types/podcast";
import { Podcaster, PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";
import { Session } from "next-auth";
import React from "react";
import InfiniteScrollPlaylists from "@/components/infinite-scroll-playlists";
import { getCompanySelfPodcastsAction } from "@/app/actions/requestsActions";
import {
  getCompanySelfPodcastersAction,
  getPodcastersByCompanyAction,
} from "@/app/actions/podcasterActions";
import InfiniteScrollCompanySelfPodcasters from "./infinite-scroll-company-self-podcasters";
import InfiniteScrollPodcastersByCompany from "./infinite-scroll-podcasters-by-company";

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

  let contentData1: Playlist[] | Podcaster[] | undefined;
  let contentData2: SelfPodcastDetails[] | Podcast[] | undefined;

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
    } else if (profileType === "company") {
      const data1Response = await getCompanySelfPodcastersAction({
        type: "company",
        search,
      });
      contentData1 = data1Response.podcasters;
      const data2Response = await getCompanySelfPodcastsAction({
        type: "company",
      });
      contentData2 = data2Response.podcasts;
    } else if (profileType === "user") {
      const data2Response = await getSelfPlaybackAction({
        type: session?.user?.type!,
      });
      contentData2 = data2Response.podcasts;
    }
  } else {
    if (profileType === "podcaster") {
      const data1Response = await getPlayListsByPodcasterAction({
        podcasterId: params.profileId,
        type: session?.user?.type!,
        search,
      });
      contentData1 = data1Response.playlists;
      const data2Response = await getPodcastsByPodcasterAction({
        podcasterId: params.profileId,
        type: session?.user?.type!,
      });
      contentData2 = data2Response.podcasts;
    } else if (profileType === "company") {
      const data1Response = await getPodcastersByCompanyAction({
        companyId: params.profileId,
        type: session?.user?.type!,
        search,
      });
      contentData1 = data1Response.podcasters;
      //TODO: get podcasts by company, collection needed to be modified
      const data2Response = await getPodcastsByCompanyAction({
        companyId: params.profileId,
        type: session?.user?.type!,
      });
      contentData2 = data2Response.collection as Podcast[];
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
              initialData={contentData2 as SelfPodcastDetails[] | undefined}
              search={search}
              type={profileType}
            />
          </div>
        ) : profileType === "company" ? (
          <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
            <InfiniteScrollCompanySelfPodcasters
              initialData={contentData1 as Podcaster[] | undefined}
              type={session?.user?.type!}
            />
            <InfiniteScrollPodcasts
              initialData={contentData2 as Podcast[] | undefined}
              type={session?.user?.type!}
              podcasterId={params.profileId}
            />
          </div>
        ) : profileType === "user" ? (
          <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
            <InfiniteScrollPodcasts
              initialData={contentData2 as Podcast[] | undefined}
              type={session?.user?.type!}
              podcasterId={params.profileId}
            />
          </div>
        ) : null
      ) : profileType === "podcaster" ? (
        <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
          <InfiniteScrollPlaylists
            podcasterId={params.profileId}
            initialData={contentData1 as Playlist[] | undefined}
            search={search}
            type={session?.user?.type!}
          />
          <InfiniteScrollPodcasts
            initialData={contentData2 as Podcast[] | undefined}
            type={session?.user?.type!}
            podcasterId={params.profileId}
          />
        </div>
      ) : profileType === "company" ? (
        <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
          <InfiniteScrollPodcastersByCompany
            companyId={params.profileId}
            initialData={contentData1 as Podcaster[] | undefined}
            type={session?.user?.type!}
          />
          <InfiniteScrollPodcasts
            initialData={contentData2 as Podcast[] | undefined}
            type={session?.user?.type!}
            podcasterId={params.profileId}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileContent;
