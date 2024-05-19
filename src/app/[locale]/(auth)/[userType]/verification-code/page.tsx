"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { checkCodeSchema } from "@/schema/authSchema";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import confirmVerificationCode from "@/services/auth/verification-code";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";

const VerificationCode = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<checkCodeSchema>({
    resolver: zodResolver(checkCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = async (data: checkCodeSchema) => {
    setLoading(true);
    console.log(data);
    try {
      await confirmVerificationCode(
        data.code,
        searchParams.phone as string,
        params.userType
      );
      toast.success("Account created successfully!.");
      router.push(`/sign-in?userType=${params.userType}`);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      toast.error("Something went wrong.please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-[752px] min-h-screen flex flex-col justify-center items-center gap-8">
      <h2>Verification Code</h2>
      <Form {...form}>
        <form
          className="w-full mt-6 md:px-0 flex flex-col items-center"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center gap-16">
                <FormLabel>
                  We have sent the verification code to your phone number
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={4} {...field} containerClassName="gap-6">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="w-[264px] capitalize mx-auto mt-20"
            type="submit"
          >
            {loading ? <ButtonLoader /> : "Confirm"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerificationCode;
