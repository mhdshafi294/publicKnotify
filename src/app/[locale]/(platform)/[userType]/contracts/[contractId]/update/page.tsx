import React from "react";
import ContractForm from "../../_components/contract-form";

/**
 * Update the page based on the provided parameters and search parameters.
 * @param {Object} params - An object containing the parameters userType and contractId.
 * @param {Object} searchParams - An object containing search parameters.
 * @returns {JSX.Element} - A ContractForm component with the contract_id set to params.contractId.
 */
const UpdatePage = ({
  params,
  searchParams,
}: {
  params: { userType: string; contractId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <ContractForm contract_id={params.contractId} />;
};

export default UpdatePage;
