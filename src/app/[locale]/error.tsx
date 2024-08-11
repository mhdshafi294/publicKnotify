"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Error component that displays an error message and a button to navigate to the home page.
 *
 * @param {object} props - The properties passed to the component.
 * @param {Error & { digest?: string }} props.error - The error object containing the error details.
 * @param {() => void} props.reset - The function to reset the error state.
 * @returns {JSX.Element} The error screen component.
 *
 * @example
 * ```tsx
 * <Error error={new Error("An unexpected error occurred")} reset={() => {}} />
 * ```
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Index");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="relative h-full min-h-screen w-full flex flex-col items-center justify-center bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="absolute w-[580px] h-[580px] left-0 top-0 -translate-x-1/2">
          <div className="absolute w-full h-full left-0 top-0 rounded-full bg-primary/50 blur-xl" />
          <div className="absolute w-14 h-14 top-10 right-20 rounded-full bg-slate-500 blur-[20px]" />
        </div>
        <div className="absolute top-0 right-0 w-[340px] h-[340px] blur-lg">
          <Image
            className="opacity-50"
            src="/auth-r-bg.svg"
            alt="background logo"
            layout="fill"
          />
        </div>
      </div>
      {/* Error Content */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/error.svg" // Path to your error SVG
          alt="Error illustration"
          width={50}
          height={50}
        />
        <h1 className="text-6xl font-extrabold text-primary drop-shadow-lg my-4">
          {t("errorTitle")}
        </h1>
        <p className="text-lg text-gray-700 mb-6 drop-shadow-md">
          {t("errorMessage")}
        </p>
        <Button
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-transform transform hover:scale-105"
          onClick={() => router.push("/")}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
