import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

type DashboardCardContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

const DashboardCardContainer: React.FC<DashboardCardContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "p-8 bg-card-secondary border border-border-secondary rounded-[32px] shadow-[2px_2px_0px_0px_#302e3e] relative",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DashboardCardContainer;
