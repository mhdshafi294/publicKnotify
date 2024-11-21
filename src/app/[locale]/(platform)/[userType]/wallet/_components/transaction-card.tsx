import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Transaction } from "@/types/wallet";

type TransactionCardProps = {
  transaction: Transaction;
};

/**
 * TransactionCard Component
 * Displays information for a transaction in a card layout. Links to the associated contract page.
 * Shows company details, transaction ID, status, amount, and date.
 *
 * @param {TransactionCardProps} props - Component properties.
 * @param {Transaction} props.transaction - The transaction object containing details to be displayed.
 * @returns {Promise<JSX.Element>} The rendered TransactionCard component.
 *
 * @example
 * ```jsx
 * <TransactionCard transaction={transaction} />
 * ```
 */
const TransactionCard: React.FC<TransactionCardProps> = async ({
  transaction,
}) => {
  // Fetch the current session
  const session = await getServerSession(authOptions);

  return (
    <Link href={`contracts/${transaction?.contract?.id}`}>
      <div className="w-full p-4 rounded-2xl bg-background hover:bg-border-secondary duration-150 space-y-5">
        <div className="w-full flex justify-between">
          {/* Company Logo and Details */}
          <div className="w-full flex gap-5">
            <Image
              src={
                "company" in transaction?.contract &&
                transaction?.contract?.company?.image
                  ? transaction?.contract?.company?.image
                  : "/podcaster-filler.webp"
              }
              alt={`${
                "company" in transaction?.contract
                  ? transaction?.contract?.company?.full_name
                  : "Podcaster"
              } logo`}
              width={80}
              height={80}
              className="rounded object-cover size-[80px]"
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-bold">
                {"company" in transaction?.contract &&
                  transaction?.contract?.company?.full_name}
              </h3>
              <div>
                <p className="text-xs opacity-90 dark:opacity-70">
                  Transaction ID
                </p>
                <p className="text-sm">{transaction?.id}</p>
              </div>
            </div>
          </div>

          {/* Transaction Status, Amount, and Date */}
          <div className="flex flex-col justify-between items-end w-fit gap-2">
            <Badge
              className={cn(
                "w-fit capitalize",
                {
                  "bg-greeny/20 hover:bg-greeny/30 text-greeny":
                    transaction?.status === "paid",
                },
                {
                  "bg-accent/80 hover:bg-accent/70 text-accent-foreground":
                    transaction?.status !== "paid",
                }
              )}
            >
              {transaction?.status}
            </Badge>
            <p className="text-lg font-bold">$ {transaction?.amount}</p>
            <p className="text-xs opacity-90 dark:opacity-70 text-nowrap">
              {format(new Date(transaction?.created_at), "PPp")}
            </p>
          </div>
        </div>

        {/* Transaction Description */}
        <p className="text-xs opacity-90 dark:opacity-70">
          {transaction?.description}
        </p>
      </div>
    </Link>
  );
};

export default TransactionCard;
