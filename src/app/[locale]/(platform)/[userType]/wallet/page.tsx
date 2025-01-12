import { WalletIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";

import { getWalletAction } from "@/app/actions/walletActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";
import WalletAside from "./_components/wallet-aside";
import WalletMain from "./_components/wallet-main";

type WalletPageProps = {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * WalletPage Component
 * Renders the wallet page with user-specific wallet information, displaying main and aside components.
 * Redirects users who are not "podcasters" to the home page.
 *
 * @param {WalletPageProps} props - Component properties.
 * @param {{ userType: string }} props.params - URL parameters, including `userType`.
 * @param {{ [key: string]: string | string[] | undefined }} props.searchParams - URL search parameters.
 * @returns {Promise<JSX.Element>} The rendered WalletPage component.
 */
const WalletPage: React.FC<WalletPageProps> = async ({
  params,
  searchParams,
}) => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Index");

  // Redirect non-podcaster users to the home page
  if (session?.user?.type !== "podcaster") {
    redirect("/");
  }

  // Fetch wallet data based on user type
  const wallet_data = await getWalletAction({
    type: session?.user?.type!,
  });

  return (
    <div className="flex lg:min-h-[calc(100vh-72px)] flex-col flex-1 py-6 lg:py-12">
      <MaxWidthContainer className="flex flex-col md:flex-row md:justify-between gap-5 items-stretch">
        {/* Header for mobile view */}
        <div className="w-full lg:hidden flex justify-center items-center gap-1">
          <WalletIcon size={28} />
          <h2 className="text-3xl font-bold text-center">{t("wallet")}</h2>
        </div>

        {/* Wallet Aside Component */}
        <WalletAside wallet_data={wallet_data} />

        {/* Wallet Main Component */}
        <WalletMain wallet_data={wallet_data} />
      </MaxWidthContainer>
    </div>
  );
};

export default WalletPage;
