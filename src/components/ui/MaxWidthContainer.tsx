// app/components/MaxWidthContainer.tsx
import { cn } from "@/lib/utils";
import React from "react";

type MaxWidthContainerProps = {
  children: React.ReactNode;
  className?: string;
  dir?: "ltr" | "rtl";
};

const MaxWidthContainer: React.FC<MaxWidthContainerProps> = ({
  children,
  className,
  dir,
}) => {
  return (
    <div
      className={cn(
        `mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-screen-2xl`,
        className
      )}
      dir={dir}
    >
      {children}
    </div>
  );
};

export default MaxWidthContainer;
