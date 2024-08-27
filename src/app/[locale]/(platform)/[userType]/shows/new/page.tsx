import React from "react";
import { useTranslations } from "next-intl";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

/**
 * The NewShowPage component renders the page where users can choose to import an existing show
 * or start creating a new show from scratch.
 *
 * It provides two options with buttons: one for importing an existing show and one for starting from scratch.
 *
 * @returns {JSX.Element} The rendered NewShowPage component.
 */
const NewShowPage = (): JSX.Element => {
  const t = useTranslations("Index");

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="max-w-screen-md bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
        <h2 className="text-6xl leading-tight font-semibold">
          {t("get_started")}
        </h2>
        <p className="text-xl">{t("get_started_description")}</p>
        <div className="flex justify-center items-center gap-4">
          {/* Button to import an existing show */}
          <Button
            size="lg"
            className="font-bold text-background text-lg w-full bg-greeny hover:bg-greeny/90"
          >
            {t("import_existing_show")}
          </Button>
          {/* Link to start creating a show from scratch */}
          <Link
            href="/podcaster/shows/create"
            className={cn(
              buttonVariants({
                size: "lg",
                className: "font-bold text-lg w-full",
              })
            )}
          >
            {t("start_from_scratch")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewShowPage;
