import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { FileCheck2Icon, ScrollTextIcon, SquarePenIcon } from "lucide-react";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import React from "react";
import ContractPayButton from "./contract-pay-button";

type ContractPageCardProps = {
  id?: number;
  status_translation?: string;
  status_code?: number;
  request_name: string;
  secondPartyData: {
    name: string;
    image: string;
  };
  description: string;
  media_type: string;
  ad_place: string;
  ad_period: string;
  ad_cost: string;
  publishing_date: string;
  publishing_time: string;
  episode_type_translation: string;
  created_at?: string;
  session: Session;
};

const ContractPageCard: React.FC<ContractPageCardProps> = ({
  id,
  status_translation,
  status_code,
  request_name,
  secondPartyData,
  description,
  media_type,
  ad_place,
  ad_period,
  ad_cost,
  publishing_date,
  publishing_time,
  episode_type_translation,
  created_at,
  session,
}) => {
  // Fetch translations for the "Index" namespace
  const t = useTranslations("Index");

  return (
    <Card className="bg-card-secondary duration-200 border-card-foreground/10 flex-1 relative flex flex-col p-4 mx-auto max-w-3xl w-full">
      <CardHeader>
        <div className="flex gap-3">
          <div className="w-full flex flex-col justify-start gap-3">
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-3 items-baseline">
                <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("contract-id")}
                </p>
                <CardTitle className="capitalize">{id ? id : "***"}</CardTitle>
                <FileCheck2Icon size={18} className="text-card-foreground/30" />
              </div>
              {session?.user?.type === "podcaster" && status_code === 1 ? (
                <div className="flex justify-end items-center gap-3">
                  <Link
                    href={`${id}/update`}
                    className={cn(
                      buttonVariants({
                        variant: "secondary",
                        className:
                          "text-lg flex justify-center items-center gap-1 capitalize",
                      })
                    )}
                  >
                    <SquarePenIcon size={16} />
                    {t("update")}
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-sm lg:text-xl capitalize">
                <span className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50 capitalize me-1">
                  {t("request-name")}
                </span>
                <span className="text-sm lg:text-xl capitalize">
                  {request_name}
                </span>
              </div>
              <div className="text-sm lg:text-xl capitalize flex gap-3">
                <span className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50 capitalize me-1">
                  {t("with")}
                </span>
                <span className="text-sm lg:text-xl capitalize">
                  {secondPartyData?.name}
                </span>
                <Avatar className="size-6 ">
                  <AvatarImage
                    src={secondPartyData?.image}
                    alt={secondPartyData?.image}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-greeny_lighter text-[10px] text-black font-bold">
                    {secondPartyData?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col-reverse  items-stretch gap-10">
          <div className=" text-wrap overflow-hidden ">
            <p className="lg:text-2xl font-bold text-card-foreground/80 dark:text-card-foreground/50 capitalize flex gap-1">
              {t("contract-description")}
              <ScrollTextIcon size={14} className="self-center" />
            </p>
            <article
              className="text-wrap text-xl"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("offerValue")}
                </p>
                <p className="text-sm lg:text-lg font-bold ">{ad_cost} $</p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("ad-period")}
                </p>
                <p className="text-sm lg:text-lg font-bold ">
                  {ad_period.split(":")[1]}m {ad_period.split(":")[2]}s
                </p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("adPosition")}
                </p>
                <p className="text-sm lg:text-lg font-bold ">
                  {ad_place ? ad_place : "N/A"}
                </p>
              </div>
              <div className="">
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("status")}
                </p>
                <div className="w-fit mt-1 text-xs rounded-full bg-card-foreground text-card px-3 py-1.5 font-semibold">
                  {status_translation
                    ? status_translation
                    : t("contract-status")}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("publishDate")}
                </p>
                <p className="text-sm lg:text-lg font-bold">
                  {publishing_date}
                </p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("publish-time")}
                </p>
                <p className="text-sm lg:text-lg font-bold">
                  {publishing_time}
                </p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("episode-type")}
                </p>
                <p className="text-sm lg:text-lg font-bold">
                  {episode_type_translation}
                </p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50 capitalize">
                  {t("media-type")}
                </p>
                <p className="text-sm lg:text-lg font-bold">{media_type}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="!mt-auto justify-self-end">
        <div className="flex w-full justify-between items-end">
          <p className="text-sm font-bold text-card-foreground/80 dark:text-card-foreground/50 capitalize">
            {t("created-at")} {created_at ? created_at : t("not-created-yet")}
          </p>
          {id && session?.user?.type === "company" ? (
            <ContractPayButton
              contractId={id}
              session={session}
              disabled={status_code === 4 || status_code === 5}
            />
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContractPageCard;
