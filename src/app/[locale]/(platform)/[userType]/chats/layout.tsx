import { getConversationsAction } from "@/app/actions/conversationsActions";
import ConversationList from "./_components/Conversation-list";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversationsAction({ type: "podcaster" });

  return (
    <div>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </div>
  );
}
