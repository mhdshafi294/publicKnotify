"use server";

import contractPayment from "@/services/contract/contract-payment";
import createContract from "@/services/contract/create-contract";
import getContract from "@/services/contract/get-contract";
import getContracts from "@/services/contract/get-contracts";
import updateContract from "@/services/contract/update-contract";

/**
 * Asynchronously retrieves a contract action based on the provided type and id.
 * @param {object} param0 - An object containing the type and id of the contract action.
 * @param {string} param0.type - The type of the contract action.
 * @param {string} param0.id - The id of the contract action.
 * @returns {Promise} A promise that resolves to the contract action.
 */
export const getContractAction = async ({
  type,
  id,
}: {
  type: string;
  id: string;
}) => {
  return await getContract({ type, id });
};

/**
 * Retrieves a list of contracts based on the provided parameters.
 * @param {Object} options - An object containing the parameters for filtering the contracts.
 * @param {string} [options.page="1"] - The page number of the results.
 * @param {string} [options.count="21"] - The number of contracts to retrieve per page.
 * @param {string} options.search - The search query to filter contracts.
 * @param {string} options.company_request_id - The ID of the company requesting the contracts.
 * @param {string} options.company_id - The ID of the company associated with the contracts.
 * @param {string} options.podcaster_id - The ID of the podcaster associated with the
 */
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

/**
 * Creates a contract action asynchronously using the provided form data and type.
 * @param {Object} param0 - An object containing formData and type properties.
 * @param {FormData} param0.formData - The form data to be used in creating the contract.
 * @param {string} param0.type - The type of contract to be created.
 * @returns {Promise} A promise that resolves with the created contract.
 */
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

/**
 * Asynchronously updates a contract action with the provided form data, type, and id.
 * @param {Object} param0 - An object containing the form data, type, and id of the contract action.
 * @param {FormData} param0.formData - The form data to update the contract action with.
 * @param {string} param0.type - The type of the contract action.
 * @param {string} param0.id - The id of the contract action.
 * @returns {Promise} A promise that resolves when the contract action is successfully updated.
 */
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

/**
 * Perform a payment action on a contract asynchronously.
 * @param {Object} param0 - An object containing the type and id of the contract.
 * @param {string} param0.type - The type of the contract.
 * @param {string} param0.id - The ID of the contract.
 * @returns {Promise} A promise that resolves with the result of the payment action.
 */
export const contractPaymentAction = async ({
  type,
  id,
}: {
  type: string;
  id: string;
}) => {
  return await contractPayment({ type, id });
};
