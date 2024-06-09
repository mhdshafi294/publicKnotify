import { Category } from "@/types/podcast";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
  category: Category;
};

const CategoryCard: FC<PropsType> = ({ category }) => {
  return (
    <Link
      href="/"
      className="bg-secondary flex justify-start items-center border rounded-xl w-48 gap-2 p-4"
      key={category.id}
    >
      <div>
        <Image
          width={50}
          height={50}
          className="rounded"
          src={category.image}
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
