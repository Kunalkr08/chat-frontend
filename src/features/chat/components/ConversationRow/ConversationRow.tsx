import { Pressable, Text, View } from "react-native";
import type { Conversation } from "../../data/chat-data";
import { styles } from "./ConversationRow.styles";

type Props = {
  conversation: Conversation;
  onPress: () => void;
};

export function ConversationRow({ conversation, onPress }: Props) {
  return (
    <Pressable style={styles.conversation} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: conversation.color }]}>
        <Text style={styles.avatarText}>{conversation.initials}</Text>
        {conversation.online && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.conversationCopy}>
        <View style={styles.nameLine}>
          <Text style={styles.name}>{conversation.name}</Text>
          {conversation.label && (
            <Text style={styles.groupLabel}>{conversation.label}</Text>
          )}
        </View>
        <Text
          numberOfLines={1}
          style={[
            styles.preview,
            Boolean(conversation.unread) && styles.unreadPreview,
          ]}
        >
          {conversation.preview}
        </Text>
      </View>
      <View style={styles.conversationMeta}>
        <Text
          style={[
            styles.time,
            Boolean(conversation.unread) && styles.unreadTime,
          ]}
        >
          {conversation.time}
        </Text>
        {conversation.unread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{conversation.unread}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
