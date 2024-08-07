"use client";

import React from "react";
import Image from "next/image";
import Loader from "@/components/ui/loader";

/**
 * Loading component that displays a loading screen with a background image and a loader.
 *
 * @returns {JSX.Element} The loading screen component.
 *
 * @example
 * ```tsx
 * <Loading />
 * ```
 */
const Loading = () => {
  return (
    <div className="h-full min-h-screen w-full flex flex-col items-center justify-center bg-background">
      {/* Background Elements */}
      <div className="absolute overflow-hidden inset-0 h-full min-h-screen w-screen -z-10">
        <div className="absolute inset-0 h-full min-h-screen w-screen overflow-hidden -z-20" />
        <div className="absolute w-[580px] h-[580px] left-0 top-0 -z-10 -translate-x-1/2">
          <div className="absolute w-full h-full left-0 top-0 -z-30 rounded-full bg-primary/50 blur-xl" />
          <div className="absolute w-14 h-14 top-10 right-20 -z-20 rounded-full bg-slate-500 blur-[20px]" />
        </div>
        <div className="absolute top-0 right-0 w-[340px] h-[340px] -z-20 blur-lg">
          <Image
            className="opacity-50"
            src="/auth-r-bg.svg"
            alt="background logo"
            layout="fill"
          />
        </div>
      </div>
      {/* Loader Component */}
      <Loader variant="bars" size="xl" className="text-greeny" />
    </div>
  );
};

export default Loading;
