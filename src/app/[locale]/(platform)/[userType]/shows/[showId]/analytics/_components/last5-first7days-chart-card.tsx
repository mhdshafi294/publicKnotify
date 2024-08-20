import React from "react";

import DashboardCardContainer from "../../../_components/dashboard-card-container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "date-fns";

type LastFiveFirstSevenDaysChartCardProps = {
  params: { userType: string; showId: string };
  chart: React.ReactNode;
};

const LastFiveFirstSevenDaysChartCard: React.FC<
  LastFiveFirstSevenDaysChartCardProps
> = ({ params, chart }) => {
  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col gap-10 w-full">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold capitalize">
            <span className="opacity-80">5 Latest Episodes</span>
            <br />
            <span className="text-3xl">First 7 Days Since Release</span>
          </h2>
        </div>
      </div>
      <div className="w-full h-80 relative">{chart}</div>
      <Table className="flex-1 shrink-0 grow ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ep #</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Release Date</TableHead>
            <TableHead className="text-right">Days Since Release</TableHead>
            <TableHead className="text-right">Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">S1:E1</TableCell>
            <TableCell>test episode</TableCell>
            <TableCell className="text-right">
              {formatDate(new Date(18, 8, 2024), "PPP")}
            </TableCell>
            <TableCell className="text-right">2</TableCell>
            <TableCell className="text-right">2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DashboardCardContainer>
  );
};

export default LastFiveFirstSevenDaysChartCard;
