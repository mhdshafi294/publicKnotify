import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@/navigation";
import { CategoryDetails } from "@/types/podcast";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FC } from "react";

type PropsType = {
  category: CategoryDetails;
};

const CategoryCard: FC<PropsType> = async ({ category }) => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Index");
  return (
    <Link
      href={`/${session?.user?.type}/category/${category?.id}`}
      className="hover:bg-foreground/10 duration-150 transition-colors flex justify-start items-center border-2 border-transparent hover:border-greeny/50 rounded-[10px] w-52 h-[184px] gap-2 p-4 relative group overflow-hidden"
      key={category?.id}
    >
      <div className="absolute inset-0 w-full -z-10 ">
        <Image
          fill
          className=" object-cover"
          src={category.image ? category.image : "/podcast-filler.webp"}
          alt={category.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col justify-center gap-1 rounded-t-[10px] absolute bottom-0 left-0 w-full text-black bg-white/50 backdrop-blur-sm p-3">
        <p className="text-sm font-bold capitalize">{category.name}</p>
        <p className="text-xs font-bold capitalize text-muted-foreground">{`${
          category.podcasts_count
        } ${t("episodes")}`}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
