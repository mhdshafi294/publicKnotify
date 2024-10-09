import React from "react";
import ContractForm from "../_components/contract-form";

/**
 * Creates a page component based on the provided parameters and search parameters.
 * @param {Object} param0 - An object containing params and searchParams.
 * @param {Object} param0.params - An object containing the user type.
 * @param {Object} param0.searchParams - An object containing key-value pairs of search parameters.
 * @returns {JSX.Element} A ContractForm component to be rendered on the page.
 */
const CreatePage = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <ContractForm />;
};

export default CreatePage;
