import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

import { Link } from "@/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import { useTranslations } from "next-intl";

type DashboardMediumCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  linkName: string;
  linkHref: string;
  done?: boolean;
};

/**
 * The DashboardMediumCard component displays a card with an image, title, description, and a call-to-action link.
 *
 * It is used in the dashboard to present quick actions for the user, such as viewing episodes or submitting a show.
 *
 * @param {DashboardMediumCardProps} props - The props for the component.
 * @param {string} props.imageSrc - The source URL of the image to display in the card.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @param {string} props.linkName - The text for the call-to-action link.
 * @param {string} props.linkHref - The URL for the call-to-action link.
 * @param {boolean} [props.done=false] - Indicates if the task associated with the card is completed.
 *
 * @returns {JSX.Element} The rendered DashboardMediumCard component.
 */
const DashboardMediumCard: React.FC<DashboardMediumCardProps> = ({
  imageSrc,
  title,
  description,
  linkName,
  linkHref,
  done = false,
}) => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="2xl:h-[404px] flex flex-col sm:flex-row 2xl:flex-col justify-between gap-5 rounded-[32px]">
      {/* Image Section */}
      <div
        className={cn(
          "2xl:w-full sm:w-[270px] w-full h-[170px] relative grayscale-0",
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
          className="object-cover rounded-[32px]"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 justify-end flex-1">
        <h2 className="text-lg ">{title}</h2>
        <p className="opacity-50">{description}</p>

        {/* Conditional CTA or "Done" Indicator */}
        {done ? (
          <div className="2xl:mt-auto flex gap-3 items-center text-greeny">
            <div className="size-7 rounded bg-greeny/20 flex justify-center items-center">
              <Check className="stroke-greeny" />
            </div>
            <div className="">{t("done")}!</div>
          </div>
        ) : (
          <Link
            className={cn(
              buttonVariants({
                variant: "outline",
                className:
                  "2xl:w-full sm:w-fit w-full 2xl:mt-auto capitalize text-base rounded-sm dark:border-input border-border-secondary dark:text-white/70 font-bold",
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
