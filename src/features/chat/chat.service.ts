import { io, type Socket } from "socket.io-client";
import { apiRequest } from "../../shared/api-client";
import { SOCKET_URL } from "../../shared/api-config";
import type { ChatMessage, SendMessageDto } from "./chat.types";

export type ChatSocket = Socket;

export function getChatMessages(userA: string, userB: string) {
  const query = `userA=${encodeURIComponent(userA)}&userB=${encodeURIComponent(userB)}`;
  return apiRequest<ChatMessage[]>(`/chat/messages?${query}`);
}

export function connectToChat(
  userId: string,
  onMessage: (message: ChatMessage) => void,
  onError: (message: string) => void,
) {
  if (!SOCKET_URL) {
    throw new Error(
      "Set EXPO_PUBLIC_SOCKET_URL or EXPO_PUBLIC_API_URL to connect to chat.",
    );
  }

  const socket = io(SOCKET_URL);
  socket.on("connect", () => socket.emit("join_chat", { userId }));
  socket.on("new_message", onMessage);
  socket.on("join_error", (payload: { message?: string }) => {
    onError(payload.message ?? "Unable to join chat.");
  });
  socket.on("message_error", (payload: { message?: string }) => {
    onError(payload.message ?? "Unable to send message.");
  });

  return socket;
}

export function sendChatMessage(socket: ChatSocket, dto: SendMessageDto) {
  if (!socket.connected) {
    throw new Error("Chat is reconnecting. Try sending again in a moment.");
  }

  socket.emit("send_message", dto);
}
