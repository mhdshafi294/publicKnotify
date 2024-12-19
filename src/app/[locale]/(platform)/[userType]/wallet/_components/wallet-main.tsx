import { WalletIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Wallet } from "@/types/wallet";
import DashboardCardContainer from "../../shows/_components/dashboard-card-container";
import TransactionCard from "./transaction-card";

type WalletMainProps = {
  wallet_data: Wallet;
};

/**
 * WalletMain Component
 * Renders the main section of the wallet page, including a header, transaction history, and
 * a scrollable area to view each transaction.
 *
 * @param {WalletMainProps} props - Component properties.
 * @param {Wallet} props.wallet_data - The wallet data containing transactions to display.
 * @returns {Promise<JSX.Element>} The rendered WalletMain component.
 *
 * @example
 * ```jsx
 * <WalletMain wallet_data={walletData} />
 * ```
 */
const WalletMain: React.FC<WalletMainProps> = async ({ wallet_data }) => {
  const t = await getTranslations("Index");

  return (
    <main className="w-full lg:w-9/12">
      {/* Header for large screens */}
      <div className="w-full lg:flex items-center gap-1 min-h-14 hidden">
        <WalletIcon size={28} />
        <h2 className="text-3xl font-bold">{t("wallet")}</h2>
      </div>

      {/* Dashboard Card Container */}
      <DashboardCardContainer className="w-full h-[calc(100dvh-228px)] lg:rounded-lg lg:bg-card-secondary py-7 px-5 lg:px-10 flex flex-col items-center lg:items-start lg:gap-10 gap-6">
        <h3 className="text-2xl">{t("history")}</h3>

        {/* Transaction List */}
        <div className="w-full flex-1 h-[calc(100%-60px)]">
          {wallet_data?.transactions?.length > 0 ? (
            <ScrollArea className="w-full h-full py-1">
              {wallet_data.transactions.map((transaction) => (
                <TransactionCard
                  key={transaction?.id}
                  transaction={transaction}
                />
              ))}
            </ScrollArea>
          ) : (
            <p className="opacity-70 italic capitalize text-center text-2xl">
              {t("no-transactions-yet")}
            </p>
          )}
        </div>
      </DashboardCardContainer>
    </main>
  );
};

export default WalletMain;
