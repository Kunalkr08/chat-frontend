import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
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
import { LoadingScreen } from "@/shared/components/LoadingScreen";

export function ChatConversationScreen() {
  const params = useLocalSearchParams<{
    id: string;
    name?: string;
    avatar?: string;
    color?: string;
    initials?: string;
    preview?: string;
  }>();

  const id = params.id;
  const { user } = useAuth();

  const {
    users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useChatUsers();

  const { messages, isLoading, error, send, markIncomingMessagesAsRead } =
    useChatMessages(id);

  const messageScrollRef = useRef<Animated.ScrollView>(null);
  const hasScrolledToLatestMessage = useRef(false);

  const contact = users.find((item) => item.id === id);
  const fetchedConversation = contact ? toConversation(contact) : undefined;

  const conversation =
    fetchedConversation ??
    (params.name
      ? {
          name: params.name,
          initials:
            params.initials ??
            params.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
          color: params.color ?? "#8696A0",
          preview: params.preview ?? "",
          avatar: params.avatar ?? "",
        }
      : undefined);

  const [message, setMessage] = useState("");
  const [sendError, setSendError] = useState("");

  const isMessagesLoading = isLoading;
  const isContactUnavailable = !conversation && !isUsersLoading;

  const scrollToLatestMessage = () => {
    if (isMessagesLoading) return;

    messageScrollRef.current?.scrollToEnd({
      animated: hasScrolledToLatestMessage.current,
    });

    hasScrolledToLatestMessage.current = true;
  };

  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    try {
      await send(trimmedMessage);
      setMessage("");
      setSendError("");
    } catch (cause) {
      setSendError(
        cause instanceof Error ? cause.message : "Unable to send message.",
      );
    }
  };

  useEffect(() => {
    if (!id || isLoading || !fetchedConversation) return;

    markIncomingMessagesAsRead();
  }, [id, isLoading, fetchedConversation, markIncomingMessagesAsRead]);

  const composer = (
    <ChatComposer
      message={message}
      onChangeMessage={setMessage}
      onSend={sendMessage}
    />
  );

  const messagesContent = (
    <>
      {isMessagesLoading ? (
        <LoadingScreen />
      ) : isContactUnavailable ? (
        <Text style={styles.emptyState}>
          {usersError || "Conversation not found"}
        </Text>
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
            style={[
              styles.chatAvatar,
              { backgroundColor: conversation?.color ?? "#8696A0" },
            ]}
          >
            {conversation?.avatar ? (
              <Text style={styles.avatarText}>{conversation.initials}</Text>
            ) : (
              <Text style={styles.avatarText}>
                {conversation?.initials ?? ""}
              </Text>
            )}
          </View>

          <View style={styles.chatHeaderCopy}>
            <Text style={styles.chatName} numberOfLines={1}>
              {conversation?.name ?? "Loading conversation..."}
            </Text>

            <Text style={styles.chatStatus} numberOfLines={1}>
              {conversation?.preview ?? ""}
            </Text>
          </View>

          <SymbolView
            name={{
              ios: "video.fill",
              android: "videocam",
              web: "videocam",
            }}
            tintColor="#FFFFFF"
            size={21}
            style={styles.chatAction}
          />

          <SymbolView
            name={{
              ios: "phone.fill",
              android: "call",
              web: "call",
            }}
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
