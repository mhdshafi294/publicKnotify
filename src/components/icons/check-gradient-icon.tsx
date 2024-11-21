import { forwardRef, SVGProps } from "react";

const CheckGradientIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ color, ...props }, ref) => {
    return (
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M12.2276 22.4429L7.40332 17.5373C7.14357 17.2725 6.79093 17.1238 6.42317 17.1238C6.05542 17.1238 5.70278 17.2725 5.44303 17.5373C4.90083 18.0886 4.90083 18.9793 5.44303 19.5306L11.2544 25.44C11.7966 25.9913 12.6724 25.9913 13.2147 25.44L27.9237 10.4828C28.4659 9.93142 28.4659 9.04077 27.9237 8.48942C27.664 8.2247 27.3113 8.07593 26.9436 8.07593C26.5758 8.07593 26.2232 8.2247 25.9634 8.48942L12.2276 22.4429Z"
          fill="url(#paint0_linear_2295_1694)"
          stroke="url(#paint1_linear_2295_1694)"
          stroke-width="1.51471"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2295_1694"
            x1="24.7198"
            y1="17.7054"
            x2="8.41401"
            y2="17.7054"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2FEA9B" />
            <stop offset="1" stop-color="#7FDD53" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2295_1694"
            x1="24.7198"
            y1="17.7054"
            x2="8.41401"
            y2="17.7054"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2FEA9B" />
            <stop offset="1" stop-color="#7FDD53" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
);

CheckGradientIcon.displayName = "CheckGradientIcon";

export default CheckGradientIcon;
