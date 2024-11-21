"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ContractSchema } from "@/schema/contractSchema";
import { format } from "date-fns";
import { Session } from "next-auth";
import ContractPageCard from "./contract-page-card";
import FormFields from "./form-fields";

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

/**
 * Functional component that renders the content of a step form.
 * @param {StepFormContentProps} step - The step object containing form data.
 * @param {any} state - The state of the form.
 * @param {any} form - The form object.
 * @param {string} contract_id - The ID of the contract.
 * @param {string} dir - The direction of the form.
 * @param {any} requestResponse - The response from the request.
 * @param {any} secondPartyData - Data of the second party involved.
 * @param {any} session - The session data.
 * @returns JSX element representing the content of the step form.
 */
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
        className="bg-card-secondary duration-200 border-card-foreground/0 flex-1 relative flex flex-col p-4"
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
          // request_name={requestResponse?.request?.name!}
          secondPartyData={secondPartyData}
          description={form.watch("description")}
          media_type={form.watch("media_type")}
          ad_place={form.watch("advertising_type")}
          ad_type={form.watch("advertising_section_id")}
          ad_period={form.watch("ad_period")}
          ad_cost={form.watch("ad_cost")}
          publishing_date={format(form.watch("publishing_date"), "yyyy-MM-dd")}
          publishing_time={form.watch("publishing_time")}
          // episode_type_translation={form.watch("episode_type")}
          session={session!}
        />
      </div>
    );
  }
};

export default StepFormContent;
