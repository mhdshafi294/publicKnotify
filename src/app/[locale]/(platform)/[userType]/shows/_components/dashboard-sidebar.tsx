import Image from "next/image";
import React from "react";

type DashboardSidebarProps = {
  imgSrc: string;
  tile: string;
  description: string;
  episodesCount: number;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  imgSrc,
  tile,
  description,
  episodesCount,
  ...props
}) => {
  return (
    <div className="bg-[#1a1929] w-full xl:w-80 flex xl:flex-col p-8 xl:pt-16 gap-5">
      <div className="w-44 xl:size-64 aspect-square relative">
        <Image
          src={imgSrc}
          alt="Show image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">{tile}</h2>
        <p className="opacity-50 font-light">{description}</p>
        <p className="opacity-75 font-bold">{episodesCount} episodes</p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
