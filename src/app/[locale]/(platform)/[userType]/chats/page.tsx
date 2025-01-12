import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";

import {
  getConversationMessagesAction,
  getConversationsAction,
} from "@/app/actions/conversationsActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { ConversationMessagesResponse } from "@/types/conversation";
import ConversationsList from "./_components/Conversations-list";
import ChatWindow from "./_components/chat-window";
import EmptyState from "./_components/empty-state";

/**
 * ChatPage Component
 *
 * This component renders the main chat page, which includes a list of conversations
 * and a chat window. It utilizes the MaxWidthContainer for layout consistency and ensures
 * that the content is responsive across different screen sizes.
 *
 * @param {Object} params - URL parameters.
 * @param {string} params.userType - The type of user (e.g., admin, user).
 * @param {Object} searchParams - Query parameters from the URL, including conversation_id.
 * @returns {JSX.Element} The rendered chat page with conversation list and chat window.
 */
export default async function ChatPage({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Retrieve the user session
  const session = await getServerSession(authOptions);

  // Redirect to login page if the session is not found
  if (!session) {
    redirect("/sign-in");
  }

  // Redirect users to their specific dashboard based on their user type
  if (session?.user?.type === "user") {
    redirect(`/${session?.user?.type}`);
  }

  // Fetch the conversations based on user type
  const conversations = await getConversationsAction({
    type: session?.user?.type!,
  });

  // Placeholder for conversation messages response
  let conversationMessages: ConversationMessagesResponse | undefined;

  // If a conversation ID exists in the search params, fetch the conversation messages
  if (searchParams.conversation_id !== undefined) {
    conversationMessages = await getConversationMessagesAction({
      id: searchParams.conversation_id as string,
      type: session?.user?.type!,
    });
  }

  // Render the chat page layout with conversation list and chat window or an empty state
  return (
    <MaxWidthContainer className="flex-1 flex md:gap-9 md:py-8 px-0 sm:px-0 md:px-8 relative">
      {/* Render the conversations list */}
      <ConversationsList
        searchParams={searchParams}
        initialConversationsList={conversations.conversations}
        type={session?.user?.type!}
      />

      {/* Conditionally render the chat window if a conversation is selected, otherwise show empty state */}
      {searchParams.conversation_id !== undefined && conversationMessages ? (
        <ChatWindow
          searchParams={searchParams}
          initialMessages={conversationMessages?.messages}
          receiver={conversationMessages?.receiver}
          type={session?.user?.type!}
        />
      ) : (
        <div className="flex-1 px-3 py-5 flex justify-center items-center">
          <EmptyState />
        </div>
      )}
    </MaxWidthContainer>
  );
}
