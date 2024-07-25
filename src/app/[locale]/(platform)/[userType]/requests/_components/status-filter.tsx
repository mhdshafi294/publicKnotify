"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const StatusFilter = ({ status }: { status?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const { data: session } = useSession();

  const [filter, setFilter] = useState(status);

  const STATUS = [
    {
      numCode: session?.user?.type === "podcaster" ? "2" : "12",
      title: "pending",
    },
    { numCode: "34", title: "rejected" },
    { numCode: "5", title: "accepted" },
    { numCode: "6", title: "done" },
  ];

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
  }, [filter]);

  return (
    <div className="flex justify-start items-center">
      {STATUS.map(({ numCode, title }) => (
        <Button
          key={title}
          variant="link"
          onClick={() => setFilter((prev) => (prev === numCode ? "" : numCode))}
          className={cn(
            "capitalize text-white/80 underline-offset-4 hover:no-underline text-base hover:text-white",
            {
              "text-greeny before:absolute before:size-[6px]  before:bg-greeny hover:before:bg-greeny_lighter before:translate-y-4 before:rounded-full hover:text-greeny_lighter ":
                numCode === status,
            }
          )}
        >
          {title}
        </Button>
      ))}
    </div>
  );
};

export default StatusFilter;
