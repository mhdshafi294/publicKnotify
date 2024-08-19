// Local imports
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import SupportForm from "./_components/support-form";

/**
 * SupportPage Component
 * Renders the support page, which includes a form for users to submit support requests.
 *
 * @returns {JSX.Element} The support page content.
 */
const SupportPage = () => {
  return (
    <MaxWidthContainer className="pt-16 flex-1 space-y-5">
      {/* Support form component */}
      <SupportForm />
    </MaxWidthContainer>
  );
};

export default SupportPage;
