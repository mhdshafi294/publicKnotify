"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TabsTrigger as ShadcnTabsTrigger } from "@/components/ui/tabs";

const updateSearchParams = (param: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.pushState({}, "", url.toString());
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const CustomTabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  ...props
}) => {
  const router = useRouter();

  const handleClick = () => {
    updateSearchParams("tab", value);
  };

  return (
    <ShadcnTabsTrigger value={value} onClick={handleClick} {...props}>
      {children}
    </ShadcnTabsTrigger>
  );
};

export default CustomTabsTrigger;
