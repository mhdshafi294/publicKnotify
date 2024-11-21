"use client";

import React, { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  ZoomableGroupProps,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTranslations } from "next-intl";

const geoUrl = "/world-countries.json";
const usStatesUrl = "/us-states.json";

type DownloadData = {
  name: string;
  count: number;
  subRegions?: DownloadData[];
};

type MapChartProps = {
  downloads: DownloadData[];
};

export default function MapChart({ downloads }: MapChartProps) {
  const t = useTranslations("Index");
  const [activeRegion, setActiveRegion] = useState<DownloadData | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: [0, 0], zoom: 1 });

  const colorScale = useMemo(
    () =>
      scaleQuantile<string>()
        .domain(downloads.map((d) => d.count))
        .range(["#f0f0f0", "#2662d9"]),
    [downloads]
  );

  const handleZoomEnd: ZoomableGroupProps["onMoveEnd"] = (event) => {
    setPosition(event);
  };

  const visibleRegions = useMemo(() => {
    if (position.zoom < 4) return downloads;
    const country = downloads.find((d) => d.subRegions);
    return country ? country.subRegions || [] : [];
  }, [downloads, position.zoom]);

  if (!downloads || downloads.length === 0) {
    return (
      <Card className="relative w-full overflow-hidden dark:bg-[#040a1b] rounded-xl border-none flex items-center justify-center">
        <CardContent>
          <p className="text-white text-lg">
            {t("no-download-data-available")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative w-full overflow-hidden dark:bg-[#040a1b] rounded-xl border-none">
      <CardContent className="p-0">
        <ComposableMap projection="geoMercator">
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleZoomEnd}
          >
            <Geographies geography={position.zoom >= 4 ? usStatesUrl : geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const region = visibleRegions.find(
                    (d) => d.name === geo.properties.name
                  );
                  const count = region ? region.count : 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={colorScale(count)}
                      stroke="#D6D6DA"
                      strokeWidth={0.5}
                      onMouseEnter={(event) => {
                        const { clientX, clientY } = event.nativeEvent;
                        setHoverPosition({ x: clientX, y: clientY });
                        setActiveRegion({
                          name: geo.properties.name,
                          count: count,
                        });
                      }}
                      onMouseLeave={() => {
                        setActiveRegion(null);
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
        {activeRegion && (
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
                    {activeRegion.name}
                  </h4>
                  <p className="text-sm gap-2 flex items-center ms-5">
                    <span className="font-semibold">{activeRegion.count}</span>
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
