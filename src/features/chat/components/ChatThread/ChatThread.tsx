import { Text, View } from "react-native";
import type { ChatMessage } from "../../chat.types";
import { styles } from "./ChatThread.styles";
import { SymbolView } from "expo-symbols";

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
            <View
              style={{ flexDirection: "row", alignSelf: "flex-end", gap: 4 }}
            >
              <Text style={styles.bubbleMeta}>
                {formatMessageTime(message.createdAt)}
              </Text>
              {isOutgoing && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SymbolView
                    name={{
                      ios: "checkmark",
                      android: "check",
                      web: "check",
                    }}
                    size={11}
                    tintColor={message.readAt ? "#34B7F1" : "#8E8E93"}
                  />
                  <SymbolView
                    name={{
                      ios: "checkmark",
                      android: "check",
                      web: "check",
                    }}
                    size={11}
                    tintColor={message.readAt ? "#34B7F1" : "#8E8E93"}
                    style={{ marginLeft: -7 }}
                  />
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
