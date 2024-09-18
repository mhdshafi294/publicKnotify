import { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loaderVariant = cva("loading", {
  variants: {
    variant: {
      spinner: "loading-spinner",
      dots: "loading-dots",
      ring: "loading-ring",
      ball: "loading-ball",
      bars: "loading-bars",
      infinity: "loading-infinity",
    },
    size: {
      default: "size-6",
      xs: "size-4",
      sm: "size-5",
      lg: "size-10",
      xl: "size-16",
    },
  },
  defaultVariants: {
    variant: "spinner",
    size: "default",
  },
});

interface PropsTypes
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof loaderVariant> {}

const Loader: FC<PropsTypes> = ({ size, variant, className, ...props }) => {
  return (
    <span
      className={cn(
        loaderVariant({ variant, size, className }),
        "dark:text-foreground text-accent"
      )}
      {...props}
    />
  );
};

export default Loader;
