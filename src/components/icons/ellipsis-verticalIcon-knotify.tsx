import { forwardRef, SVGProps } from "react";

const EllipsisVerticalIconKnotify = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(({ color, ...props }, ref) => {
  return (
    <svg
      width="9"
      height="34"
      viewBox="0 0 9 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <rect
        y="21.0698"
        width="8.87087"
        height="8.87087"
        rx="4.43544"
        transform="rotate(-90 0 21.0698)"
        fill="#00FFB6"
      />
      <rect
        y="8.87109"
        width="8.87087"
        height="8.87087"
        rx="4.43544"
        transform="rotate(-90 0 8.87109)"
        fill="#97F3D6"
      />
      <rect
        x="0.0825195"
        y="33.2686"
        width="8.87087"
        height="8.87087"
        rx="4.43544"
        transform="rotate(-90 0.0825195 33.2686)"
        fill="#004FFF"
      />
    </svg>
  );
});

EllipsisVerticalIconKnotify.displayName = "EllipsisVerticalIconKnotify";

export default EllipsisVerticalIconKnotify;
