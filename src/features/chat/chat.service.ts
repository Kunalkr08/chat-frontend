import { io, type Socket } from "socket.io-client";
import { apiRequest } from "../../shared/api-client";
import { SOCKET_URL } from "../../shared/api-config";
import type { ChatMessage, MessagesReadPayload, SendMessageDto } from "./chat.types";
import { getAccessToken } from "../auth/auth.token.handler";

export type ChatSocket = Socket;

export function getChatMessages(userA: string, userB: string) {
  const query = `userA=${encodeURIComponent(userA)}&userB=${encodeURIComponent(userB)}`;
  return apiRequest<ChatMessage[]>(`/chat/messages?${query}`);
}

export async function connectToChat(
  userId: string,
  onMessage: (message: ChatMessage) => void,
  onError: (message: string) => void,
  onMessagesRead: (payload: MessagesReadPayload) => void,
) {
  if (!SOCKET_URL) {
    throw new Error(
      "Set EXPO_PUBLIC_SOCKET_URL or EXPO_PUBLIC_API_URL to connect to chat.",
    );
  }

  const accessToken = await getAccessToken();
  const socket = io(SOCKET_URL, {
    auth: {
      token: accessToken,
    },
  });
  socket.on("connect", () => socket.emit("join_chat", { userId }));
  socket.on("new_message", onMessage);
  socket.on("join_error", (payload: { message?: string }) => {
    onError(payload.message ?? "Unable to join chat.");
  });
  socket.on("message_error", (payload: { message?: string }) => {
    onError(payload.message ?? "Unable to send message.");
  });

    // Add this listener:
  socket.on("messages_read", onMessagesRead);

  return socket;
}

export function sendChatMessage(socket: ChatSocket, dto: SendMessageDto) {
  if (!socket.connected) {
    throw new Error("Chat is reconnecting. Try sending again in a moment.");
  }

  socket.emit("send_message", dto);
}

export function markMessagesRead(
  socket: ChatSocket,
  senderId: string,
) {
  if (!socket.connected) {
    throw new Error("Chat is reconnecting. Try again in a moment.");
  }

  socket.emit("mark_messages_read", { senderId }, (response: {
    success: boolean;
    updatedCount: number;
    readAt: string;
  }) => {
    if (!response?.success) {
      console.error("Failed to mark messages as read");
    }
  });
}
