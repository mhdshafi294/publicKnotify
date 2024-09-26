import { getContractAction } from "@/app/actions/contractActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import {
  ArrowDown,
  ArrowDownToDotIcon,
  FileCheck2Icon,
  ScrollTextIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import React from "react";

const ContractPage = async ({
  params,
}: {
  params: { userType: string; contractId: string };
}) => {
  // Fetching the current session using NextAuth's getServerSession
  const session = await getServerSession(authOptions);

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  const contract = await getContractAction({
    type: session?.user?.type!,
    id: params.contractId,
  });

  const secondPartyData = {
    name: contract?.company
      ? contract?.company?.full_name
      : contract?.podcaster?.full_name!,
    image: contract?.company
      ? contract?.company?.image
      : contract?.podcaster?.image!,
  };

  return (
    <MaxWidthContainer className="py-10 flex-1 flex flex-col">
      <Card className="bg-card-secondary duration-200 border-card-foreground/10 flex-1 relative flex flex-col">
        <CardHeader>
          <div className="flex gap-3">
            <div className="w-full flex flex-col justify-start gap-3">
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-3 items-baseline">
                  <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("contract-id")}
                  </p>
                  <CardTitle className="capitalize">{contract?.id}</CardTitle>
                  <FileCheck2Icon
                    size={18}
                    className="text-card-foreground/30"
                  />
                </div>
                <div className="text-xs lg:text-lg rounded bg-card-foreground text-card px-2 py-1.5 font-semibold">
                  {contract?.status_translation}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-sm lg:text-xl capitalize">
                  <span className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50 me-1">
                    {t("request-name")}
                  </span>
                  <span className="text-sm lg:text-xl capitalize">
                    {contract?.request_name}
                  </span>
                </div>
                <div className="text-sm lg:text-xl capitalize flex gap-3">
                  <span className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50 me-1">
                    {t("with")}
                  </span>
                  <span className="text-sm lg:text-xl capitalize">
                    {contract?.company
                      ? contract?.company?.full_name
                      : contract?.podcaster?.full_name}
                  </span>
                  <Avatar className="size-6 ">
                    <AvatarImage
                      src={secondPartyData?.name}
                      alt={secondPartyData?.name}
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
                  __html: contract?.description,
                }}
              />
              <div className="flex flex-wrap gap-2"></div>
            </div>
            <div className="flex lg:grid lg:grid-cols-2 gap-5 lg:w-4/12">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("offerValue")}
                  </p>
                  <p className="text-xs lg:text-lg ">{contract?.ad_cost} $</p>
                </div>
                <div>
                  <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("ad-period")}
                  </p>
                  <p className="text-xs lg:text-lg ">
                    {contract?.ad_period.split(":")[1]}m{" "}
                    {contract?.ad_period.split(":")[2]}s
                  </p>
                </div>
                <div>
                  <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("adPosition")}
                  </p>
                  <p className="text-xs lg:text-lg ">{contract?.ad_place}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("publishDate")}
                  </p>
                  <p className="text-xs lg:text-lg">
                    {contract?.publishing_date}
                  </p>
                </div>
                <div>
                  <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("episode-type")}
                  </p>
                  <p className="text-xs lg:text-lg">
                    {contract?.episode_type_translation}
                  </p>
                </div>
                <div>
                  <p className="text-xs lg:text-lg font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("media-type")}
                  </p>
                  <p className="text-xs lg:text-lg">{contract?.media_type}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="!mt-auto justify-self-end">
          <div className="flex w-full items-baseline">
            <p className="text-sm font-bold text-card-foreground/80 dark:text-card-foreground/50">
              {t("created-at")} {contract?.created_at}
            </p>
          </div>
        </CardFooter>
      </Card>
    </MaxWidthContainer>
  );
};

export default ContractPage;
