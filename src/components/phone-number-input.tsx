import { cn } from "@/lib/utils";
import country from "country-list-js";
import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const countriesCode = (
  Object.values(country.all) as { name: string; dialing_code: string }[]
)
  .filter((country) => country.dialing_code)
  .filter((country) => country.dialing_code.trim().length > 0)
  .filter((country) => !country.dialing_code.trim().includes("and"))
  .filter((country) => country.dialing_code !== "972")
  .map((country) => ({
    label: `${country.name} (${country.dialing_code})`,
    value: country.dialing_code,
  }))
  .map((country, index) => ({ ...country, id: index + 1 }));

type PhoneWithCodeType = {
  code: string;
  phone: string;
};
type PropsType = {
  setPhone: Dispatch<SetStateAction<PhoneWithCodeType>>;
  phone: PhoneWithCodeType;
  inputClassName?: string;
};

const PhoneNumberInput: FC<PropsType> = ({
  setPhone,
  phone,
  inputClassName,
}) => {
  const t = useTranslations("Index");
  const [code, setCode] = useState("");
  const [label, setLabel] = useState(
    phone.code
      ? countriesCode.find((p) => p.value === phone.code)?.label
      : "United Arab Emirates (971)"
  );
  const [openPopover, setOpenPopover] = useState(false);
  const [inputField, setInputField] = useState(phone.phone);

  useEffect(() => {
    if (label) {
      const selectedCode = countriesCode.find(
        (country) => country.label.toLowerCase() === label.toLowerCase()
      )!.value;

      setCode(selectedCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  useEffect(() => {
    setPhone({
      code,
      phone: inputField,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputField, code]);

  return (
    <div className="flex justify-center overflow-hidden w-full items-center border border-input/50 rounded-md ">
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={openPopover}
            tabIndex={-1}
            className={cn(
              "justify-between border-e rounded-none bg-input ps-2 pe-1 py-1 text-black dark:text-white",
              inputClassName
            )}
          >
            {!code.includes("+") ? `+${code}` : code}
            <ChevronsUpDown className="ms-1 h-4 w-4 shrink-0 opacity-70 dark:opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-input"
          align="start"
          side="bottom"
          avoidCollisions={false}
        >
          <Command className="bg-input">
            <CommandInput placeholder="Select country" />
            <CommandEmpty>{t("no-country")}</CommandEmpty>
            <CommandGroup>
              <CommandList className="no-scrollbar">
                {countriesCode.map((countryCode) => (
                  <CommandItem
                    key={countryCode.label}
                    value={countryCode.label}
                    className="text-xs cursor-pointer"
                    onSelect={(currentValue) => {
                      setLabel(
                        currentValue === label
                          ? "United Arab Emirates (971)"
                          : currentValue
                      );
                      setOpenPopover(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "me-2 h-4 w-4",
                        label === countryCode.label
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {countryCode.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        value={inputField}
        onChange={(e) => setInputField(e.target.value)}
        className={cn(
          "w-full rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 text-black dark:text-white",
          inputClassName
        )}
      />
    </div>
  );
};

export default PhoneNumberInput;
