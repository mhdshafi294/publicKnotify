import {
  getConversationMessagesAction,
  getConversationsAction,
} from "@/app/actions/conversationsActions";
import ConversationsList from "./_components/Conversations-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "@/navigation";
import ChatWindow from "./_components/chat-window";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { ConversationMessagesResponse } from "@/types/conversation";
import EmptyState from "./_components/empty-state";

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  // Redirect to login if the session is not available
  if (!session) {
    redirect("/login");
  }

  if (
    session?.user?.type !== "podcaster" &&
    session?.user?.type !== "company"
  ) {
    redirect(`/${session?.user?.type}`);
  }

  const conversations = await getConversationsAction({
    type: session?.user?.type!,
  });

  let ConversationMessagesResponse: ConversationMessagesResponse | undefined;

  if (searchParams.conversation_id !== undefined) {
    ConversationMessagesResponse = await getConversationMessagesAction({
      id: searchParams.conversation_id as string,
      type: session?.user?.type!,
    });
  }

  return (
    <MaxWidthContainer className="h-[calc(80vh-200px)] flex-1 flex gap-9 md:py-8 ">
      <ConversationsList
        searchParams={searchParams}
        ConversationsList={conversations.conversations}
        type={session?.user?.type!}
      />
      {searchParams.conversation_id !== undefined &&
      ConversationMessagesResponse ? (
        <ChatWindow
          searchParams={searchParams}
          initialMessages={ConversationMessagesResponse?.messages}
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
