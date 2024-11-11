import { getPlansAction } from "@/app/actions/planActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { redirect } from "@/navigation";
import { getServerSession, Session } from "next-auth";
import { getTranslations } from "next-intl/server";
import React from "react";
import PlanCard from "./_components/plan-card";
import VisaIcon from "@/components/icons/visa-icon";
import MastercardIcon from "@/components/icons/mastercard-icon";
import GooglePayIcon from "@/components/icons/google-pay-icon";
import ApplePayIcon from "@/components/icons/apple-pay-icon";

const PlansPage = async ({
  params,
  searchParams,
}: {
  params: { lang: string; userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Fetching the current session using NextAuth's getServerSession
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect(`/sign-in`);
  }

  if (session?.user?.type !== "podcaster") {
    // Redirect users of type "user" to their specific page
    redirect(`/`);
  }

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  // Fetching the contracts based on session type, search query, and status filters
  const contractsResponse = await getPlansAction({
    type: session?.user?.type!,
    playlist_id: params.showId,
    lang: params.lang,
  });

  return (
    <MaxWidthContainer className="min-h-[calc(100vh-72px)] py-8 w-full max-w-[1140px]">
      <main className="flex flex-col items-center gap-24 w-full">
        <div className="flex flex-col gap-5 w-full">
          <h1 className="text-6xl font-bold leading-[70px] tracking-[0.01em] text-center">
            {t("pick-your-premium")}
          </h1>
          <p className="text-sm font-semibold leading-5 text-center ">
            {t(
              "upgrade-to-knotify-premium-and-take-your-music-journey-to-the-next-level-enjoy-uninterrupted-music-playback-even-in-offline-mode"
            )}
          </p>
          <div className="flex justify-center items-center gap-4">
            <ApplePayIcon className="h-10 w-fit" />
            <VisaIcon className="h-12 w-fit" />
            <MastercardIcon className="h-10 w-fit" />
            <GooglePayIcon className="h-10 w-fit" />
            <span className="font-bold text-muted-foreground">
              +{t("more")}
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-3 w-full">
          {contractsResponse?.plans?.map((plan) => (
            <PlanCard
              key={plan.id}
              playlist_id={params.showId}
              session={session as Session}
              {...plan}
            />
          ))}
        </div>
      </main>
    </MaxWidthContainer>
  );
};

export default PlansPage;
