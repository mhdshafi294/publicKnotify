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
    <div className="h-[calc(100vh-72px)] w-screen overflow-hidden flex flex-col items-center justify-center bg-background">
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
            fill
          />
        </div>
      </div>
      {/* Loader Component */}
      {/* <Loader variant="bars" size="xl" className="text-greeny" /> */}
      <div className="loading-text flex items-center gap-2 text-greeny text-9xl font-sans">
        <span className="loading-text-words animate-blur-1 blur-lg">
          <Image
            src="/KnotifyK.svg"
            alt="Knotify logo"
            width={73}
            height={21}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className=" object-cover"
          />
        </span>
        <span className="loading-text-words animate-blur-2 blur">n</span>
        <span className="loading-text-words animate-blur-3 blur">o</span>
        <span className="loading-text-words animate-blur-4 blur">t</span>
        <span className="loading-text-words animate-blur-5 blur">i</span>
        <span className="loading-text-words animate-blur-6 blur">f</span>
        <span className="loading-text-words animate-blur-7 blur">y</span>
      </div>
    </div>
  );
};

export default Loading;
