import React from "react";
import ContractForm from "../../_components/contract-form";

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
