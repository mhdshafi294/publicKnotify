import getRequests from "@/services/requests/get-requests";

export const getRequestsAction = async ({
  page = "1",
  count = "12",
  search,
  status,
  type,
}: {
  page?: string;
  count?: string;
  search?: string;
  status?: string;
  type: string;
}) => {
  const getRequestsResponse = await getRequests({
    page,
    count,
    search,
    status,
    type,
  });
  return getRequestsResponse;
};
