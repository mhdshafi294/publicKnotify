// app/components/MaxWidthContainer.tsx
import { cn } from "@/lib/utils";
import React from "react";

type MaxWidthContainerProps = {
  children: React.ReactNode;
  className?: string;
  dir?: "ltr" | "rtl";
};

/**
 * MaxWidthContainer component that provides a responsive container with max width.
 *
 * @param {MaxWidthContainerProps} props - The properties passed to the component.
 * @returns {JSX.Element} The MaxWidthContainer component.
 *
 * @example
 * ```tsx
 * <MaxWidthContainer className="my-class" dir="ltr">
 *   <p>Content goes here</p>
 * </MaxWidthContainer>
 * ```
 */
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
