"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
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
        <Button onClick={() => toast("Hello, Sonner!")}>Click me</Button>
      </main>
    </>
  );
}
