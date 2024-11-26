import { forwardRef, SVGProps } from "react";

const AppleIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ color, ...props }, ref) => {
    return (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <g clip-path="url(#clip0_519_10674)">
          <path
            d="M18.7383 0H5.36138C2.40037 0 0 2.40037 0 5.36138V18.7383C0 21.6993 2.40037 24.0997 5.36138 24.0997H18.7383C21.6993 24.0997 24.0997 21.6993 24.0997 18.7383V5.36138C24.0997 2.40037 21.6993 0 18.7383 0Z"
            fill="url(#paint0_linear_519_10674)"
          />
          <path
            d="M11.3137 21.098C10.5947 20.8409 10.4404 20.4914 10.1456 18.4438C9.8026 16.0635 9.72789 14.5902 9.92632 14.1235C10.1898 13.5049 10.9048 13.1539 11.9049 13.1499C12.897 13.1458 13.6184 13.5001 13.8835 14.1235C14.0827 14.5894 14.008 16.0635 13.665 18.4438C13.432 20.1066 13.3035 20.5268 12.9822 20.8096C12.5403 21.2008 11.9137 21.3092 11.3193 21.0988L11.3137 21.098ZM8.24255 18.6558C5.76028 17.4348 4.1697 15.3686 3.5913 12.6197C3.4467 11.9103 3.4226 10.2177 3.55917 9.56704C3.92067 7.81981 4.61152 6.45336 5.76028 5.24516C7.41512 3.50034 9.54393 2.57812 11.9137 2.57812C14.2594 2.57812 16.3802 3.48347 17.9949 5.17607C19.224 6.45336 19.9148 7.80535 20.2683 9.58632C20.3888 10.1792 20.3888 11.7955 20.2763 12.4622C19.9068 14.5701 18.734 16.4901 17.0229 17.7802C16.4124 18.2413 14.9182 19.0463 14.6772 19.0463C14.5888 19.0463 14.5808 18.9547 14.6209 18.5844C14.6932 17.9899 14.7655 17.8662 15.1029 17.7248C15.6412 17.4999 16.557 16.8476 17.1193 16.2836C18.0913 15.3196 18.8063 14.0584 19.1356 12.7329C19.3445 11.9055 19.3204 10.0659 19.0874 9.21438C18.3564 6.50718 16.1473 4.40247 13.4401 3.84015C12.6528 3.67948 11.2229 3.67948 10.4276 3.84015C7.68825 4.40247 5.42288 6.61161 4.73202 9.39111C4.54726 10.1462 4.54726 11.9858 4.73202 12.741C5.18992 14.5806 6.37884 16.2676 7.93728 17.2717C8.24255 17.4726 8.61208 17.6814 8.76471 17.7457C9.10211 17.8903 9.1744 18.0108 9.23867 18.6052C9.27884 18.9667 9.2708 19.0712 9.18244 19.0712C9.1262 19.0712 8.71651 18.8944 8.28271 18.6856L8.24255 18.6558ZM8.27468 15.3879C7.43922 14.7212 6.70017 13.5387 6.3949 12.3787C6.21014 11.6782 6.21014 10.3463 6.40294 9.64737C6.90903 7.76117 8.29878 6.29912 10.2268 5.61228C10.8855 5.37932 12.3475 5.3271 13.1589 5.50624C15.9545 6.12882 17.9387 8.9284 17.5531 11.7055C17.4004 12.8245 17.0148 13.7435 16.332 14.5975C15.9946 15.0288 15.1752 15.7526 15.0306 15.7526C15.0065 15.7526 14.9824 15.4795 14.9824 15.1469V14.5396L15.4002 14.0416C16.9747 12.1554 16.8622 9.52045 15.1431 7.7917C14.4763 7.11851 13.7052 6.72328 12.709 6.54092C12.0664 6.42203 11.9298 6.42203 11.255 6.53289C10.2308 6.69998 9.43709 7.09682 8.73258 7.79411C7.00543 9.50519 6.89296 12.1537 8.46748 14.0416L8.88199 14.5396V15.1501C8.88199 15.4875 8.85548 15.7607 8.82255 15.7607C8.79042 15.7607 8.55745 15.6 8.30842 15.3992L8.27468 15.3879ZM11.0622 12.108C10.3473 11.7754 9.96166 11.148 9.95363 10.3302C9.95363 9.59516 10.3633 8.95411 11.0702 8.57895C11.5201 8.34278 12.3154 8.34278 12.7653 8.58056C13.2553 8.83521 13.657 9.32926 13.8096 9.84499C14.2755 11.4291 12.5966 12.8173 11.0783 12.108H11.0622Z"
            fill="white"
          />
          <path
            d="M12.0426 12.4201C13.1491 12.4201 14.046 11.5231 14.046 10.4166C14.046 9.31008 13.1491 8.41309 12.0426 8.41309C10.9361 8.41309 10.0391 9.31008 10.0391 10.4166C10.0391 11.5231 10.9361 12.4201 12.0426 12.4201Z"
            fill="white"
          />
          <path
            d="M12.2316 13.1963C12.3706 13.2148 12.6469 13.2509 12.9024 13.3329C13.1594 13.4132 13.3924 13.5393 13.5739 13.6686C13.7507 13.7972 13.8792 13.9305 13.9595 14.0928C14.0399 14.2551 14.08 14.4479 14.1041 14.7636C14.1202 15.0801 14.1202 15.5187 14.0479 16.3381C13.9756 17.1551 13.831 18.3528 13.7185 19.12C13.6061 19.8912 13.5257 20.2286 13.4213 20.4776C13.3169 20.7347 13.1803 20.9034 13.0277 21.0239C12.875 21.1444 12.6983 21.2167 12.5296 21.2568C12.3609 21.297 12.2083 21.297 12.0637 21.297C11.9191 21.297 11.7825 21.297 11.5978 21.2568C11.413 21.2167 11.172 21.1444 10.9953 20.9998C10.8105 20.8552 10.69 20.6463 10.5936 20.3732C10.4972 20.1 10.4249 19.7707 10.3285 19.112C10.2321 18.4532 10.1036 17.4732 10.0232 16.7261C9.94291 15.979 9.91078 15.4649 9.90435 15.1194C9.89632 14.774 9.91239 14.6029 9.95255 14.4366C9.99272 14.276 10.057 14.1233 10.1453 13.9948C10.2337 13.8663 10.3494 13.7538 10.4667 13.6654C10.5816 13.5771 10.6996 13.5128 10.841 13.463C10.9808 13.4068 11.1487 13.3586 11.3552 13.3184C11.564 13.2782 11.805 13.2381 11.9287 13.222C12.0524 13.2035 12.0524 13.2035 12.1906 13.222L12.2316 13.1963Z"
            fill="white"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_519_10674"
            x1="12.025"
            y1="24.4058"
            x2="11.8209"
            y2="-1.12969e-06"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#822CBE" />
            <stop offset="1" stopColor="#D772FB" />
          </linearGradient>
          <clipPath id="clip0_519_10674">
            <rect width="24.0997" height="24.0997" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);

AppleIcon.displayName = "AppleIcon";

export default AppleIcon;
