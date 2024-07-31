"use client";
import { companyEditProfileAction } from "@/app/actions/profileActions";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
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
import FormFileInput from "@/components/ui/form-input-file";
import { convertFileToURL } from "@/lib/utils";
import { CompanyProfileSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import country from "country-list-js";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { ElementRef, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditCompanyProfile = ({ user }: { user: CustomUser }) => {
  const countriesCode = Object.values(country.all) as {
    name: string;
    dialing_code: string;
    iso2: string;
  }[];
  const inputRef = useRef<ElementRef<"input">>(null);
  const { update } = useSession();

  const dialingCode =
    countriesCode.find((country) => country.iso2 === user?.iso_code)
      ?.dialing_code || "";
  const form = useForm<CompanyProfileSchema>({
    resolver: zodResolver(CompanyProfileSchema),
    defaultValues: {
      email: user?.email ? user?.email : "",
      full_name: user?.full_name || "",
      image: new File([], ""),
      documents: new File([], ""),
      iso_code: user?.iso_code || "",
      phone: {
        code: dialingCode,
        phone: user?.phone?.slice(dialingCode.length) || "",
      },
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: companyEditProfileAction,
    onSuccess: async (data) => {
      console.log(data);
      toast.success("Profile updated successfully");
      await update({
        full_name: data.full_name,
        email: data.email,
        iso_code: data.iso_code,
        phone: data.phone,
        image: data.image,
      });
    },
  });

  const handleSubmit = (data: CompanyProfileSchema) => {
    const formData = new FormData();
    const countriesCode = (
      Object.values(country.all) as {
        name: string;
        dialing_code: string;
        iso2: string;
      }[]
    ).find((country) => country.dialing_code === data.phone.code)?.iso2;
    formData.append("full_name", data.full_name);
    formData.append("iso_code", data.iso_code);
    formData.append("iso_code", countriesCode!);
    formData.append("phone", `${data.phone.code}${data.phone.phone}`);
    if (data.image && data.image.name) formData.append("image", data.image);
    formData.append("email", data.email);
    if (data.documents.name) formData.append("document", data.documents);
    mutate(formData);
  };
  return (
    <Form {...form}>
      <form
        className="w-full px-0"
        onSubmit={form.handleSubmit((data) => {
          handleSubmit(data);
        })}
      >
        <div className="flex flex-col items-center gap-7 min-w-[358px]">
          <h2 className="text-[32px] font-black mb-1">My Profile</h2>
          <div className="w-full space-y-4">
            <div className="flex flex-col justify-center items-center">
              <div className="relative">
                <Avatar className="size-36">
                  <AvatarImage
                    src={
                      form.watch("image")?.name
                        ? convertFileToURL(form.watch("image"))
                        : user.image
                        ? user.image
                        : ""
                    }
                  />
                  <AvatarFallback></AvatarFallback>
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
              <FormInput name="full_name" label="Name" control={form.control} />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="capitalize text-lg">Phone</FormLabel>
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
              <FormInput name="email" label="Email" control={form.control} />
              <FormFileInput
                name="documents"
                label="Docs"
                control={form.control}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <Button
          disabled={isPending}
          className="w-full capitalize mt-8"
          type="submit"
        >
          {isPending ? <ButtonLoader /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default EditCompanyProfile;
