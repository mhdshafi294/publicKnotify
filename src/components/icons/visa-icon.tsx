import { forwardRef, SVGProps } from "react";

const VisaIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ color, ...props }, ref) => {
    return (
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 141.732 141.732"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <g fill="#2566af">
          <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z" />
        </g>

        <path
          d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z"
          fill="#e6a540"
        />

        <path fill="none" d="M0 0h141.732v141.732H0z" />
      </svg>
    );
  }
);

VisaIcon.displayName = "VisaIcon";

export default VisaIcon;
