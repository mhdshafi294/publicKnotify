import { getWalletAction } from "@/app/actions/walletActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import ProfileCardImageAndName from "../profile/_components/profile-card-image-and-name";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import WalletAside from "./_components/wallet-aside";
import WalletMain from "./_components/wallet-main";
import { getTranslations } from "next-intl/server";
import { WalletIcon } from "lucide-react";

type WalletPageProps = {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const WalletPage: React.FC<WalletPageProps> = async ({
  params,
  searchParams,
}) => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Index");

  if (session?.user?.type !== "podcaster") {
    redirect("/");
  }

  const wallet_data = await getWalletAction({
    type: session?.user?.type!,
  });

  return (
    <div className="flex lg:min-h-[calc(100vh-72px)] flex-col flex-1 py-6 lg:py-12">
      <MaxWidthContainer className="flex flex-col md:flex-row md:justify-between gap-5 items-stretch">
        <div className="w-full lg:hidden flex justify-center items-center gap-1">
          <WalletIcon size={28} />
          <h2 className="text-3xl font-bold text-center">{t("wallet")}</h2>
        </div>
        <WalletAside wallet_data={wallet_data} />
        <WalletMain wallet_data={wallet_data} />
      </MaxWidthContainer>
    </div>
  );
};

export default WalletPage;
