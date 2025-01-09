import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import React from "react";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Wallet } from "@/types/wallet";
import ProfileCardImageAndName from "../../profile/_components/profile-card-image-and-name";
import DashboardCardContainer from "../../shows/_components/dashboard-card-container";

type WalletAsideProps = {
  wallet_data: Wallet;
};

/**
 * WalletAside Component
 * Renders a sidebar displaying wallet summary details, including total received, current balance,
 * and the last payment date. Also shows the user profile picture and name.
 *
 * @param {WalletAsideProps} props - Component properties.
 * @param {Wallet} props.wallet_data - The wallet data to display, containing total received, current balance, and last payment date.
 * @returns {Promise<JSX.Element>} The rendered WalletAside component.
 *
 * @example
 * ```jsx
 * <WalletAside wallet_data={walletData} />
 * ```
 */
const WalletAside: React.FC<WalletAsideProps> = async ({ wallet_data }) => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Index");

  return (
    <aside className="w-full lg:w-3/12">
      <DashboardCardContainer className="w-full lg:min-h-[calc(100dvh-172px)] lg:rounded-lg lg:bg-card-secondary lg:py-14 px-5 lg:px-10 flex flex-col items-center lg:gap-10 gap-6">
        {/* Profile Section */}
        <ProfileCardImageAndName
          name={session?.user?.full_name!}
          image={session?.user?.image!}
          isSelfProfile
        />

        {/* Wallet Details */}
        <div className="w-full flex flex-col items-center gap-7">
          <div className="w-full grid grid-rows-2 items-baseline justify-items-center">
            <h3 className="opacity-70 text-sm">{t("total-received")}</h3>
            <p className="font-bold text-xl">$ {wallet_data.total}</p>
          </div>
          <div className="w-full grid grid-rows-2 items-baseline justify-items-center">
            <h3 className="opacity-70 text-sm">{t("to-be-transferred")}</h3>
            <p className="font-bold text-xl">$ {wallet_data.current}</p>
          </div>
          <div className="w-full grid grid-rows-2 items-baseline justify-items-center">
            <h3 className="opacity-70 text-sm">{t("last-payment-at")}</h3>
            <p className="font-bold text-xs mt-1">
              {format(new Date(wallet_data?.last_payment_at), "PPp")}
            </p>
          </div>
        </div>
      </DashboardCardContainer>
    </aside>
  );
};

export default WalletAside;
