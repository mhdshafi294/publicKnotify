import { forwardRef, SVGProps } from "react";

const PlayLarge = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ color, ...props }, ref) => {
    return (
      <svg
        width="101"
        height="101"
        viewBox="0 0 101 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <circle
          cx="50.6676"
          cy="50.6666"
          r="47.1467"
          fill="black"
          fill-opacity="0.2"
          stroke="white"
          stroke-width="5.89333"
        />
        <path
          d="M72.2177 50.6665L37.7759 71.3316V30.0014L72.2177 50.6665Z"
          stroke="white"
          stroke-width="6.63"
          fill={color ? color : "white"}
        />
      </svg>
    );
  }
);

PlayLarge.displayName = "Star";

export default PlayLarge;
