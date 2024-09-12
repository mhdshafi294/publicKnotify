import { MessagesSquareIcon } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * EmptyState Component
 *
 * This component renders an empty state view with an icon and a message when there are no chats selected.
 * It is typically displayed when the user has not yet selected a conversation.
 *
 * @returns {JSX.Element} The rendered empty state component.
 */
const EmptyState = () => {
  const t = useTranslations("Index");

  return (
    <div
      className="
        px-4 
        py-10 
        sm:px-6 
        lg:px-8 
        lg:py-6 
        h-full 
        flex 
        justify-center 
        items-center
      "
    >
      <div className="text-center items-center justify-center gap-2 flex flex-col">
        {/* Display an icon to indicate no chat is selected */}
        <MessagesSquareIcon size={36} />

        {/* Display a message prompting the user to select a chat */}
        <h3 className="mt-2 text-2xl font-semibold italic">
          {t("select-a-chat")}
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
