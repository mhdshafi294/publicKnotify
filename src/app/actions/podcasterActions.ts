"use server";

import getPodcasters from "@/services/podcaster/get-podcasters";

export const getPodcastersAction = async ({
  count = "10",
  search,
  page,
  type,
}: {
  count: string;
  search: string;
  page: string;
  type: string;
}) => {
  const getPodcastersResponse = await getPodcasters({
    count,
    search,
    page,
    type,
  });
  return getPodcastersResponse;
};
