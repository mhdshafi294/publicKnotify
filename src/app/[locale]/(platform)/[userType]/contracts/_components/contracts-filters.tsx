"use client";

// Import necessary hooks and utilities from Next.js and React
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Import authentication and localization hooks
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

// Import UI components and utilities from your project
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * StatusFilter component is used to filter requests based on their status.
 * It provides a set of buttons to toggle between different statuses, which
 * updates the URL parameters accordingly.
 *
 * @param {string} status - The initial status filter from the URL parameters.
 */
const ContractsFilter = ({
  company_request_id,
  company_id,
}: {
  company_request_id?: string;
  company_id?: string;
}) => {
  // Initialize hooks for navigation, session, and translations
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const { data: session } = useSession();
  const t = useTranslations("Index");

  // State to manage the current status filter
  const [filter, setFilter] = useState("");

  /**
   * Memoized STATUS array that defines the status codes and corresponding titles.
   * It changes based on the user type from the session.
   */
  const STATUS = useMemo(
    () => [
      {
        numCode: session?.user?.type === "podcaster" ? "2" : "12",
        title: t("pending"),
      },
      { numCode: "34", title: t("rejected") },
      { numCode: "5", title: t("accepted") },
      { numCode: "6", title: t("done") },
    ],
    [session?.user?.type, t]
  );

  /**
   * Effect that updates the URL parameters based on the selected filter.
   * It triggers whenever the `filter` state changes, except on the initial render.
   */
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (filter) {
      params.set("status", filter);
    } else {
      params.delete("status");
    }
    router.push(`requests?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="flex justify-start items-center">
      {STATUS.map(({ numCode, title }) => (
        <Button
          key={title}
          variant="link"
          onClick={() => setFilter((prev) => (prev === numCode ? "" : numCode))}
          className={cn(
            "capitalize text-foreground opacity-80 hover:opacity-100 font-bold duration-200 underline-offset-4 hover:no-underline text-base ",
            {
              "text-greeny before:absolute before:size-[6px] before:bg-greeny hover:before:bg-greeny_lighter before:translate-y-4 before:rounded-full hover:text-greeny_lighter":
                numCode === status,
            }
          )}
          aria-pressed={numCode === filter} // Accessibility: Indicates active filter for screen readers
        >
          {title}
        </Button>
      ))}
    </div>
  );
};

export default ContractsFilter;
