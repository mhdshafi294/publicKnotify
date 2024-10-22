"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlatformCounter } from "@/types/statistics";
import React from "react";

type MostPlatformTableProps = {
  platformsDownloads: PlatformCounter[];
  totalCount: number;
};

/**
 * PlatformTable component displays a table with platform download statistics.
 *
 * @param {MostPlatformTableProps} props - The props for the component.
 * @param {PlatformCounter[]} props.platformsDownloads - An array of objects representing each platform and its download count.
 * @param {number} props.totalCount - The total count of downloads across all platforms.
 *
 * @returns {JSX.Element} The rendered PlatformTable component.
 */
export default function MostPlatformTable({
  platformsDownloads,
  totalCount,
}: MostPlatformTableProps) {
  return (
    <Table className="w-full text-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead className="text-right">Downloads</TableHead>
          <TableHead className="text-right">%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {platformsDownloads.map((platform, index) => {
          const percentage = (platform.count / totalCount) * 100;
          return (
            <TableRow
              key={platform.platform}
              className="relative"
              style={
                {
                  "--row-bg-width": `${percentage}%`,
                } as React.CSSProperties
              }
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{platform.platform}</TableCell>
              <TableCell className="text-right font-bold">
                {platform.count}
              </TableCell>
              <TableCell className="text-right font-bold">
                {percentage.toFixed(0)}%
              </TableCell>
              <div
                className="absolute left-0 top-0 h-full bg-primary/20 z-0"
                style={{ width: "var(--row-bg-width)" }}
              />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
