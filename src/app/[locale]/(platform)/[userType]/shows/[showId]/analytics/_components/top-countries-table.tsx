"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import React from "react";
import DashboardCardContainer from "../../../_components/dashboard-card-container";

type TopCountriesTableProps = {
  top_countries: { country: string; count: number }[];
  total_count: number;
};

/**
 * TopCountriesTable component displays a table with the top countries and their download counts.
 *
 * @param {TopCountriesTableProps} props - The props for the component.
 * @param {Array} props.top_countries - An array of objects representing each country and its count.
 * @param {number} props.total_count - The total count of downloads across all countries.
 *
 * @returns {JSX.Element} The rendered TopCountriesTable component.
 */
export default function TopCountriesTable({
  top_countries,
  total_count,
}: TopCountriesTableProps) {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="flex-1 h-fit flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase opacity-70">
            {t("all-times")}
          </h2>
          <p className="font-bold text-3xl">{t("top-countries")}</p>
        </div>
      </div>
      <Table className="flex-1 shrink-0 grow w-full text-lg">
        <TableHeader className="w-full">
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>{t("country")}</TableHead>
            <TableHead className="text-right">{t("downloads")}</TableHead>
            <TableHead className="text-right">%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {top_countries.map((country, index) => (
            <TableRow
              key={country.country}
              className="relative"
              style={
                {
                  "--row-bg-width": `${(country.count / total_count) * 100}%`,
                } as React.CSSProperties
              }
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{country.country}</TableCell>
              <TableCell className="text-right font-bold">
                {country.count}
              </TableCell>
              <TableCell className="text-right font-bold">
                {((country.count / total_count) * 100).toFixed(0)}%
              </TableCell>
              <div
                className="absolute left-0 top-0 h-full bg-primary/20 z-0"
                style={{ width: "var(--row-bg-width)" }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCardContainer>
  );
}
