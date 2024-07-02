// app/error/page.tsx
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/navigation";
import { LucideAlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ErrorPage() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="h-full min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 h-full min-h-screen w-screen -z-10">
        <div className="absolute inset-0 h-full min-h-screen w-screen overflow-hidden -z-20" />
        <div className="absolute size-[580px] left-0 top-0 -z-10 -translate-x-1/2">
          <div className="absolute size-full left-0 top-0 -z-30 rounded-full bg-primary/50 blur-xl" />
          <div className="absolute size-14 top-10 right-20 -z-20 rounded-full bg-slate-500 blur-[20px]" />
        </div>
        <div className="absolute top-0 right-0 size-[340px] -z-20 blur-lg">
          <Image className="opacity-50" src="/auth-r-bg.svg" alt="logo" fill />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
          <Alert variant="destructive">
            <LucideAlertTriangle className="w-6 h-6 mr-2 text-red-600" />
            <AlertTitle>Error 404</AlertTitle>
            <AlertDescription>
              The page you are looking for does not exist.
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => router.push(`/${session?.user?.type}`)}
            className="w-full mt-4"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
