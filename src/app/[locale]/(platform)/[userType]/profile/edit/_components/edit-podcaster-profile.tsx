"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import country from "country-list-js";
import { useTranslations } from "next-intl";

import { podcasterEditProfileAction } from "@/app/actions/profileActions";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import { PodcasterProfileSchema } from "@/schema/profileSchema";
import { ProfileResponse } from "@/types/profile";
import { CategoryDetails } from "@/types/podcast";
import MultiSelectPopover from "@/components/multi-select-popover";
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

/**
 * Component for editing a podcaster's profile.
 *
 * @param {object} props - Component props.
 * @param {CustomUser} props.user - The current user data.
 * @param {ProfileResponse} props.profile - The current profile data.
 * @param {CategoryDetails[]} props.categoriesList - List of available categories.
 * @returns {JSX.Element} The rendered component.
 */
const EditPodcasterProfile = ({
  user,
  profile,
  categoriesList,
}: {
  user: CustomUser;
  profile: ProfileResponse;
  categoriesList: CategoryDetails[];
}) => {
  const t = useTranslations("Index");

  const countriesCode = Object.values(country.all) as {
    name: string;
    dialing_code: string;
    iso2: string;
  }[];

  const inputRef = useRef<HTMLInputElement>(null);
  const { update } = useSession();

  const dialingCode =
    countriesCode.find((country) => country.iso2 === user?.iso_code)
      ?.dialing_code || "";

  const form = useForm<PodcasterProfileSchema>({
    resolver: zodResolver(PodcasterProfileSchema),
    defaultValues: {
      email: user?.email || "",
      full_name: user?.full_name || "",
      image: new File([], ""),
      iso_code: user?.iso_code || "",
      categories: profile.user.categories.map((c) => c.id.toString()) || [],
      spotify: profile.user.spotify_account || "",
      youtube: profile.user.youtube_account || "",
      phone: {
        code: dialingCode,
        phone: user?.phone?.slice(dialingCode.length) || "",
      },
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: podcasterEditProfileAction,
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
      toast.error(t("profileUpdateFailed")); // User-friendly error message
      console.log(error.message); // Log technical details
    },
  });

  /**
   * Handle form submission and prepare FormData for submission.
   *
   * @param {PodcasterProfileSchema} data - Form data.
   */
  const handleSubmit = (data: PodcasterProfileSchema) => {
    const formData = new FormData();

    const countryCode = countriesCode.find(
      (country) => country.dialing_code === data.phone.code
    )?.iso2;

    formData.append("full_name", data.full_name);
    formData.append("iso_code", data.iso_code);
    if (data.spotify) formData.append("spotify_account", data.spotify);
    if (data.youtube) formData.append("youtube_account", data.youtube);
    formData.append("iso_code", countryCode!);
    formData.append("phone", `${data.phone.code}${data.phone.phone}`);
    if (data.image && data.image.name) formData.append("image", data.image);
    formData.append("email", data.email);

    if (data.categories.length > 0) {
      data.categories.forEach((category, index) =>
        formData.append(`categories[${index}]`, category)
      );
    }

    mutate(formData);
  };

  return (
    <Form {...form}>
      <form className="w-full px-0" onSubmit={form.handleSubmit(handleSubmit)}>
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
                        : user.image || ""
                    }
                    alt={user?.full_name ? user.full_name : ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="uppercase text-black text-3xl">
                    {user?.full_name!.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => inputRef.current?.click()}
                  type="button"
                  className="absolute inset-0 bg-gray-300/50 rounded-full flex justify-center items-center"
                >
                  <Camera className="size-16 text-black" strokeWidth={1.5} />
                </button>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full peer">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <FormLabel className="capitalize text-lg">
                      {t("phone")}
                    </FormLabel>
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
              <FormInput
                name="email"
                label={t("email")}
                control={form.control}
              />
              <MultiSelectPopover
                form={form}
                formFieldName="categories"
                isError={false}
                isPending={false}
                itemIdKey="id"
                itemNameKey="name"
                items={categoriesList}
                label={t("categories")}
                disabled={false}
              />
              <FormInput
                name="youtube"
                label={t("youtube")}
                control={form.control}
              />
              <FormInput
                name="spotify"
                label={t("spotify")}
                control={form.control}
              />
            </div>
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

export default EditPodcasterProfile;
