"use client";

import { toast } from "sonner";

import { changeRequestStatusAction } from "@/app/actions/requestsActions";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { revalidatePath } from "next/cache";

const ChangeRequestStatusButton = ({
  requestId,
  userType,
  status,
}: {
  requestId: string;
  userType: string;
  status: "accept" | "reject";
}) => {
  const successToastMessage =
    status === "accept"
      ? "This request has been accepted by you"
      : status === "reject"
      ? "This request has been rejected by you"
      : "Process completed";

  const {
    data,
    mutate: server_changeRequestStatusAction,
    isPending,
  } = useMutation({
    mutationFn: changeRequestStatusAction,
    onSuccess: () => {
      toast.success(successToastMessage);
      revalidatePath(`/${userType}/requests`);
    },
    onError: () => {
      toast.error("Something went wrong.please try again!");
    },
  });

  const handleAccept = async () => {
    server_changeRequestStatusAction({
      id: requestId,
      status: status === "accept" ? "5" : status === "reject" ? "4" : "",
      type: userType,
    });
  };

  return (
    <Button
      disabled={isPending}
      className="capitalize mx-auto w-full"
      variant={status === "reject" ? "destructive" : "default"}
      onClick={handleAccept}
    >
      {isPending ? <ButtonLoader /> : `${status}`}
    </Button>
  );
};

export default ChangeRequestStatusButton;
