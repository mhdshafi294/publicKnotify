"use server";

import contractPayment from "@/services/contract/contract-payment";
import createContract from "@/services/contract/create-contract";
import getContract from "@/services/contract/get-contract";
import getContracts from "@/services/contract/get-contracts";
import updateContract from "@/services/contract/update-contract";

export const getContractAction = async ({
  type,
  id,
}: {
  type: string;
  id: string;
}) => {
  return await getContract({ type, id });
};

export const getContractsAction = async ({
  page = "1",
  count = "21",
  search,
  company_request_id,
  company_id,
  podcaster_id,
  status,
  type,
}: {
  page?: string;
  count?: string;
  search?: string;
  company_request_id?: string;
  company_id?: string;
  podcaster_id?: string;
  status?: string;
  type: string;
}) => {
  return await getContracts({
    page,
    count,
    search,
    company_request_id,
    company_id,
    podcaster_id,
    status,
    type,
  });
};

export const createContractAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await createContract({
    formData,
    type,
  });
};

export const updateContractAction = async ({
  formData,
  type,
  id,
}: {
  formData: FormData;
  type: string;
  id: string;
}) => {
  return await updateContract({
    formData,
    type,
    id,
  });
};

export const contractPaymentAction = async ({
  type,
  id,
}: {
  type: string;
  id: string;
}) => {
  return await contractPayment({ type, id });
};
