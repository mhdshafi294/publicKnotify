"use server";

import cancelRequest from "@/services/requests/cancel-status";
import changeRequestStatus from "@/services/requests/change-status";
import createRequest from "@/services/requests/create-request";
import getRequest from "@/services/requests/get-request";
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

export const getRequestAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const getRequestsResponse = await getRequest({
    id,
    type,
  });
  return getRequestsResponse;
};

export const changeRequestStatusAction = async ({
  id,
  status,
  type,
}: {
  id: string;
  status: string;
  type: string;
}) => {
  const getRequestsResponse = await changeRequestStatus({
    id,
    status,
    type,
  });
  return getRequestsResponse;
};

export const cancelRequestAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const getRequestsResponse = await cancelRequest({
    id,
    type,
  });
  return getRequestsResponse;
};

export const createRequestAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const createRequestResponse = await createRequest({ formData, type });
  return createRequestResponse;
};
