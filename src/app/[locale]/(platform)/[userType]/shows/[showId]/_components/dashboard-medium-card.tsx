import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

import { Link } from "@/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardCardContainer from "../../_components/dashboard-card-container";

type DashboardMediumCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  linkName: string;
  linkHref: string;
  done: boolean;
};

const DashboardMediumCard: React.FC<DashboardMediumCardProps> = ({
  imageSrc,
  title,
  description,
  linkName,
  linkHref,
  done,
}) => {
  return (
    <DashboardCardContainer className="2xl:h-[404px] flex 2xl:flex-col gap-3">
      <div
        className={cn(
          "2xl:w-full 2xl:h-[150px] w-[270px] h-[165px] relative grayscale-0",
          {
            grayscale: done,
          }
        )}
      >
        <Image
          src={imageSrc}
          alt="podcaster dashboard"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded "
        />
      </div>
      <div className="flex flex-col gap-5 flex-1 mt-6">
        <h2 className="text-lg ">{title}</h2>
        <p className="opacity-50">{description}</p>
        {done ? (
          <div className="2xl:mt-auto flex gap-3  items-center text-greeny">
            <div className="size-7 rounded bg-greeny/20 flex justify-center items-center">
              <Check className="stroke-greeny" />
            </div>
            <p className="">Done!</p>
          </div>
        ) : (
          <Link
            className={cn(
              buttonVariants({
                variant: "outline",
                className:
                  "2xl:w-full w-fit 2xl:mt-auto capitalize text-base rounded-sm border-input text-white/70 font-bold",
              })
            )}
            href={linkHref}
          >
            {linkName}
          </Link>
        )}
      </div>
    </DashboardCardContainer>
  );
};

export default DashboardMediumCard;