"use client";

import { useEffect, useRef } from "react";
import Pusher, { Channel } from "pusher-js";
import { API_URL } from "@/lib/apiEndPoints";
import { useSession } from "next-auth/react";

export function usePusher(channelName: string) {
  const { data: session } = useSession();
  const token = session?.user?.access_token;

  const pusherClientRef = useRef<Pusher | null>(null);
  const channelRef = useRef<Channel | null>(null);

  useEffect(() => {
    if (!pusherClientRef.current) {
      pusherClientRef.current = new Pusher(
        process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
          authEndpoint: `${API_URL}/broadcasting/auth`,
          auth: {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        }
      );
    }

    if (!channelRef.current) {
      channelRef.current = pusherClientRef.current.subscribe(channelName);
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null; // Clear channel reference
      }
      // Optionally, you can clear the pusherClientRef if you know the client should not be reused
      // pusherClientRef.current = null;
    };
  }, [channelName, token]);

  return { pusherClient: pusherClientRef.current, channel: channelRef.current };
}