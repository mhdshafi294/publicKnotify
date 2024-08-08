"use client";

import { toast } from "sonner";
import { cancelRequestAction } from "@/app/actions/requestsActions";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const CancelRequestButton = ({
  requestId,
  userType,
}: {
  requestId: string;
  userType: string;
}) => {
  const router = useRouter();
  const t = useTranslations("Index");

  const {
    data,
    mutate: server_cancelRequestAction,
    isPending,
  } = useMutation({
    mutationFn: cancelRequestAction,
    onMutate: () => {
      toast.loading(t("cancelingRequest"));
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(t("requestCanceled"));
      router.push(`/${userType}/requests`);
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("somethingWentWrong"));
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
      {isPending ? <ButtonLoader /> : t("cancel")}
    </Button>
  );
};

export default CancelRequestButton;
