import React from "react";
import Image from "next/image";

type DashboardSidebarProps = {
  imgSrc: string;
  title: string;
  description: string;
  episodesCount: number;
};

/**
 * The DashboardSidebar component displays the sidebar content for the dashboard,
 * including the show image, title, description, and the number of episodes.
 *
 * @param {DashboardSidebarProps} props - The props for the component.
 * @param {string} props.imgSrc - The source URL for the show image.
 * @param {string} props.title - The title of the show.
 * @param {string} props.description - A brief description of the show.
 * @param {number} props.episodesCount - The total number of episodes available for the show.
 *
 * @returns {JSX.Element} The rendered DashboardSidebar component.
 */
const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  imgSrc,
  title,
  description,
  episodesCount,
}) => {
  return (
    <aside className="bg-card-secondary w-full xl:w-80 flex xl:flex-col p-8 xl:pt-16 gap-5">
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
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="opacity-50 font-light">{description}</p>
        <p className="opacity-75 font-bold">{episodesCount} episodes</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
