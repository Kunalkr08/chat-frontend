export type ChatMessage = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
};

export type SendMessageDto = {
  receiverId: string;
  content: string;
};
