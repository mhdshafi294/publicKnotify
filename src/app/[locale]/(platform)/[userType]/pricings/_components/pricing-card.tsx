// External Imports
import { FC } from "react";
import { useFormContext } from "react-hook-form";

// Internal Imports
import FormInput from "@/components/ui/form-input";
import usePricingsStore from "@/store/use-edit-pricings-store";
import { useTranslations } from "next-intl";

type PropsType = {
  price: string | undefined;
  text: string;
  name: string;
};

/**
 * PricingCard Component
 * Displays a card with pricing information and an optional input for editing.
 *
 * @param {PropsType} props - The props for the component.
 * @param {string | undefined} props.price - The current price value.
 * @param {string} props.text - The description text for the pricing.
 * @param {string} props.name - The name of the input field for form control.
 *
 * @returns {JSX.Element} The pricing card with display or edit mode.
 */
const PricingCard: FC<PropsType> = ({ price, text, name }) => {
  // Retrieve the current edit mode state from the store
  const editMode = usePricingsStore((state) => state.editMode);

  // Get form context to manage the input fields if in edit mode
  const form = useFormContext();

  const t = useTranslations("Index");

  return (
    <div className="flex gap-3 items-center px-2 py-[10px] bg-card/50 rounded-[20px]">
      {/* Icon container with gradient background */}
      <div
        style={{
          backgroundImage: `linear-gradient(270deg, rgba(47, 234, 155, 0.15) 15.5%, rgba(127, 221, 83, 0.15) 85.5%)`,
        }}
        className="size-8 rounded-full "
      />
      {/* Description text below the price or input */}
      <p className="text-sm text-[#9098A3] font-semibold capitalize">{text}</p>
      <div className="max-w-24 w-fit flex gap-2">
        {/* If in edit mode, show an input field for the price; otherwise, show the price text */}
        {editMode ? (
          <FormInput
            className=" text-lg font-bold focus-visible:ring-transparent bg-transparent border-0 px-0 py-2 !mt-0  text-end"
            control={form.control}
            placeholder={t("enter-price")}
            name={name}
            label=""
          />
        ) : (
          <p className="capitalize font-semibold">
            {price ? `${price}` : "N/A"}
          </p>
        )}
      </div>
      <p className="text-sm text-[#9098A3] font-semibold">/sec</p>
    </div>
  );
};

export default PricingCard;
