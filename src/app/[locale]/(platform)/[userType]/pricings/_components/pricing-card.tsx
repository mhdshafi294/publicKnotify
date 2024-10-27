// External Imports
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Check, SquarePen } from "lucide-react";

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
    <div className="w-full flex justify-start items-center p-4 gap-2 rounded-2xl bg-secondary">
      {/* Icon container with gradient background */}
      <div
        style={{
          backgroundImage: `linear-gradient(270deg, rgba(47, 234, 155, 0.15) 15.5%, rgba(127, 221, 83, 0.15) 85.5%)`,
        }}
        className="size-12 rounded-full flex justify-center items-center"
      >
        {/* Conditionally render an icon based on edit mode */}
        {!editMode ? (
          <Check className="size-8" />
        ) : (
          <SquarePen className="size-6" />
        )}
      </div>

      <div className="leading-5 w-full">
        {/* If in edit mode, show an input field for the price; otherwise, show the price text */}
        {editMode ? (
          <FormInput
            className="h-8 text-2xl focus-visible:ring-transparent bg-transparent border-0 px-0 py-2 w-full"
            control={form.control}
            placeholder="Enter price"
            name={name}
            label=""
          />
        ) : (
          <p className="text-2xl capitalize">
            {price ? `${price}` : t("no-price-set-yet")}
          </p>
        )}

        {/* Description text below the price or input */}
        <p className="text-sm text-[#9098A3] font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default PricingCard;
