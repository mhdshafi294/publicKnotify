"use client";

import { getTrendingAction } from "@/app/actions/podcastActions";
import TriangleToLeft from "@/components/icons/triangle-to-left";
import TriangleToRight from "@/components/icons/triangle-to-right";
import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Heart, HeartCrack, HeartHandshakeIcon, HeartOff } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const TrendingSection = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () =>
        getTrendingAction({
          count: searchParams.count as string,
          search: searchParams.search as string,
          category_id: searchParams.category_id as string,
          page: page.toString(),
          type: params.userType as string,
        }),
      placeholderData: keepPreviousData,
    });

  if (isError) {
    console.log(error);
    return <div>Something went wrong. Please try again</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  console.log(data);
  return (
    <div className="w-full space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Trending Podcasts</h2>
        <div className="flex justify-end items-center">
          <Button variant="ghost" className="group hover:bg-secondary">
            <TriangleToLeft className="group-hover: fill-white" />
          </Button>
          <Button variant="ghost" className="group hover:bg-secondary">
            <TriangleToRight className="group-hover: fill-white" />
          </Button>
        </div>
      </div>
      <div className="w-full flex gap-10">
        {data?.podcasts.map((project) => (
          <div key={project.id} className="w-fit flex flex-col gap-1">
            <Image
              src={project.thumbnail}
              alt={`${project.name} thumbnail`}
              width={180}
              height={180}
              className="object-cover"
            />
            <h3 className="font-bold text-sm text-wrap">{project.name}</h3>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">
                {project.podcaster.full_name}
              </p>
              {project.isFavorite ? (
                <Button
                  variant="outline"
                  className="p-0 outline-none border-none h-fit"
                >
                  <Heart size={20} fill="red" stroke="red" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="p-0 outline-none border-none h-fit"
                >
                  <Heart size={20} />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
