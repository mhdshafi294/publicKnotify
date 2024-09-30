import React from "react";
import ContractForm from "../_components/contract-form";

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
