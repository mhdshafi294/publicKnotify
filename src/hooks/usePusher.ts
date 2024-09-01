// app/hooks/usePusher.ts
"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { API_URL } from "@/lib/apiEndPoints";

export function usePusher(channelName: string) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
      authEndpoint: `${API_URL}/broadcasting/auth`,
    });

    const channel = pusher.subscribe(channelName);

    channel.bind("new-message", (data: { message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [channelName]);

  return { messages };
}
