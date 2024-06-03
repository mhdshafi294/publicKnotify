import { forwardRef, SVGProps } from "react";

const TriangleToRight = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        <path d="M10 8L0.25 15.3612L0.25 0.638784L10 8Z" fill={color} />
      </svg>
    );
  }
);

TriangleToRight.displayName = "TriangleToRight";

export default TriangleToRight;
