import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";

/**
 * AppleLogin component that renders a button for signing in with Apple.
 *
 * @returns {JSX.Element} The Apple sign-in button component.
 *
 * @example
 * ```tsx
 * <AppleLogin />
 * ```
 */
export const AppleLogin = () => {
  const { theme } = useTheme();
  return (
    <Button
      type="button"
      onClick={() => signIn("apple")}
      variant="default"
      size={"icon"}
      className="bg-transparent hover:bg-transparent size-7"
    >
      {/* Apple Icon SVG */}
      <svg
        width="26"
        height="28"
        viewBox="0 0 26 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_190_16525)">
          <path
            d="M21.0316 26.6765C19.4697 28.1343 17.7643 27.9041 16.1227 27.2136C14.3855 26.5076 12.7917 26.4769 10.9588 27.2136C8.66372 28.165 7.45243 27.8888 6.08176 26.6765C-1.69599 18.9573 -0.548454 7.20211 8.28121 6.77242C10.4328 6.87984 11.931 7.90804 13.1901 8.00011C15.0708 7.63181 16.8718 6.57292 18.88 6.71103C21.2866 6.89519 23.1036 7.81596 24.2989 9.47335C19.3263 12.3431 20.5057 18.6504 25.064 20.4152C24.1555 22.7171 22.9761 25.0037 21.0157 26.6918L21.0316 26.6765ZM13.0307 6.68034C12.7917 3.25814 15.6765 0.434435 18.9916 0.158203C19.4538 4.11752 15.2621 7.064 13.0307 6.68034Z"
            className="fill-black dark:fill-white"
          />
        </g>
        <defs>
          <clipPath id="clip0_190_16525">
            <rect
              width="24.1733"
              className="fill-black dark:fill-white"
              height="27.6267"
              transform="translate(0.890625 0.158203)"
            />
          </clipPath>
        </defs>
      </svg>
    </Button>
  );
};
