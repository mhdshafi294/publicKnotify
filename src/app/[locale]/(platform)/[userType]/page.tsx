import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";

import PodcastersSection from "@/app/[locale]/(platform)/_components/podcasters-section";
import TrendingSection from "@/app/[locale]/(platform)/_components/trending-section";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CategorySecrtion from "../_components/category-secrtion";
import CompaniesSection from "../_components/Companies-section";

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
  if (!session) {
    redirect("/login");
  }

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  // Render different sections based on user type
  const content = () => {
    if (session?.user?.type !== "podcaster") {
      return (
        <>
          <TrendingSection params={params} searchParams={searchParams} />
          <CategorySecrtion />
          <PodcastersSection params={params} searchParams={searchParams} />
        </>
      );
    } else {
      return <CompaniesSection />;
    }
  };

  return (
    <main className="flex flex-1 flex-col items-start justify-start gap-6 w-full mt-8 mb-2">
      <h1 className="sr-only">{t("homePageTitle")}</h1>
      {content()}
    </main>
  );
}
