import { getProfileAction } from "@/app/actions/profileActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
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
    <div className="w-full lg:w-3/12  rounded-lg lg:bg-card lg:py-14 px-5 flex flex-col items-center lg:gap-12 gap-6">
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
      <div className=" flex flex-col items-start gap-10">
        {profileType === "user" ? null : (
          <Link
            href={`${session?.user?.type}/stats`}
            className="flex items-center justify-center gap-5 opacity-75 hover:opacity-100 duration-200"
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
          <div className="text-center text-lg flex items-center gap-5">
            <MailIcon className="size-5" />
            <p>{profileData?.email}</p>
          </div>
        ) : null}
      </div>
      {isSelfProfile ? (
        <Link
          href={`${session?.user?.type}/profile/edit`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-11/12 text-lg font-bold"
          )}
        >
          Edit Profile
        </Link>
      ) : null}
      {profileType === "podcaster" && "youtube_account" in profileData ? (
        <div className="grid grid-cols-4 justify-items-center w-9/12">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                asChild
                className="p-0 hover:bg-transparent"
                variant="ghost"
                size={"icon"}
                disabled={!profileData?.youtube_account}
              >
                <YoutubeActiveAccountIcon
                  className={cn("", {
                    "opacity-75": !profileData?.youtube_account,
                  })}
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-fit border-card-foreground/10 text-xs p-2 opacity-60"
              side="top"
            >
              {profileData?.youtube_account ? "Activated" : "Not Activated yet"}
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                asChild
                className="p-0 hover:bg-transparent"
                variant="ghost"
                size={"icon"}
                disabled={!profileData?.spotify_account}
              >
                <SpotifyActiveAccountIcon
                  className={cn("", {
                    "opacity-75": !profileData?.spotify_account,
                  })}
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-fit border-card-foreground/10 text-xs p-2 opacity-60"
              side="top"
            >
              {profileData?.spotify_account ? "Activated" : "Not Activated yet"}
            </HoverCardContent>
          </HoverCard>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileCard;
