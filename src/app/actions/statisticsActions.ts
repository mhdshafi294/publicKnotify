"use server";

import getStatistics from "@/services/statistics/get-statistics";

export const getStatisticsAction = async ({
  start_date,
  end_date,
  day,
  podcat_id,
  type,
}: {
  start_date?: string;
  end_date?: string;
  day?: string;
  podcat_id: string;
  type: string;
}) => {
  return await getStatistics({
    start_date,
    end_date,
    day,
    podcat_id,
    type,
  });
};
