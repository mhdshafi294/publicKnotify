import { forwardRef, SVGProps } from "react";

const YoutubeIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        <g clipPath="url(#clip0_838_4732)">
          <path
            d="M33.21 9.13301C32.8289 7.70718 31.7062 6.58441 30.2803 6.20334C27.6957 5.51074 17.333 5.51074 17.333 5.51074C17.333 5.51074 6.97028 5.51074 4.38567 6.20334C2.96011 6.58441 1.83707 7.70718 1.45599 9.13301C0.763672 11.7174 0.763672 17.1094 0.763672 17.1094C0.763672 17.1094 0.763672 22.5015 1.45599 25.0856C1.83707 26.5114 2.96011 27.6345 4.38567 28.0155C6.97028 28.7079 17.333 28.7079 17.333 28.7079C17.333 28.7079 27.6957 28.7079 30.2803 28.0155C31.7062 27.6345 32.8289 26.5114 33.21 25.0856C33.9026 22.5015 33.9026 17.1094 33.9026 17.1094C33.9026 17.1094 33.9026 11.7174 33.21 9.13301Z"
            fill="#ED1F24"
          />
          <path
            d="M14.0195 22.0795L22.6291 17.1086L14.0195 12.1377V22.0795Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_838_4732">
            <rect
              width="33.1921"
              height="33.1921"
              fill="white"
              transform="translate(0.763672 0.53418)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  }
);

YoutubeIcon.displayName = "YoutubeIcon";

export default YoutubeIcon;
