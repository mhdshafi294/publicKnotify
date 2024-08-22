import ArrayFormInput from "@/components/ui/array-form-input";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import FormInputWithPreText from "@/components/ui/form-input-with-pre-text";
import { CreateShowSchema } from "@/schema/showsSchema";
import { useFormContext } from "react-hook-form";

const OwnerDetailsSection = () => {
  const form = useFormContext<CreateShowSchema>();
  return (
    <div className="bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">05. Owner Details</h2>
      <ArrayFormInput
        name="authors"
        control={form.control}
        label={"Authors"}
        description="Add the podcast author’s names to be credited with the content of your podcast. This will be displayed in podcast listening apps."
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        defaultValues={form.getValues()}
      />
      <FormInput
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="show_owner"
        labelClassName="text-base"
        label="Show Owner"
      />
      <FormInput
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="owner_email"
        labelClassName="text-base"
        label="Show Email"
      />
      <FormInputWithPreText
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="copyright"
        labelClassName="text-base"
        label="Copyright"
        preText="©"
      />

      <Button
        onClick={() => {
          form.handleSubmit((data) => {
            console.log("data");
            console.log(data);
          })();
        }}
      >
        Save and Preview
      </Button>
    </div>
  );
};

export default OwnerDetailsSection;
