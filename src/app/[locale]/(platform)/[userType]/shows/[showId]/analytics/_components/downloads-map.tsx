"use client";

import React, { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const geoUrl = "/world-countries.json";

const colorScale = scaleLinear<string>()
  .domain([0, 11])
  .range(["#f0f0f0", "#2662d9"]);

interface DownloadData {
  country: string;
  count: number;
}

/**
 * Functional component that displays a map of downloads.
 * @param {Object} downloads - An array of DownloadData objects representing the downloads.
 * @param {Array<DownloadData>} downloads - An array of DownloadData objects representing the downloads.
 * @returns {JSX.Element} - A map component displaying the downloads.
 */
export default function DownloadsMap({
  downloads = [],
}: {
  downloads?: DownloadData[];
}) {
  const t = useTranslations("Index");
  const [activeCountry, setActiveCountry] = useState<DownloadData | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const getDownloadCount = useCallback(
    (countryName: string) => {
      if (!downloads || downloads.length === 0) return 0;
      const country = downloads.find((d) => d.country === countryName);
      return country ? country.count : 0;
    },
    [downloads]
  );

  if (!downloads || downloads.length === 0) {
    return (
      <Card className="relative w-full h-[600px] overflow-hidden dark:bg-[#040a1b] rounded-xl border-none flex items-center justify-center">
        <CardContent>
          <p className="text-white text-lg">
            {t("no-download-data-available")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative w-full h-[600px] overflow-hidden dark:bg-[#040a1b] rounded-xl border-none">
      <CardContent className="p-0">
        <ComposableMap projection="geoMercator">
          <ZoomableGroup center={[0, 680]} zoom={0.85}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const count = getDownloadCount(geo.properties.name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={colorScale(count)}
                      stroke="#D6D6DA"
                      strokeWidth={0.5}
                      onMouseEnter={(event) => {
                        const { clientX, clientY } = event;
                        setHoverPosition({ x: clientX, y: clientY });
                        setActiveCountry({
                          country: geo.properties.name,
                          count: count,
                        });
                      }}
                      onMouseLeave={() => {
                        setActiveCountry(null);
                      }}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#2662d9" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {activeCountry && (
          <HoverCard open={true}>
            <HoverCardTrigger asChild>
              <div
                style={{
                  position: "fixed",
                  left: hoverPosition.x,
                  top: hoverPosition.y,
                  width: 1,
                  height: 1,
                }}
              />
            </HoverCardTrigger>
            <HoverCardContent
              className="w-fit border-border-secondary pe-10 py-1.5 opacity-90"
              side="right"
            >
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold gap-3 flex items-center">
                    <div className="size-2 bg-primary rounded-full" />
                    {activeCountry.country}
                  </h4>
                  <p className="text-sm gap-2 flex items-center ms-5">
                    <span className="font-semibold">{activeCountry.count}</span>
                    <span className="capitalize text-xs opacity-75">
                      {t("downloads")}
                    </span>
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </CardContent>
    </Card>
  );
}
