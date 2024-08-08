"use client";

// Global imports
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Local imports
import { cancelRequestAction } from "@/app/actions/requestsActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";

/**
 * CancelRequestButton Component
 * Renders a button that allows the user to cancel a request.
 * Displays a loading state while the request is being canceled and shows a toast message on success or error.
 *
 * @param {Object} props - The props object.
 * @param {string} props.requestId - The ID of the request to cancel.
 * @param {string} props.userType - The type of user performing the action.
 *
 * @returns {JSX.Element} The button element that triggers the cancellation of the request.
 */
const CancelRequestButton = ({
  requestId,
  userType,
}: {
  requestId: string;
  userType: string;
}) => {
  // Initialize the router for navigation
  const router = useRouter();

  // Initialize translations for localization
  const t = useTranslations("Index");

  // Define the mutation for canceling the request
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

  /**
   * Handles the cancel action for the request.
   * Calls the mutation function with the request ID and user type.
   */
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
      variant="default" // Always use the default variant for the cancel button
      onClick={handleCancel}
    >
      {isPending ? <ButtonLoader /> : t("cancel")}
    </Button>
  );
};

export default CancelRequestButton;
