"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import DashboardCardContainer from "./_components/dashboard-card-container";
import Image from "next/image";
import { getPlayListsAction } from "@/app/actions/podcastActions";
import { Playlist, PlaylistsResponse } from "@/types/podcast";
import Loading from "@/app/[locale]/loading";
import { AirplayIcon, EllipsisIcon, TrendingUpIcon } from "lucide-react";
import { Link, useRouter } from "@/navigation";

// Fetch function using the pagination info
async function fetchPlaylists(page: string): Promise<PlaylistsResponse> {
  const res = await getPlayListsAction({
    type: "podcaster",
    page,
  });

  return res;
}

export default function AllShowsPage() {
  const t = useTranslations("Index");
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["playlists", page],
    queryFn: () => fetchPlaylists(page.toString()),
    placeholderData: keepPreviousData, // Keeps the previous data while fetching new data
  });

  if (isLoading) return <Loading />;
  if (error) {
    // Redirect to the custom error page
    router.push("/error");
    return null;
  }

  const totalPages = data
    ? Math.ceil(data.pagination.total / data.pagination.per_page)
    : 1;

  return (
    <main className="flex-1">
      <div className="flex w-full justify-between items-center px-4 sm:px-6 md:px-8 py-3 border-b border-b-secondary">
        <h2>{t("all-shows")}</h2>
        <div>
          <Button variant="outline">{t("add-show")}</Button>
        </div>
      </div>
      <div className="py-3 px-4 sm:px-6 md:px-8">
        <DashboardCardContainer className="rounded">
          <h2 className="text-3xl font-bold">{t("all-shows")}</h2>
          <Table className="flex-1 shrink-0 grow">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Title</TableHead>
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
                    <p className="font-bold">{playlist.name}</p>
                  </TableCell>
                  <TableCell>{playlist.podcasts_count}</TableCell>
                  <TableCell>{playlist.type_translation}</TableCell>
                  <TableCell>{playlist.owner_email}</TableCell>
                  <TableCell className="text-end">
                    <div className="flex items-center justify-end w-full ">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1.5">
                          <Link
                            href={`/podcaster/shows/${playlist.id}/episodes`}
                          >
                            <DropdownMenuItem>
                              <AirplayIcon className="size-4 mr-2" />
                              {t("episodes")}
                            </DropdownMenuItem>
                          </Link>
                          <Link
                            href={`/podcaster/shows/${playlist.id}/analytics`}
                          >
                            <DropdownMenuItem>
                              <TrendingUpIcon className="size-4 mr-2" />
                              {t("audience")}
                            </DropdownMenuItem>
                          </Link>
                          {/* <DropdownMenuItem>
                            {t("show-setting")}
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </DashboardCardContainer>
      </div>
    </main>
  );
}
