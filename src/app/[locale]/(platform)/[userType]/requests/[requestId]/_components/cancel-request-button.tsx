"use client";

import { toast } from "sonner";

import { cancelRequestAction } from "@/app/actions/requestsActions";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { useRouter } from "next/navigation";

const CancelRequestButton = ({
  requestId,
  userType,
}: {
  requestId: string;
  userType: string;
}) => {
  const router = useRouter();

  const {
    data,
    mutate: server_cancelRequestAction,
    isPending,
  } = useMutation({
    mutationFn: cancelRequestAction,
    onMutate: () => {
      toast.loading("Canceling request...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("The request has been canceled");
      router.push(`/${userType}/requests`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong.please try again!");
    },
  });

  const handleCancel = async () => {
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
      onClick={handleCancel}
    >
      {isPending ? <ButtonLoader /> : `Cancel`}
    </Button>
  );
};

export default CancelRequestButton;
