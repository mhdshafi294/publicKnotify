import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";

import PodcastersSection from "@/app/[locale]/(platform)/_components/podcasters-section";
import TrendingSection from "@/app/[locale]/(platform)/_components/trending-section";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CategorySecrtion from "../_components/category-secrtion";
import { getPlayListsAction } from "@/app/actions/podcastActions";

/**
 * Home page component that renders different sections based on user type and authentication status.
 *
 * This component checks the user's session and renders different content based on whether the user is a "podcaster"
 * or not. It uses server-side session management and translation fetching.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters.
 * @param {Object} props.searchParams - Query string parameters.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default async function Home({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch the current session
  const session = await getServerSession(authOptions);

  // Redirect to login if the session is not available
  if (!session || session.expires) {
    redirect("/sign-in");
  }

  // Redirect to podcasrter dashboard if the user is a podcaster
  if (session?.user?.type === "podcaster") {
    const showsResponse = await getPlayListsAction({
      type: "podcaster",
      page: "1",
      count: "5",
    });
    if (showsResponse.message === "Unauthenticated.") {
      redirect("/sign-in");
    }
    if (showsResponse?.playlists?.length > 0) {
      redirect(
        `/${session?.user?.type}/shows/${showsResponse.playlists[0].id}`
      );
    } else {
      redirect(`/${session?.user?.type}/shows/create`);
    }
  }

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  // Render different sections based on user type
  const content = () => {
    if (session?.user?.type !== "podcaster") {
      return (
        <div className="mt-8 w-full flex flex-col gap-5">
          <TrendingSection params={params} searchParams={searchParams} />
          <CategorySecrtion />
          <PodcastersSection params={params} searchParams={searchParams} />
        </div>
      );
    }
  };

  return (
    <main className="flex flex-1 flex-col items-start justify-start gap-6 w-full mb-2">
      <h1 className="sr-only">{t("homePageTitle")}</h1>
      {content()}
    </main>
  );
}
