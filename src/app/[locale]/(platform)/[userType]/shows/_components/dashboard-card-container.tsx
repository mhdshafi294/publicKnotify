import React from "react";
import { cn } from "@/lib/utils";

type DashboardCardContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * The DashboardCardContainer component is a reusable container component used for displaying content
 * in a card-like structure with padding, background, and border styling.
 *
 * @param {DashboardCardContainerProps} props - The props for the component.
 * @param {string} [props.className] - Optional additional class names to style the container.
 * @param {React.ReactNode} [props.children] - The content to be rendered inside the container.
 *
 * @returns {JSX.Element} The rendered DashboardCardContainer component.
 */
const DashboardCardContainer: React.FC<DashboardCardContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "p-8 bg-card-secondary border border-border-secondary rounded-[8px] shadow-[2px_2px_0px_0px_#302e3e] relative",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DashboardCardContainer;
