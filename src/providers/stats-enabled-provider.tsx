"use client";

import useEnableStatsStore from "@/store/use-stats-enable-store";
import { EnabledStatistics } from "@/types/statistics";
import { useEffect } from "react";

export function StatsEnabledProvider({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: EnabledStatistics;
}) {
  const setEnabled = useEnableStatsStore((state) => state.setEnabled);

  useEffect(() => {
    setEnabled(enabled);
  }, [enabled, setEnabled]);

  return <>{children}</>;
}
