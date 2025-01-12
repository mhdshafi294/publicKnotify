"use client";

// External Libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import country from "country-list-js";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Internal Modules and Components
import { userEditProfileAction } from "@/app/actions/profileActions";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth-options";
import PhoneNumberInput from "@/components/phone-number-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import { convertFileToURL } from "@/lib/utils";
import { UserProfileSchema } from "@/schema/profileSchema";

/**
 * Component for editing a user's profile.
 *
 * @param {object} props - Component props.
 * @param {CustomUser} props.user - The current user data.
 * @returns {JSX.Element} The rendered component.
 */
const EditUserProfile = ({ user }: { user: CustomUser }) => {
  // Translation hook
  const t = useTranslations("Index");

  // Prepare country dialing codes
  const countriesCode = Object.values(country.all) as {
    name: string;
    dialing_code: string;
    iso2: string;
  }[];

  // Form reference
  const inputRef = useRef<HTMLInputElement>(null);

  // Session hook
  const { update } = useSession();

  // Determine default dialing code based on user's ISO code
  const getDialingCode = (isoCode: string | undefined) => {
    return isoCode
      ? countriesCode.find((country) => country.iso2 === isoCode)
          ?.dialing_code || ""
      : "";
  };

  const dialingCode = getDialingCode(user?.iso_code);

  // Form handling with react-hook-form
  const form = useForm<UserProfileSchema>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      email: user?.email || "",
      full_name: user?.full_name || "",
      image: new File([], ""),
      iso_code: user?.iso_code || "",
      phone: {
        code: dialingCode,
        phone: user?.phone?.slice(dialingCode.length) || "",
      },
    },
  });

  // Mutation for updating user profile
  const { mutate, isPending } = useMutation({
    mutationFn: userEditProfileAction,
    onSuccess: async (data) => {
      toast.success(t("profileUpdatedSuccessfully"));
      await update({
        full_name: data.full_name,
        email: data.email,
        iso_code: data.iso_code,
        phone: data.phone,
        image: data.image,
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(t("updateFailed"));
    },
  });

  // Handle form submission
  const handleSubmit = (data: UserProfileSchema) => {
    const formData = new FormData();
    const countryCode = (
      Object.values(country.all) as {
        name: string;
        dialing_code: string;
        iso2: string;
      }[]
    ).find((country) => country.dialing_code === data.phone.code)?.iso2;

    if (!countryCode) {
      // Handle the case where countryCode is undefined
      console.error("Country code not found");
      return;
    }

    formData.append("full_name", data.full_name);
    formData.append("iso_code", data.iso_code);
    formData.append("iso_code", countryCode);
    formData.append("phone", `${data.phone.code}${data.phone.phone}`);
    if (data.image && data.image.name) formData.append("image", data.image);
    formData.append("email", data.email);
    mutate(formData);
  };

  return (
    <Form {...form}>
      <form
        className="w-full px-0"
        onSubmit={form.handleSubmit((data) => handleSubmit(data))}
      >
        <div className="flex flex-col items-center gap-7 min-w-[358px]">
          <h2 className="text-[32px] font-black mb-1">{t("myProfile")}</h2>
          <div className="w-full space-y-4">
            <div className="flex flex-col justify-center items-center">
              <div className="relative">
                <Avatar className="size-36">
                  <AvatarImage
                    src={
                      form.watch("image")?.name
                        ? convertFileToURL(form.watch("image"))
                        : user.image || "" // Ensure it's always a string
                    }
                    alt={user?.full_name ? user.full_name : ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="uppercase text-black text-3xl">
                    {user?.full_name!.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.click();
                    }
                  }}
                  type="button"
                  className="absolute inset-0 bg-gray-300/50 rounded-full flex justify-center items-center"
                >
                  <Camera className="size-16 text-black" strokeWidth={1.5} />
                </button>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full text-lg capitalize peer">
                      <FormControl>
                        <input
                          ref={inputRef}
                          hidden
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(
                              e.target.files ? e.target.files?.[0] : undefined
                            )
                          }
                          type="file"
                        />
                      </FormControl>
                      <FormMessage className="capitalize font-normal" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormInput
              name="full_name"
              label={t("name")}
              control={form.control}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("phone")}</FormLabel>
                  <FormControl>
                    <PhoneNumberInput
                      phone={field.value}
                      setPhone={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormInput name="email" label={t("email")} control={form.control} />
          </div>
        </div>
        <Button
          disabled={isPending}
          className="w-full capitalize mt-8"
          type="submit"
        >
          {isPending ? <ButtonLoader /> : t("save")}
        </Button>
      </form>
    </Form>
  );
};

export default EditUserProfile;
