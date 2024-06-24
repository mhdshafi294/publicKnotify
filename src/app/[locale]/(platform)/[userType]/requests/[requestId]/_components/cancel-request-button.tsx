"use client";

import { toast } from "sonner";

import { cancelRequestAction } from "@/app/actions/requestsActions";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";

const CancelRequestButton = ({
  requestId,
  userType,
}: {
  requestId: string;
  userType: string;
}) => {
  const {
    data,
    mutate: server_cancelRequestAction,
    isPending,
  } = useMutation({
    mutationFn: cancelRequestAction,
    onSuccess: () => {
      toast.success("The request has been canceled");
    },
    onError: () => {
      toast.error("Something went wrong.please try again!");
    },
  });

  const handleAccept = async () => {
    server_cancelRequestAction({
      id: requestId,
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
      {isPending ? <ButtonLoader /> : `Cancel`}
    </Button>
  );
};

export default CancelRequestButton;
