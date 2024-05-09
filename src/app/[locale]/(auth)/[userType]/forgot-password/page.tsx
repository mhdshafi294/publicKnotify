"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { forgotPasswordSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/navigation";

import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";

import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import forgotPassword from "@/services/auth/forgot-password";

const ForgotPassword = ({ params }: { params: { userType: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<forgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSubmit = async (data: forgotPasswordSchema) => {
    setLoading(true);
    try {
      await forgotPassword(data, params.userType);
      router.push(
        `/check-code?userType=${params.userType}&phone=${data.phone}`
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
    <div className="md:max-w-[752px] min-h-screen flex flex-col justify-center items-center gap-8">
      <h2>Verification Code</h2>
      <Form {...form}>
        <form
          className="w-full mt-6 md:px-0 flex flex-col items-center"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <FormInput name="phone" label="Phone" control={form.control} />
          <Button
            disabled={loading}
            className=" capitalize mx-auto mt-20"
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
