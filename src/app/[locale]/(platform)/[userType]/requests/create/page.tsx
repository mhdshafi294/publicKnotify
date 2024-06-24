"use client";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const CreateRequest = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();

  const form = useForm<newPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const {
    data,
    mutate: server_newPasswordAction,
    isPending,
  } = useMutation({
    mutationFn: newPasswordAction,
    onSuccess: () => {
      router.push(`/sign-in?userType=${params.userType}`);
    },
    onError: () => {
      toast.error("Something went wrong.please try again!");
    },
  });

  const handleSubmit = async (data: newPasswordSchema) => {
    server_newPasswordAction({
      newPasswordData: data,
      phone: searchParams.phone as string,
      code: searchParams.code as string,
      type: params.userType,
    });
  };

  return (
    <MaxWidthContainer className="grid grid-cols-12">
      <div className="col-span-3">CreateRequest</div>
      <div className="col-span-9">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </MaxWidthContainer>
  );
};

export default CreateRequest;
