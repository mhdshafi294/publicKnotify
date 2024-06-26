import React from "react";

interface SpotifyIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyIcon: React.FC<SpotifyIconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 168 168"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <circle cx="84" cy="84" r="84" fill="#1DB95400" />
    <path
      fill="currentColor"
      d="M84 12C44.6 12 12 44.6 12 84s32.6 72 72 72 72-32.6 72-72S123.4 12 84 12zm34.7 104.1c-1.5 2.4-4.7 3.2-7.1 1.8-19.7-12.1-44.5-14.9-73.3-7.8-2.6.6-5.3-.9-6-3.5-.6-2.6.9-5.3 3.5-6 31.4-7.6 58.5-4.7 80.4 8.8 2.4 1.4 3.2 4.7 1.8 7.1zm9.6-22.7c-1.8 2.9-5.7 3.9-8.7 2.2-22.2-13.1-56.2-17.1-82.8-9-3 .9-6.2-.8-7.1-3.8-.9-3 .8-6.2 3.8-7.1 30.4-9.2 68.6-4.8 94 10.2 2.9 1.7 3.9 5.7 2.2 8.7zm1-21.8c-26.5-15.9-70.7-17.4-96-9.2-3.5 1.1-7.3-.8-8.4-4.4-1.1-3.5.8-7.3 4.4-8.4 28.8-9 77.1-7.2 106.3 10.4 3.5 2.1 4.6 6.7 2.5 10.2-2.1 3.5-6.7 4.6-10.2 2.5z"
    />
  </svg>
);

export default SpotifyIcon;
