import { Text, View } from "react-native";
import type { ChatMessage } from "../../chat.types";
import { styles } from "./ChatThread.styles";

type Props = { messages: ChatMessage[]; currentUserId: string };

function formatMessageTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function ChatThread({ messages, currentUserId }: Props) {
  return (
    <View style={styles.messageList}>
      {messages.map((message) => {
        const isOutgoing = message.senderId === currentUserId;
        return (
          <View
            key={message.id}
            style={isOutgoing ? styles.outgoingBubble : styles.incomingBubble}
          >
            <Text style={styles.bubbleText}>{message.content}</Text>
            <Text style={styles.bubbleMeta}>
              {formatMessageTime(message.createdAt)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
