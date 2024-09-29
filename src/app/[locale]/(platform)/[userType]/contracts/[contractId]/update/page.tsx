import React from "react";

const UpdatePage = ({
  params,
  searchParams,
}: {
  params: { userType: string; contractId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <div>UpdatePage</div>;
};

export default UpdatePage;
