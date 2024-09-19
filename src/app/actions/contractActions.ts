"use server";

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

export const getContractsAction = async ({ type }: { type: string }) => {
  return await getContracts({ type });
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
