import { CategoryDetails } from "@/types/podcast";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
  category: CategoryDetails;
};

const CategoryCard: FC<PropsType> = ({ category }) => {
  return (
    <Link
      href="/"
      className="bg-background flex justify-start items-center border rounded-xl w-48 gap-2 p-4"
      key={category.id}
    >
      <div className="size-10 relative">
        <Image
          fill
          className="rounded object-cover"
          src={category.image ? category.image : "/podcast-filler.webp"}
          alt={category.name}
        />
      </div>
      <div>
        <p className="text-xl font-bold capitalize">{category.name}</p>
        <p className="text-xs font-bold capitalize">{`${category.podcasts_count} Podcasts`}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
