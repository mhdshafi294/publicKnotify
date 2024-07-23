import { getSelfPodcastsAction } from "@/app/actions/podcastActions";
import Search from "@/components/search";
import { Company } from "@/types/company";
import { SelfPodcastDetails } from "@/types/podcast";
import { PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";
import { Session } from "next-auth";
import React from "react";
import InfiniteScrollSelfPodcasts from "./infinite-scroll-self-podcasts";

const ProfileContent = async ({
  profileData,
  session,
  profileType,
  isSelfProfile,
  searchParams,
}: {
  profileData: User | PodcasterDetails | Company;
  session: Session | null;
  profileType: string;
  isSelfProfile: boolean;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  let contentData: SelfPodcastDetails[] | undefined;

  if (isSelfProfile) {
    if (profileType === "podcaster") {
      const dataResponse = await getSelfPodcastsAction({
        type: "podcaster",
        search,
        is_published: true,
      });
      contentData = dataResponse.podcasts;
    }
  }

  return (
    <div className="w-full lg:w-8/12">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <h2>Podcasts</h2>
          {/* <Search searchText={search} searchFor="podcasts" /> */}
        </div>
        <InfiniteScrollSelfPodcasts
          initialData={contentData}
          search={search}
          type={profileType}
        />
      </div>
    </div>
  );
};

export default ProfileContent;
