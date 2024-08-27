"use client";

import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  AirplayIcon,
  EllipsisIcon,
  SquareArrowOutUpRightIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Link, useRouter } from "@/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import DashboardCardContainer from "./_components/dashboard-card-container";
import Loading from "@/app/[locale]/loading";
import { getPlayListsAction } from "@/app/actions/podcastActions";
import { Playlist, PlaylistsResponse } from "@/types/podcast";
import { cn } from "@/lib/utils";

/**
 * Fetches playlists from the server based on the page number.
 *
 * @param {string} page - The current page number for fetching playlists.
 * @returns {Promise<PlaylistsResponse>} A promise that resolves to the playlists data.
 */
async function fetchPlaylists(page: string): Promise<PlaylistsResponse> {
  const res = await getPlayListsAction({
    type: "podcaster",
    page,
  });
  return res;
}

/**
 * The AllShowsPage component displays a table of all podcast shows available to the podcaster.
 *
 * This component includes pagination and error handling, utilizing the `react-query` library
 * to manage server data fetching and caching.
 *
 * @returns {JSX.Element} The rendered AllShowsPage component.
 */
export default function AllShowsPage(): JSX.Element | null {
  const t = useTranslations("Index"); // Translation namespace
  const router = useRouter();
  const [page, setPage] = useState(1);

  // Query for fetching playlists data with pagination support
  const { data, isLoading, error } = useQuery({
    queryKey: ["playlists", page],
    queryFn: () => fetchPlaylists(page.toString()),
    placeholderData: keepPreviousData, // Retain previous data while fetching new data
  });

  // Handle loading state
  if (isLoading) return <Loading />;

  // Handle error state and redirect to custom error page
  if (error) {
    router.push("/error");
    return null; // Explicitly allowed by the return type
  }

  // Calculate total pages based on the response data
  const totalPages = data
    ? Math.ceil(data.pagination.total / data.pagination.per_page)
    : 1;

  return (
    <main className="flex-1">
      {/* Page Header */}
      <div className="flex w-full justify-between items-center px-4 sm:px-6 md:px-8 py-3 border-b border-b-secondary">
        <h2 className="text-xl font-bold opacity-75">{t("shows-table")}</h2>
        <div>
          <Link
            href="/podcaster/shows/create"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t("add-show")}
          </Link>
        </div>
      </div>

      {/* Page Content */}
      <div className="py-3 px-4 sm:px-6 md:px-8">
        <DashboardCardContainer className="rounded">
          <h2 className="text-3xl font-bold">{t("all-shows")}</h2>

          {/* Playlists Table */}
          <Table className="flex-1 shrink-0 grow">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t("title")}</TableHead>
                <TableHead>{t("episodes")}</TableHead>
                <TableHead>{t("role")}</TableHead>
                <TableHead>{t("owner")}</TableHead>
                <TableHead className="text-end"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.playlists.map((playlist: Playlist) => (
                <TableRow key={playlist.id}>
                  <TableCell className="flex gap-3 items-center">
                    <Image
                      src={playlist.image}
                      width={64}
                      height={64}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover size-16"
                      alt={playlist.name}
                    />
                    <Link
                      href={`/podcaster/shows/${playlist.id}`}
                      className="flex gap-2 "
                    >
                      <p className="font-bold capitalize">{playlist.name}</p>
                      <SquareArrowOutUpRightIcon className="size-2 opacity-35" />
                    </Link>
                  </TableCell>
                  <TableCell>{playlist.podcasts_count}</TableCell>
                  <TableCell>{playlist.type_translation}</TableCell>
                  <TableCell>{playlist.owner_email}</TableCell>
                  <TableCell className="text-end">
                    <div className="flex items-center justify-end w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1.5">
                          <Link
                            href={`/podcaster/shows/${playlist.id}/episodes`}
                          >
                            <DropdownMenuItem className="text-xs">
                              <AirplayIcon className="size-4 mr-2" />
                              {t("episodes")}
                            </DropdownMenuItem>
                          </Link>
                          <Link
                            href={`/podcaster/shows/${playlist.id}/analytics`}
                          >
                            <DropdownMenuItem className="text-xs">
                              <TrendingUpIcon className="size-4 mr-2" />
                              {t("audience")}
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/podcaster/shows/${playlist.id}`}>
                            <DropdownMenuItem className="text-xs">
                              <SquareArrowOutUpRightIcon className="size-4 mr-2" />
                              {t("show-dashboard")}
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              {t("previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              {t("next")}
            </Button>
          </div>
        </DashboardCardContainer>
      </div>
    </main>
  );
}
