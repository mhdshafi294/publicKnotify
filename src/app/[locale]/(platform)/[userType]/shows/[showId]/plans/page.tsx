import { getPlansAction } from "@/app/actions/planActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import React from "react";
import PlanCard from "./_components/plan-card";

const PlansPage = async ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
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
  });

  return (
    <MaxWidthContainer className="min-h-[calc(100vh-72px)] py-8 w-full max-w-[1140px]">
      <main className="flex flex-col items-center gap-24 w-full">
        <div className="flex flex-col gap-5 w-full">
          <h1 className="text-6xl font-bold leading-[70px] tracking-[0.01em] text-center">
            Pick Your Premium
          </h1>
          <p className="text-sm font-semibold leading-5 text-center ">
            Upgrade to Knotify Premium and take your music journey to the next
            level. Enjoy uninterrupted music playback, even in offline mode
          </p>
        </div>
        <div className="flex justify-center gap-3 w-full">
          {contractsResponse?.plans?.map((plan) => (
            <PlanCard key={plan.id} playlist_id={params.showId} {...plan} />
          ))}
        </div>
      </main>
    </MaxWidthContainer>
  );
};

export default PlansPage;
