import { forwardRef, SVGProps } from "react";

const TriangleToLeft = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ color, ...props }, ref) => {
    return (
      <svg
        width="10"
        height="16"
        viewBox="0 0 10 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path d="M0 8L9.75 0.638784V15.3612L0 8Z" fill={color} />
      </svg>
    );
  }
);

TriangleToLeft.displayName = "TriangleToLeft";

export default TriangleToLeft;
