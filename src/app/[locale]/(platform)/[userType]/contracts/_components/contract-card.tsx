import { FC } from "react";
import { SquareArrowOutUpRightIcon } from "lucide-react";

import { Contract } from "@/types/contract";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

/**
 * contractCard Component
 * Displays a card with detailed information about a contract.
 * Includes a link to the detailed view of the contract.
 *
 * @param {Object} props - The props object.
 * @param {contract} props.contract - The contract object to be displayed.
 *
 * @returns {JSX.Element} The card displaying the contract details.
 */
const ContractCard: FC<{ contract: Contract }> = ({ contract }) => {
  // Translation function for internationalization
  const t = useTranslations("Index");

  return (
    <Link href={`contracts/${contract?.id}`}>
      <Card className="bg-card-secondary/70 hover:bg-card-secondary duration-200 border-card-foreground/10 min-h-96 relative flex flex-col rounded-sm">
        <CardHeader>
          <div className="flex gap-3">
            <div className="w-full flex flex-col justify-start gap-3">
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-3 items-baseline">
                  <p className="text-xs font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("contract-id")}
                  </p>
                  <CardTitle className="capitalize">{contract?.id}</CardTitle>
                  <SquareArrowOutUpRightIcon
                    size={14}
                    className="text-card-foreground/30"
                  />
                </div>
                <div className="text-xs rounded bg-card-foreground text-card px-2 py-1.5 font-semibold">
                  {contract?.status_translation}
                </div>
              </div>
              <p className="text-sm capitalize">
                <span className="text-xs font-bold text-card-foreground/80 dark:text-card-foreground/50 me-1">
                  {t("with")}
                </span>
                {contract?.company
                  ? contract?.company?.full_name
                  : contract?.podcaster?.full_name}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col-reverse lg:flex-row items-stretch gap-2">
            <div className="lg:w-9/12 text-wrap overflow-hidden flex flex-col gap-3 justify-between">
              <article
                className="text-wrap text-xl"
                dangerouslySetInnerHTML={{
                  __html: contract?.description,
                }}
              />
              <div className="flex flex-wrap gap-2">
                <div className="">
                  <p className="text-xs font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("episode-type")}
                  </p>
                  <p className="text-xs">
                    {contract?.episode_type_translation}
                  </p>
                </div>
                <div className="">
                  <p className="text-xs font-bold text-card-foreground/80 dark:text-card-foreground/50">
                    {t("media-type")}
                  </p>
                  <p className="text-xs">{contract?.media_type}</p>
                </div>
              </div>
            </div>
            <div className="flex lg:flex-col gap-2 lg:w-3/12">
              <div>
                <p className="text-xs font-bold text-card-foreground/80 dark:text-card-foreground/50">
                  {t("publishDate")}
                </p>
                <p className="text-xs">{contract?.publishing_date}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-card-foreground/80 dark:text-card-foreground/50">
                  {t("offerValue")}
                </p>
                <p className="text-xs lg:text-sm">{contract?.ad_cost} $</p>
              </div>
              <div>
                <p className="text-xs font-bold text-card-foreground/80 dark:text-card-foreground/50">
                  {t("ad-period")}
                </p>
                <p className="text-xs lg:text-sm">
                  {contract?.ad_period.split(":")[1]}m{" "}
                  {contract?.ad_period.split(":")[2]}s
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-card-foreground/80 dark:text-card-foreground/50">
                  {t("adPosition")}
                </p>
                <p className="text-xs lg:text-sm">{contract?.ad_place}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="!mt-auto justify-self-end">
          <div className="flex w-full items-baseline">
            <p className="text-[10px] font-bold text-card-foreground/80 dark:text-card-foreground/50">
              {t("created-at")} {contract?.created_at}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ContractCard;
