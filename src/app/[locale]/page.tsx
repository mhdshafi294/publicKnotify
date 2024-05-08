"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button onClick={() => toast(t("title"))}>Click me</Button>
      </main>
    </>
  );
}
