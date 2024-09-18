"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full group peer bg-background">
      <SliderPrimitive.Range className="absolute h-full py-0.5 group-hover:bg-greeny bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-3 [span_>_&]:opacity-0 focus-visible:opacity-100 hover:opacity-100 peer-[&_span:hover]:opacity-100 peer-hover:[span_>_&]:opacity-100 rounded-full bg-foreground transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
