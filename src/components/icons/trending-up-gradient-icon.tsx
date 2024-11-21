import { forwardRef, SVGProps } from "react";

const TrendingUpGradientIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(({ color, ...props }, ref) => {
  return (
    <svg
      width="23"
      height="14"
      viewBox="0 0 23 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M17.2929 3.42033L12.608 8.10927L9.36818 4.86663C8.82692 4.3249 7.95169 4.3249 7.41043 4.86663L7.41024 4.86682L1.07448 11.2187C0.533384 11.7602 0.533383 12.6357 1.07448 13.1773C1.61574 13.719 2.49097 13.719 3.03222 13.1773L3.03244 13.1771L8.38425 7.81049L11.6238 11.0529C12.1651 11.5946 13.0402 11.5946 13.5815 11.053C13.5815 11.053 13.5815 11.0529 13.5816 11.0529L19.25 5.38973L20.5364 6.67729C21.07 7.21134 21.9997 6.83697 21.9997 6.07318V1.53365C22.0135 1.04681 21.6255 0.668658 21.151 0.668658H16.6208C15.8528 0.668658 15.4686 1.59446 16.0062 2.13257L17.2929 3.42033Z"
        fill="url(#paint0_linear_2295_1698)"
        stroke="url(#paint1_linear_2295_1698)"
        stroke-width="0.662684"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2295_1698"
          x1="18.4651"
          y1="7.63663"
          x2="3.99697"
          y2="7.63663"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#52D060" />
          <stop offset="0.395833" stop-color="#EDB13E" />
          <stop offset="1" stop-color="#FF7501" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2295_1698"
          x1="18.4651"
          y1="7.63663"
          x2="3.99697"
          y2="7.63663"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#52D060" />
          <stop offset="0.395833" stop-color="#EDB13E" />
          <stop offset="1" stop-color="#FF7501" />
        </linearGradient>
      </defs>
    </svg>
  );
});

TrendingUpGradientIcon.displayName = "TrendingUpGradientIcon";

export default TrendingUpGradientIcon;
