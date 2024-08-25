import { createPlayListsAction } from "@/app/actions/podcastActions";
import ArrayFormInput from "@/components/ui/array-form-input";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import FormInputWithPreText from "@/components/ui/form-input-with-pre-text";
import { useRouter } from "@/navigation";
import { CreateShowSchema } from "@/schema/showsSchema";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const OwnerDetailsSection = () => {
  const form = useFormContext<CreateShowSchema>();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createPlayListsAction,
    onSuccess: () => {
      toast.success("show created successfully");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const handleSubmit = (data: CreateShowSchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("copyright", data.copyright);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("show_owner", data.show_owner);
    formData.append("owner_email", data.owner_email);
    formData.append("type", data.type);
    formData.append("footer", "test"); //TODO:remove this field
    data.categories.forEach((category, index) => {
      if (category) formData.append(`categories[${index}]`, category);
    });
    data.authors.forEach((author, index) => {
      if (author) formData.append(`authors[${index}]`, author);
    });
    data.tags.forEach((tag, index) => {
      if (tag) formData.append(`tags[${index}]`, tag);
    });
    mutate({ formData, type: "podcaster" });
  };
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
        disabled={isPending}
        onClick={() => {
          form.handleSubmit(handleSubmit)();
        }}
      >
        Save and Preview
      </Button>
    </div>
  );
};

export default OwnerDetailsSection;
