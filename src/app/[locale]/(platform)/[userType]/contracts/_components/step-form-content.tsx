"use client";

import { Card, CardContent } from "@/components/ui/card";
import ContractPageCard from "./contract-page-card";
import { ContractSchema } from "@/schema/contractSchema";
import { Session } from "next-auth";
import FormFields from "./form-fields";
import { format } from "date-fns";

interface StepFormContentProps {
  step: number;
  state: number;
  form: {
    control: any;
    watch: (name: keyof ContractSchema) => any;
  };
  contract_id?: string;
  dir: string;
  requestResponse: any;
  secondPartyData: any;
  session: Session;
}

const StepFormContent: React.FC<StepFormContentProps> = ({
  step,
  state,
  form,
  contract_id,
  dir,
  requestResponse,
  secondPartyData,
  session,
}) => {
  if (step === 1) {
    return (
      <Card
        key={state}
        className="bg-card-secondary duration-200 border-card-foreground/10 flex-1 relative flex flex-col p-4"
      >
        <CardContent className="space-y-3">
          <FormFields form={form} contract_id={contract_id} dir={dir} />
        </CardContent>
      </Card>
    );
  } else if (step === 2 && !!requestResponse) {
    return (
      <div className="py-5 flex-1 flex flex-col">
        <ContractPageCard
          request_name={requestResponse?.request?.name!}
          secondPartyData={secondPartyData}
          description={form.watch("description")}
          media_type={form.watch("media_type")}
          ad_place={form.watch("ad_place")}
          ad_period={form.watch("ad_period")}
          ad_cost={form.watch("ad_cost")}
          publishing_date={format(form.watch("publishing_date"), "yyyy-MM-dd")}
          publishing_time={form.watch("publishing_time")}
          episode_type_translation={form.watch("episode_type")}
          session={session!}
        />
      </div>
    );
  }
};

export default StepFormContent;
