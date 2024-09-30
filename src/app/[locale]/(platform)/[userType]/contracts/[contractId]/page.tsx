import { getContractAction } from "@/app/actions/contractActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import React from "react";
import ContractPageCard from "../_components/contract-page-card";

const ContractPage = async ({
  params,
}: {
  params: { userType: string; contractId: string };
}) => {
  if (/^\d+$/.test(params.contractId)) {
    // Fetching the current session using NextAuth's getServerSession
    const session = await getServerSession(authOptions);

    // Fetch translations for the "Index" namespace
    const t = await getTranslations("Index");

    const contract = await getContractAction({
      type: session?.user?.type!,
      id: params.contractId,
    });

    const secondPartyData = {
      name: contract?.company
        ? contract?.company?.full_name
        : contract?.podcaster?.full_name!,
      image: contract?.company
        ? contract?.company?.image
        : contract?.podcaster?.image!,
    };

    return (
      <MaxWidthContainer className="py-10 flex-1 flex flex-col">
        <ContractPageCard
          id={contract?.id}
          status_translation={contract?.status_translation}
          request_name={contract?.request_name}
          secondPartyData={secondPartyData}
          description={contract?.description}
          media_type={contract?.media_type}
          ad_place={contract?.ad_place}
          ad_period={contract?.ad_period}
          ad_cost={contract?.ad_cost}
          publishing_date={contract?.publishing_date}
          publishing_time={contract?.publishing_time}
          episode_type_translation={contract?.episode_type_translation}
          created_at={contract?.created_at}
          session={session!}
        />
      </MaxWidthContainer>
    );
  }
};

export default ContractPage;
