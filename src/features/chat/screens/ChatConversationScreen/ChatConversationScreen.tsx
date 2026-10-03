import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import {
  KeyboardChatScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../auth/AuthProvider";
import { ChatComposer, ChatThread } from "../../components";
import { useChatMessages } from "../../useChatMessages";
import { useChatUsers } from "../../useChatUsers";
import { toConversation } from "../../utils";
import { styles } from "./ChatConversationScreen.styles";

export function ChatConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const {
    users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useChatUsers();
  const { messages, isLoading, error, send } = useChatMessages(id);
  const messageScrollRef = useRef<Animated.ScrollView>(null);
  const hasScrolledToLatestMessage = useRef(false);
  const contact = users.find((item) => item.id === id);
  const conversation = contact ? toConversation(contact) : undefined;
  const [message, setMessage] = useState("");
  const [sendError, setSendError] = useState("");

  const scrollToLatestMessage = () => {
    if (isLoading) return;

    messageScrollRef.current?.scrollToEnd({
      animated: hasScrolledToLatestMessage.current,
    });
    hasScrolledToLatestMessage.current = true;
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    try {
      send(trimmedMessage);
      setMessage("");
      setSendError("");
    } catch (cause) {
      setSendError(
        cause instanceof Error ? cause.message : "Unable to send message.",
      );
    }
  };

  if (!conversation && isUsersLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.emptyState}>Loading conversation...</Text>
      </SafeAreaView>
    );
  }

  if (!conversation) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
        <Text style={styles.emptyState}>
          {usersError || "Conversation not found"}
        </Text>
      </SafeAreaView>
    );
  }
  const composer = (
    <ChatComposer
      message={message}
      onChangeMessage={setMessage}
      onSend={sendMessage}
    />
  );
  const messagesContent = (
    <>
      {isLoading ? (
        <Text style={styles.emptyState}>Loading messages...</Text>
      ) : (
        <ChatThread messages={messages} currentUserId={user?.id ?? ""} />
      )}
      {error ? <Text style={styles.emptyState}>{error}</Text> : null}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <View
            style={[styles.chatAvatar, { backgroundColor: conversation.color }]}
          >
            <Text style={styles.avatarText}>{conversation.initials}</Text>
          </View>
          <View style={styles.chatHeaderCopy}>
            <Text style={styles.chatName}>{conversation.name}</Text>
            <Text style={styles.chatStatus}>{conversation.preview}</Text>
          </View>
          <SymbolView
            name={{ ios: "video.fill", android: "videocam", web: "videocam" }}
            tintColor="#FFFFFF"
            size={21}
            style={styles.chatAction}
          />
          <SymbolView
            name={{ ios: "phone.fill", android: "call", web: "call" }}
            tintColor="#FFFFFF"
            size={20}
            style={styles.chatAction}
          />
          <SymbolView
            name={{
              ios: "ellipsis",
              android: "more_vert",
              web: "more_vert",
            }}
            tintColor="#FFFFFF"
            size={22}
            style={styles.chatAction}
          />
        </View>
        {Platform.OS === "web" ? (
          <ScrollView
            style={styles.messageScroll}
            contentContainerStyle={styles.messageContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {messagesContent}
          </ScrollView>
        ) : (
          <KeyboardChatScrollView
            ref={messageScrollRef}
            style={styles.messageScroll}
            contentContainerStyle={styles.messageContent}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={
              Platform.OS === "ios" ? "interactive" : "on-drag"
            }
            keyboardShouldPersistTaps="handled"
            keyboardLiftBehavior="always"
            onContentSizeChange={scrollToLatestMessage}
          >
            {messagesContent}
          </KeyboardChatScrollView>
        )}
        {sendError ? <Text style={styles.emptyState}>{sendError}</Text> : null}
        {Platform.OS === "web" ? (
          composer
        ) : (
          <KeyboardStickyView>{composer}</KeyboardStickyView>
        )}
      </View>
    </SafeAreaView>
  );
}
