"use client";

// Global imports
import { useRouter } from "@/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  status: "accept" | "reject" | "cancel";
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

  const queryClient = useQueryClient();

  // Define the mutation for changing the request status
  const {
    data,
    mutate: server_changeRequestStatusAction,
    isPending,
  } = useMutation({
    mutationFn: changeRequestStatusAction,
    onSuccess: (data) => {
      // console.log(data, "dataInSuccess");
      toast.success(successToastMessage);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["requests"] });
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
      status:
        status === "accept"
          ? "3"
          : status === "reject"
          ? "2"
          : status === "cancel"
          ? "5"
          : "",
      type: userType,
    });
  };

  return (
    <Button
      disabled={isPending}
      className="capitalize mx-auto rounded-full font-bold text-xs h-8 lg:h-10 lg:text-sm px-3 lg:px-7"
      variant={status === "accept" ? "default" : "destructive"}
      onClick={handleAccept}
    >
      {isPending ? <ButtonLoader /> : status}
    </Button>
  );
};

export default ChangeRequestStatusButton;
