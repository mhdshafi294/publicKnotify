import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Transaction } from "@/types/wallet";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

type TransactionCardProps = {
  transaction: Transaction;
};

const TransactionCard: React.FC<TransactionCardProps> = async ({
  transaction,
}) => {
  // Fetch the current session
  const session = await getServerSession(authOptions);

  return (
    <Link href={`contract/${transaction?.contract?.id}`}>
      <div className="w-full p-4 rounded-2xl bg-background hover:bg-border-secondary duration-150 space-y-5">
        <div className="w-full flex justify-between">
          <div className="w-full flex gap-5">
            <Image
              src={transaction?.contract?.company?.image}
              alt={`${transaction?.contract?.company?.full_name} logo`}
              width={80}
              height={80}
              className="rounded object-cover size-[80px]"
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-bold">
                {transaction?.contract?.company?.full_name}
              </h3>
              <div>
                <p className="text-xs opacity-90 dark:opacity-70">
                  Transaction ID
                </p>
                <p className="text-sm">{transaction?.id}</p>
              </div>
            </div>
          </div>
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
        {/* <Separator className="w-full opacity-20" /> */}
        <p className="text-xs opacity-90 dark:opacity-70">
          {transaction?.description}
        </p>
      </div>
    </Link>
  );
};

export default TransactionCard;
