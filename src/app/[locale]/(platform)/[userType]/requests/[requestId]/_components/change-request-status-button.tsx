"use client";

// Global imports
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/navigation";

// Local imports
import { changeRequestStatusAction } from "@/app/actions/requestsActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";

/**
 * ChangeRequestStatusButton Component
 * Renders a button that allows the user to accept or reject a request.
 * Displays a loading state while the request status is being updated and shows a toast message on success or error.
 *
 * @param {Object} props - The props object.
 * @param {string} props.requestId - The ID of the request to change status.
 * @param {string} props.userType - The type of user performing the action.
 * @param {'accept' | 'reject'} props.status - The status to set for the request.
 *
 * @returns {JSX.Element} The button element that triggers status change.
 */
const ChangeRequestStatusButton = ({
  requestId,
  userType,
  status,
}: {
  requestId: string;
  userType: string;
  status: "accept" | "reject";
}) => {
  // Define the success message based on the status
  const successToastMessage =
    status === "accept"
      ? "This request has been accepted by you"
      : status === "reject"
      ? "This request has been rejected by you"
      : "Process completed";

  // Initialize the router for navigation
  const router = useRouter();

  // Define the mutation for changing the request status
  const {
    data,
    mutate: server_changeRequestStatusAction,
    isPending,
  } = useMutation({
    mutationFn: changeRequestStatusAction,
    onSuccess: (data) => {
      console.log(data, "dataInSuccess");
      toast.success(successToastMessage);
      router.push(`/${userType}/requests/${requestId}`);
      // revalidatePath(`/${userType}/requests`); // Uncomment if revalidatePath works in your setup
    },
    onError: () => {
      console.log(data, "dataInError");
      toast.error("Something went wrong. Please try again!");
    },
  });

  /**
   * Handles the accept/reject action for the request.
   * Calls the mutation function with the request ID, status, and user type.
   */
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
      {isPending ? <ButtonLoader /> : status}
    </Button>
  );
};

export default ChangeRequestStatusButton;
