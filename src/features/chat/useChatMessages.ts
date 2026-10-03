import { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import {
  connectToChat,
  getChatMessages,
  sendChatMessage,
  type ChatSocket,
} from "./chat.service";
import type { ChatMessage } from "./chat.types";

function mergeMessages(current: ChatMessage[], incoming: ChatMessage[]) {
  const byId = new Map(current.map((message) => [message.id, message]));

  for (const message of incoming) {
    byId.set(message.id, message);
  }

  return [...byId.values()].sort(
    (left, right) =>
      new Date(left.createdAt).getTime() -
      new Date(right.createdAt).getTime(),
  );
}

export function useChatMessages(receiverId: string) {
  const { user } = useAuth();

  const socketRef = useRef<ChatSocket | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id || !receiverId) {
      setMessages([]);
      setIsLoading(false);
      return;
    }

    const currentUserId = user.id;

    let isActive = true;

    setMessages([]);
    setIsLoading(true);
    setIsConnected(false);
    setError("");

    let socket: ChatSocket | undefined;

    async function connect() {
      try {
        socket = await connectToChat(
          currentUserId,
          (message) => {
            const belongsToConversation =
              (message.senderId === currentUserId &&
                message.receiverId === receiverId) ||
              (message.senderId === receiverId &&
                message.receiverId === currentUserId);

            if (isActive && belongsToConversation) {
              setMessages((current) =>
                mergeMessages(current, [message]),
              );
            }
          },
          (message) => {
            if (isActive) {
              setError(message);
            }
          },
        );

        if (!isActive) {
          socket.disconnect();
          return;
        }

        socketRef.current = socket;

        socket.on("connect", () => {
          if (isActive) {
            setIsConnected(true);
          }
        });

        socket.on("disconnect", () => {
          if (isActive) {
            setIsConnected(false);
          }
        });

        socket.on("connect_error", (cause: Error) => {
          if (isActive) {
            setError(
              cause.message || "Unable to connect to chat.",
            );
          }
        });
      } catch (cause) {
        if (isActive) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Unable to connect to chat.",
          );
        }
      }
    }

    connect();

    getChatMessages(user.id, receiverId)
      .then((result) => {
        if (isActive) {
          setMessages((current) =>
            mergeMessages(current, result),
          );
        }
      })
      .catch((cause: unknown) => {
        if (isActive) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Unable to load messages.",
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;

      socketRef.current = null;

      socket?.disconnect();
    };
  }, [receiverId, user?.id]);

  const send = (content: string) => {
    if (!user?.id || !receiverId) {
      throw new Error("Sign in to send messages.");
    }

    if (!socketRef.current) {
      throw new Error(
        "Chat is still connecting. Try again in a moment.",
      );
    }

    sendChatMessage(socketRef.current, {
      receiverId,
      content,
    });
  };

  return {
    messages,
    isLoading,
    isConnected,
    error,
    send,
  };
}
