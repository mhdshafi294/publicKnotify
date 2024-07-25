import { forwardRef, SVGProps } from "react";

const YoutubeActiveAccountIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(({ color, ...props }, ref) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <rect width="41.9986" height="41.9986" rx="3" fill="#FFECE8" />
      <path
        d="M32.6806 15.2226C32.4064 14.1917 31.5952 13.3785 30.5631 13.0998C28.697 12.5996 21.2098 12.5996 21.2098 12.5996C21.2098 12.5996 13.7265 12.5996 11.8566 13.0998C10.8283 13.3747 10.0171 14.1879 9.73913 15.2226C9.24023 17.0935 9.24023 20.9993 9.24023 20.9993C9.24023 20.9993 9.24023 24.9052 9.73913 26.7761C10.0133 27.8069 10.8245 28.6202 11.8566 28.8989C13.7265 29.3991 21.2098 29.3991 21.2098 29.3991C21.2098 29.3991 28.697 29.3991 30.5631 28.8989C31.5914 28.624 32.4025 27.8107 32.6806 26.7761C33.1794 24.9052 33.1794 20.9993 33.1794 20.9993C33.1794 20.9993 33.1794 17.0935 32.6806 15.2226Z"
        fill="#FF3000"
      />
      <path
        d="M18.8182 24.5998L25.0372 20.9993L18.8182 17.3989V24.5998Z"
        fill="white"
      />
    </svg>
  );
});

YoutubeActiveAccountIcon.displayName = "Star";

export default YoutubeActiveAccountIcon;
