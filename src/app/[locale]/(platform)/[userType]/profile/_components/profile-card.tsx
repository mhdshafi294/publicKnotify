// Standard libraries
import { Session } from "next-auth";

// Third-party libraries
import { MailIcon, PhoneIcon, PieChart } from "lucide-react";
import { getTranslations } from "next-intl/server";

// Local components and utilities
import { buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import AuthSpotifyButton from "./auth-spotify-button";
import AuthYoutubeButton from "./auth-youtube-button";
import ProfileCardImageAndName from "./profile-card-image-and-name";
import ProfileCategories from "./profile-categories";
import ProfilePriceSwitcher from "./profile-price-switcher";

// Type definitions
import { Company } from "@/types/company";
import { PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";
import VisitorsPricingModal from "./visitors-pricing-modal";
import VisitorsStatisticsModal from "./visitors-statistics-modal";

/**
 * Component to display a profile card with user, podcaster, or company details.
 *
 * @param {object} props - Component props.
 * @param {User | PodcasterDetails | Company} props.profileData - The profile data to display.
 * @param {Session | null} props.session - The current user session, if available.
 * @param {string} props.profileType - The type of profile ("user", "podcaster", or "company").
 * @param {boolean} props.isSelfProfile - Indicates if the profile being displayed is the current user's profile.
 * @returns {JSX.Element} The rendered profile card component.
 */
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
  // Fetch translations for the current locale
  const t = await getTranslations("Index");

  return (
    <div className="w-full lg:w-3/12 rounded-lg lg:bg-card lg:py-14 px-5 lg:px-10 flex flex-col items-center lg:gap-10 gap-6">
      {/* Profile image and name */}
      <div className="w-full flex flex-col items-center gap-3">
        <ProfileCardImageAndName
          name={profileData?.full_name}
          image={profileData?.image}
        />
        {/* Display categories if present */}
        {"categories" in profileData ? (
          <ProfileCategories categories={profileData?.categories!} />
        ) : null}
        {/* Display price switcher for podcasters under certain conditions */}
        {isSelfProfile && profileType === "podcaster" ? (
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
      {/* Contact and additional profile information */}
      <div className="flex flex-col items-start justify-center w-full gap-10">
        {/* Statistics link for non-user profiles */}
        <div className="flex flex-col w-full mx-auto items-center gap-7">
          {profileType === "podcaster" &&
          "price" in profileData &&
          profileData?.price &&
          session?.user?.type === "company" ? (
            <VisitorsPricingModal pricings={profileData?.price} />
          ) : null}
          {profileType === "podcaster" &&
          "statistics" in profileData &&
          profileData?.statistics &&
          session?.user?.type === "company" ? (
            <VisitorsStatisticsModal statistics={profileData?.statistics} />
          ) : null}
          {!isSelfProfile || profileType === "user" ? null : (
            <Link
              href={`/${session?.user?.type}/statistics`}
              className="flex justify-center items-center gap-5 opacity-75 hover:opacity-100 duration-200"
            >
              <PieChart className="size-5" strokeWidth={3} />
              <p className="text-lg font-medium capitalize">
                {t("statistics")}
              </p>
            </Link>
          )}
        </div>
        {/* Phone number display for users and companies */}
        {((profileType === "user" && session?.user?.id === profileData?.id) ||
          profileType === "company") &&
        profileData?.phone ? (
          <div className="text-center text-lg flex items-center gap-5">
            <PhoneIcon className="size-5" />
            <p>{profileData?.phone}</p>
          </div>
        ) : null}
        {/* Email display with hover card for additional details */}
        {profileData?.email &&
        (profileType === "user" || profileType === "company") ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="text-center w-full text-lg flex items-center gap-5">
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
      {/* Edit profile link for self profiles */}
      {isSelfProfile ? (
        <Link
          href={`/${session?.user?.type}/profile/edit`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full text-lg font-bold"
          )}
        >
          {t("editProfile")}
        </Link>
      ) : null}
      {/* Buttons for linking YouTube and Spotify accounts for podcasters */}
      {profileType === "podcaster" && "youtube_account" in profileData ? (
        <div className="flex justify-center items-center gap-7 flex-wrap w-full mt-3">
          <AuthYoutubeButton youtube_account={profileData?.youtube_account} />
          <AuthSpotifyButton spotify_account={profileData?.spotify_account} />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileCard;
