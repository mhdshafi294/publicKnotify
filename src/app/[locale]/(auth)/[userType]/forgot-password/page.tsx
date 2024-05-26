"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { forgotPasswordSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";

import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import sendCode from "@/services/auth/send-code";
import PhoneNumberInput from "@/components/phone-number-input";

const ForgotPassword = ({ params }: { params: { userType: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<forgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: {
        code: "",
        phone: "",
      },
    },
  });

  const handleSubmit = async (data: forgotPasswordSchema) => {
    setLoading(true);
    try {
      await sendCode(data, params.userType);
      router.push(
        `/${params.userType}/check-code?&phone=${data.phone.code}${data.phone.phone}`
      );
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      toast.error("Something went wrong.please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[360px] min-h-screen flex flex-col justify-center items-center gap-8">
      <h2>Forgot Password</h2>
      <p className="text-xs">
        Please enter your phone number so we can send you a verification code
      </p>
      <Form {...form}>
        <form
          className="w-full mt-6 md:px-0 flex flex-col items-center"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone</FormLabel>
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
          <Button
            disabled={loading}
            className="md:w-[360px] capitalize mx-auto mt-14"
            type="submit"
          >
            {loading ? <ButtonLoader /> : "Confirm"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
