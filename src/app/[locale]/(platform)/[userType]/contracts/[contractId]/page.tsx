import { getContractAction } from "@/app/actions/contractActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import ContractPageCard from "../_components/contract-page-card";

/**
 * Renders the ContractPage component based on the provided parameters.
 * @param {Object} params - An object containing the parameters for the page.
 * @param {string} params.userType - The type of user accessing the page.
 * @param {string} params.contractId - The ID of the contract being viewed.
 * @returns None
 */
const ContractPage = async ({
  params,
}: {
  params: { locale: string; userType: string; contractId: string };
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
      name:
        "company" in contract
          ? contract?.company?.full_name
          : contract?.podcaster?.full_name!,
      image:
        "company" in contract
          ? contract?.company?.image
          : contract?.podcaster?.image!,
    };

    return (
      <MaxWidthContainer className="py-10 flex-1 flex flex-col">
        <ContractPageCard
          id={contract?.id}
          status_translation={contract?.status_translation}
          status_code={contract?.status}
          secondPartyData={secondPartyData}
          description={contract?.description}
          media_type={contract?.media_type}
          ad_place={
            contract?.advertising_section?.name[params.locale as "en" | "ar"]
          }
          ad_type={
            contract?.advertising_section?.type?.name[
              params.locale as "en" | "ar"
            ]
          }
          ad_period={contract?.ad_period}
          ad_cost={contract?.ad_cost}
          publishing_date={contract?.publishing_date}
          publishing_time={contract?.publishing_time}
          created_at={contract?.created_at}
          session={session!}
        />
      </MaxWidthContainer>
    );
  }
};

export default ContractPage;
