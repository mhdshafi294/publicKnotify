import { format } from "date-fns";
import { Check, Clock } from "lucide-react";
import { FC } from "react";

type PropsType = {
  messageDate: string;
  isSending: boolean;
};
const ChatMessageDate: FC<PropsType> = ({ isSending, messageDate }) => {
  return (
    <span className="text-[9px] pt-0.5 select-none font-Almarai flex justify-start items-center gap-1">
      {format(new Date(messageDate), "hh:mm aa")}
      {isSending ? <Clock className="size-3" /> : <Check className="size-3" />}
    </span>
  );
};

export default ChatMessageDate;
