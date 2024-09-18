import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@/navigation";
import { CategoryDetails } from "@/types/podcast";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React, { FC } from "react";

type PropsType = {
  category: CategoryDetails;
};

const CategoryCard: FC<PropsType> = async ({ category }) => {
  const session = await getServerSession(authOptions);
  return (
    <Link
      href={`/${session?.user?.type}/category/${category.id}`}
      className="bg-background flex justify-start items-center dark:border border-2 border-border-secondary rounded-xl w-48 gap-2 p-4"
      key={category.id}
    >
      <div className="size-10 relative">
        <Image
          fill
          className="rounded object-contain"
          src={category.image ? category.image : "/podcast-filler.webp"}
          alt={category.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
