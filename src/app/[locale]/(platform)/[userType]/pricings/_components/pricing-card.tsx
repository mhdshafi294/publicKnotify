import FormInput from "@/components/ui/form-input";
import usePricingsStore from "@/store/edit-pricings-store";
import { Check, SquarePen } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  price: string | undefined;
  text: string;
  name: string;
};
const PricingCard: FC<PropsType> = ({ price, text, name }) => {
  const editMode = usePricingsStore((state) => state.editMode);
  const form = useFormContext();

  return (
    <div className="w-full flex justify-start items-center p-4 gap-2 rounded-2xl bg-secondary">
      <div
        style={{
          backgroundImage: `linear-gradient(270deg, rgba(47, 234, 155, 0.15) 15.5%, rgba(127, 221, 83, 0.15) 85.5%)`,
        }}
        className="size-12 rounded-full flex justify-center items-center"
      >
        {!editMode ? (
          <Check className="size-8" />
        ) : (
          <SquarePen className="size-6" />
        )}
      </div>
      <div className="leading-5">
        {editMode ? (
          <FormInput
            className="h-8 text-2xl focus-visible:ring-transparent bg-transparent border-0 px-0 rounded-none"
            control={form.control}
            placeholder="Enter price"
            name={name}
            label=""
          />
        ) : (
          <p className="text-2xl capitalize">{`${price ? `$${price}` : "no price set yet"}`}</p>
        )}

        <p className="text-sm text-[#9098A3] font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default PricingCard;
