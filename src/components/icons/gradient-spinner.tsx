import { forwardRef, SVGProps } from "react";

const GradientSpinnerIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ color, ...props }, ref) => {
    return (
      <svg
        width="267"
        height="267"
        viewBox="0 0 267 267"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="133.306"
          cy="133.435"
          r="133.294"
          fill="url(#paint0_angular_2113_19676)"
        />
        <defs>
          <radialGradient
            id="paint0_angular_2113_19676"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(133.306 133.435) rotate(90) scale(133.294)"
          >
            <stop stopColor="#0079F3" />
            <stop offset="1" stopColor="#001D3A" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );
  }
);

GradientSpinnerIcon.displayName = "GradientSpinnerIcon";

export default GradientSpinnerIcon;
