import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileCheck2Icon, ScrollTextIcon, ArrowDown } from "lucide-react";
import { getServerSession, Session } from "next-auth";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React, { use } from "react";

type ContractPageCardProps = {
  id?: number;
  status_translation?: string;
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
    <Card className="bg-card-secondary duration-200 border-card-foreground/10 flex-1 relative flex flex-col p-4">
      <CardHeader>
        <div className="flex gap-3">
          <div className="w-full flex flex-col justify-start gap-3">
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-3 items-baseline">
                <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50">
                  {t("contract-id")}
                </p>
                <CardTitle className="capitalize">{id ? id : "***"}</CardTitle>
                <FileCheck2Icon size={18} className="text-card-foreground/30" />
              </div>
              <div className="text-xs lg:text-lg rounded bg-card-foreground text-card px-2 py-1.5 font-semibold">
                {status_translation ? status_translation : t("contract-status")}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-sm lg:text-xl capitalize">
                <span className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50 me-1">
                  {t("request-name")}
                </span>
                <span className="text-sm lg:text-xl capitalize">
                  {request_name}
                </span>
              </div>
              <div className="text-sm lg:text-xl capitalize flex gap-3">
                <span className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50 me-1">
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
        <div className="flex flex-col-reverse lg:flex-row items-stretch gap-2">
          <div className="lg:w-8/12 text-wrap overflow-hidden ">
            <p className="lg:text-2xl font-bold text-card-foreground/80 dark:text-card-foreground/50 flex gap-1">
              {t("contract-description")}
              <ScrollTextIcon size={14} className="self-center" />
              <ArrowDown />
            </p>
            <article
              className="text-wrap text-xl"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            <div className="flex flex-wrap gap-2"></div>
          </div>
          <div className="flex lg:grid lg:grid-cols-2 gap-5 lg:w-4/12">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50">
                  {t("offerValue")}
                </p>
                <p className="text-sm lg:text-lg font-bold ">{ad_cost} $</p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50">
                  {t("ad-period")}
                </p>
                <p className="text-sm lg:text-lg font-bold ">
                  {ad_period.split(":")[1]}m {ad_period.split(":")[2]}s
                </p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50">
                  {t("adPosition")}
                </p>
                <p className="text-sm lg:text-lg font-bold ">{ad_place}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50">
                  {t("publishDate")}
                </p>
                <p className="text-sm lg:text-lg font-bold">
                  {publishing_date}
                </p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50">
                  {t("publish-time")}
                </p>
                <p className="text-sm lg:text-lg font-bold">
                  {publishing_time}
                </p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50">
                  {t("episode-type")}
                </p>
                <p className="text-sm lg:text-lg font-bold">
                  {episode_type_translation}
                </p>
              </div>
              <div>
                <p className="text-xs lg:text-base text-card-foreground/80 dark:text-card-foreground/50">
                  {t("media-type")}
                </p>
                <p className="text-sm lg:text-lg font-bold">{media_type}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="!mt-auto justify-self-end">
        <div className="flex w-full items-baseline">
          <p className="text-sm font-bold text-card-foreground/80 dark:text-card-foreground/50">
            {t("created-at")} {created_at ? created_at : t("not-created-yet")}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContractPageCard;
