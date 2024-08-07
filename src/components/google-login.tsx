import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

/**
 * GoogleLogin component that renders a button for signing in with Google.
 *
 * @returns {JSX.Element} The Google sign-in button component.
 *
 * @example
 * ```tsx
 * <GoogleLogin />
 * ```
 */
export const GoogleLogin = () => {
  return (
    <Button
      type="button"
      onClick={() => signIn("google")}
      variant="default"
      size={"icon"}
      className="bg-transparent hover:bg-transparent size-7"
    >
      {/* Google Icon SVG */}
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_190_16527)">
          <path
            d="M28.0953 14.2304C28.0953 13.0985 28.0013 12.2725 27.7979 11.416H14.5703V16.5246H22.3346C22.1781 17.7942 21.3328 19.7061 19.4543 20.9909L19.428 21.1619L23.6103 24.3277L23.9 24.3559C26.5611 21.9545 28.0953 18.4213 28.0953 14.2304Z"
            fill="#004FFF"
          />
          <path
            d="M14.5702 27.6898C18.374 27.6898 21.5674 26.4661 23.8999 24.3554L19.4541 20.9903C18.2645 21.801 16.6677 22.3669 14.5702 22.3669C10.8445 22.3669 7.68248 19.9656 6.55529 16.6465L6.39007 16.6602L2.04125 19.9487L1.98438 20.1032C4.30113 24.6 9.05993 27.6898 14.5702 27.6898Z"
            fill="#34A853"
          />
          <path
            d="M6.5551 16.6467C6.25768 15.7902 6.08556 14.8724 6.08556 13.9241C6.08556 12.9757 6.25768 12.058 6.53945 11.2015L6.53158 11.0191L2.12825 7.67773L1.98418 7.74469C1.02934 9.61076 0.481445 11.7063 0.481445 13.9241C0.481445 16.1419 1.02934 18.2373 1.98418 20.1034L6.5551 16.6467Z"
            fill="#FBBC05"
          />
          <path
            d="M14.5702 5.48097C17.2156 5.48097 19.0001 6.59753 20.0177 7.53062L23.9938 3.73733C21.5518 1.5195 18.374 0.158203 14.5702 0.158203C9.05993 0.158203 4.30113 3.24785 1.98438 7.74467L6.53964 11.2015C7.68248 7.88239 10.8445 5.48097 14.5702 5.48097Z"
            fill="#EB4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_190_16527">
            <rect
              width="27.6267"
              height="27.6267"
              fill="white"
              transform="translate(0.481445 0.158203)"
            />
          </clipPath>
        </defs>
      </svg>
    </Button>
  );
};
