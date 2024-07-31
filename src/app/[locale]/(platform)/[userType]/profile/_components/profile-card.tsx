import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { MailIcon, PhoneIcon, PieChart } from "lucide-react";
import { Session } from "next-auth";
import ProfileCategories from "./profile-categories";
import ProfileCardImageAndName from "./profile-card-image-and-name";
import ProfilePriceSwitcher from "./profile-price-switcher";
import YoutubeActiveAccountIcon from "@/components/icons/youtube-active-account-icon";
import SpotifyActiveAccountIcon from "@/components/icons/spotify-active-account-icon";
import { User } from "@/types/profile";
import { PodcasterDetails } from "@/types/podcaster";
import { Company } from "@/types/company";
import { authYoutubeAction } from "@/app/actions/podcastActions";
import AuthYoutubeButton from "./auth-youtube-button";
import AuthSpotifyButton from "./auth-spotify-button";

const ProfileCard = async ({
  profileData,
  session,
  profileType,
  isSelfProfile,
}: {
  profileData: User | PodcasterDetails | Company;
  session: Session | null;
  profileType: string;
  isSelfProfile: boolean;
}) => {
  // console.log(profileData);

  return (
    <div className="w-full lg:w-3/12  rounded-lg lg:bg-card lg:py-14 px-5 lg:px-10 flex flex-col items-center lg:gap-12 gap-6">
      <div className="w-full flex flex-col items-center gap-3">
        <ProfileCardImageAndName
          name={profileData?.full_name}
          image={profileData?.image}
        />
        {"categories" in profileData ? (
          <ProfileCategories categories={profileData?.categories!} />
        ) : null}
        {(profileType === "podcaster" &&
          "price" in profileData &&
          profileData?.price &&
          session?.user?.type === "company") ||
        (isSelfProfile && profileType === "podcaster") ? (
          <ProfilePriceSwitcher
            profileData={profileData as User | PodcasterDetails}
            session={session}
            is_enabled_price={
              "is_enabled_price" in profileData
                ? profileData?.is_enabled_price!
                : false
            }
            profileType={profileType}
            isSelfProfile={isSelfProfile}
          />
        ) : null}
      </div>
      <div className=" flex flex-col items-start justify-center w-full gap-10">
        {profileType === "user" ? null : (
          <Link
            href={`${session?.user?.type}/stats`}
            className="flex w-full items-center justify-center gap-5 opacity-75 hover:opacity-100 duration-200"
          >
            <PieChart className="size-5 " strokeWidth={3} />
            <p className="text-lg font-medium">Statistic</p>
          </Link>
        )}
        {((profileType === "user" && session?.user?.id === profileData?.id) ||
          profileType === "company") &&
        profileData?.phone ? (
          <div className="text-center text-lg flex items-center gap-5">
            <PhoneIcon className="size-5" />
            <p>{profileData?.phone}</p>
          </div>
        ) : null}
        {profileData?.email &&
        (profileType === "user" || profileType === "company") ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="text-center w-full text-lg flex items-center gap-5 ">
                <MailIcon className="size-5 shrink-0" />
                <p className="text-wrap line-clamp-1">{profileData?.email}</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-fit border-card-foreground/10 text-sm p-2 opacity-60"
              side="top"
            >
              {profileData?.email}
            </HoverCardContent>
          </HoverCard>
        ) : null}
      </div>
      {isSelfProfile ? (
        <Link
          href={`/${session?.user?.type}/profile/edit`}
          className={cn(
            buttonVariants({ variant: "default" }),
            " w-full text-lg font-bold"
          )}
        >
          Edit Profile
        </Link>
      ) : null}
      {profileType === "podcaster" && "youtube_account" in profileData ? (
        <div className="grid grid-cols-4 justify-items-center w-full">
          <AuthYoutubeButton youtube_account={profileData?.youtube_account} />
          <AuthSpotifyButton spotify_account={profileData?.spotify_account} />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileCard;
