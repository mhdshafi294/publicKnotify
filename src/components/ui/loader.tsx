import { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariant = cva("loading", {
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
      default: "w-6",
      xs: "w-4",
      sm: "w-5",
      lg: "w-10",
      xl: "w-16",
    },
  },
  defaultVariants: {
    variant: "spinner",
    size: "default",
  },
});

interface PropsTypes
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof buttonVariant> {}

const Loader: FC<PropsTypes> = ({ size, variant, className, ...props }) => {
  return (
    <span
      className={cn(buttonVariant({ variant, size, className }))}
      {...props}
    />
  );
};

export default Loader;
