import { FileSymlinkIcon } from "lucide-react";
import { Session } from "next-auth";
import { getTranslations } from "next-intl/server";

import InfiniteScrollSelfPlaylists from "@/app/[locale]/(platform)/[userType]/profile/_components/infinite-scroll-self-playlists";
import InfiniteScrollSelfPodcasts from "@/app/[locale]/(platform)/[userType]/profile/_components/infinite-scroll-self-podcasts";
import {
  getPlayListsAction,
  getPlayListsByPodcasterAction,
  getPodcastsByCompanyAction,
  getPodcastsByPodcasterAction,
  getSelfPlaybackAction,
  getSelfPodcastsAction,
} from "@/app/actions/podcastActions";
import {
  getCompanySelfPodcastersAction,
  getPodcastersByCompanyAction,
} from "@/app/actions/podcasterActions";
import { getCompanySelfPodcastsAction } from "@/app/actions/requestsActions";
import InfiniteScrollPlayback from "@/components/infinite-scroll-playback";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Company } from "@/types/company";
import { Playlist, Podcast, SelfPodcastDetails } from "@/types/podcast";
import { Podcaster, PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";
import InfiniteScrollCompanySelfPodcasters from "./infinite-scroll-company-self-podcasters";
import InfiniteScrollSelfCompanyPodcasts from "./infinite-scroll-company-self-podcasts";
import InfiniteScrollPlaylistsByPodcaster from "./infinite-scroll-playlists-by-podcaster";
import InfiniteScrollPodcastersByCompany from "./infinite-scroll-podcasters-by-company";
import InfiniteScrollPodcastsByCompany from "./infinite-scroll-podcasts-by-company";
import InfiniteScrollPodcastsByPodcaster from "./infinite-scroll-podcasts-by-podcaster";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

/**
 * Component for displaying profile content with infinite scroll functionality.
 * It adjusts the displayed content based on the profile type (e.g., podcaster, company, user)
 * and whether the profile belongs to the current user.
 *
 * @param {object} props - Component props.
 * @param {User | PodcasterDetails | Company} props.profileData - The profile data to display.
 * @param {Session | null} props.session - The current user session.
 * @param {string} props.profileType - The type of the profile ("podcaster", "company", "user").
 * @param {boolean} props.isSelfProfile - Whether the profile is for the current user.
 * @param {object} props.params - URL parameters including profileUserType and profileId.
 * @param {object} props.searchParams - Query parameters for search functionality.
 * @returns {JSX.Element} The rendered component.
 */
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
  const t = await getTranslations("Index");
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  let contentData1: Playlist[] | Podcaster[] | undefined;
  let contentData2: SelfPodcastDetails[] | Podcast[] | undefined;

  // Fetch content based on profile type and whether it is the user's own profile
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
        is_published: 1,
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
      const data2Response = await getPodcastsByCompanyAction({
        companyId: params.profileId,
        type: session?.user?.type!,
      });
      contentData2 = data2Response.podcasts as Podcast[];
    }
  }

  return (
    <div className="w-full lg:w-9/12">
      <div className="w-full flex justify-end min-h-10">
        {/* Display a button for sending a request if the user is a company viewing a podcaster's profile */}
        {profileType === "podcaster" && session?.user?.type === "company" ? (
          <Link
            href={`/${session?.user?.type}/requests/create?podcasterId=${params.profileId}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "mb-7 font-bold px-10 flex justify-center items-center gap-2"
            )}
          >
            <FileSymlinkIcon size={15} strokeWidth={3} />
            <span>{t("sendRequest")}</span>
          </Link>
        ) : null}
      </div>
      {/* Render different content based on profile type and whether it's the user's own profile */}
      {isSelfProfile ? (
        profileType === "podcaster" ? (
          <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
            <MaxWidthContainer className="w-full">
              <InfiniteScrollSelfPlaylists
                initialData={contentData1 as Playlist[] | undefined}
                search={search}
                type={profileType}
              />
            </MaxWidthContainer>
            <MaxWidthContainer className="w-full">
              <InfiniteScrollSelfPodcasts
                initialData={contentData2 as SelfPodcastDetails[] | undefined}
                search={search}
                type={profileType}
              />
            </MaxWidthContainer>
          </div>
        ) : profileType === "company" ? (
          <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
            <MaxWidthContainer className="w-full">
              <InfiniteScrollCompanySelfPodcasters
                initialData={contentData1 as Podcaster[] | undefined}
                type={session?.user?.type!}
              />
            </MaxWidthContainer>
            <MaxWidthContainer className="w-full">
              <InfiniteScrollSelfCompanyPodcasts
                initialData={contentData2 as Podcast[] | undefined}
                type={session?.user?.type!}
                podcasterId={params.profileId}
              />
            </MaxWidthContainer>
          </div>
        ) : profileType === "user" ? (
          <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
            <MaxWidthContainer className="w-full">
              <InfiniteScrollPlayback
                initialData={contentData2 as Podcast[] | undefined}
                type={session?.user?.type!}
                podcasterId={params.profileId}
              />
            </MaxWidthContainer>
          </div>
        ) : null
      ) : profileType === "podcaster" ? (
        <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
          <MaxWidthContainer className="w-full">
            <InfiniteScrollPlaylistsByPodcaster
              podcasterId={params.profileId}
              initialData={contentData1 as Playlist[] | undefined}
              search={search}
              type={session?.user?.type!}
            />
          </MaxWidthContainer>
          <MaxWidthContainer className="w-full">
            <InfiniteScrollPlaylistsByPodcaster
              podcasterId={params.profileId}
              initialData={contentData1 as Playlist[] | undefined}
              search={search}
              type={session?.user?.type!}
            />
          </MaxWidthContainer>
        </div>
      ) : profileType === "company" ? (
        <div className="w-full flex flex-col gap-20 h-[calc(100%-2.5rem)]">
          <MaxWidthContainer className="w-full">
            <InfiniteScrollPodcastersByCompany
              companyId={params.profileId}
              initialData={contentData1 as Podcaster[] | undefined}
              type={session?.user?.type!}
            />
          </MaxWidthContainer>
          <MaxWidthContainer className="w-full">
            <InfiniteScrollPodcastsByCompany
              initialData={contentData2 as Podcast[] | undefined}
              type={session?.user?.type!}
              companyId={params.profileId}
            />
          </MaxWidthContainer>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileContent;
