"use client";

import { useTranslations } from "next-intl";

import DashboardCardContainer from "../../../_components/dashboard-card-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useState,
} from "react";
import { createUpdateDistributionLinksAction } from "@/app/actions/podcastActions";

type ChannelCardProps = {
  // icon: string;
  title: string;
  type: string;
  playlist_id: string;
  PlatfotmIcon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
  >;
  content: {
    header: string;
    step1: string;
    submitLink: string;
    link?: string;
    step2: string;
    footer?: string;
  };
};

/**
 * The SocialCard component displays a distribution platform with its icon and title.
 * It includes a clickable icon that indicates a redirect action.
 *
 * @param {ChannelCardProps} props - The props for the component.
 * @param {string} props.icon - The source URL for the platform icon.
 * @param {string} props.title - The title of the platform.
 *
 * @returns {JSX.Element} The rendered SocialCard component.
 */
const ChannelCard: React.FC<ChannelCardProps> = ({
  // icon,
  title,
  playlist_id,
  PlatfotmIcon,
  type,
  content,
}) => {
  const t = useTranslations("Index");
  const [link, setLink] = useState(content.link || "");

  const {
    mutate: server_createUpdateDstributionLinks,
    isPending: createUpdateDstributionLinksPending,
    isError: createUpdateDstributionLinksIsError,
    error: createUpdateDstributionLinksError,
  } = useMutation({
    mutationFn: createUpdateDistributionLinksAction,
    onMutate: () => {
      toast.loading("link updating...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("link updated");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong. Please try again");
      console.error(createUpdateDstributionLinksError);
    },
  });

  const handleCreateUpdateDstributionLinks = () => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("playlist_id", playlist_id);
    formData.append("url", link);
    console.log(playlist_id, type, link);

    server_createUpdateDstributionLinks({ type: "podcaster", formData });
  };

  return (
    <DashboardCardContainer className="rounded-none bg-transparent px-8 py-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <PlatfotmIcon className="size-12" />
                <p className="text-xl font-medium">{t(title)}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p>{content.header}</p>
            <div className="flex flex-col gap-6 gap p-6 bg-card-secondary mt-6">
              <p className="text-base font-bold tracking-wider uppercase">
                {t("step-1-link-generator")}
              </p>
              <p className="opacity-80 font-thin">{content.step1}</p>
              <a
                href={content.submitLink}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "w-fit font-bold ",
                  })
                )}
              >
                {t("submit-podcast-to")} {t(title)}
              </a>
              <p className="text-base font-bold tracking-wider uppercase">
                {t("step-2-enter-url")}
              </p>
              <p className="opacity-80 font-thin">{content.step2}</p>
              <div className="flex justify-between gap-2 items-stretch w-full">
                <Input value={link} onChange={(e) => setLink(e.target.value)} />
                <Button
                  onClick={() => {
                    handleCreateUpdateDstributionLinks();
                  }}
                  variant={"outline"}
                >
                  {t("saveButton")}
                </Button>
              </div>
              {content.footer ? <p>{content.footer}</p> : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DashboardCardContainer>
  );
};

export default ChannelCard;
