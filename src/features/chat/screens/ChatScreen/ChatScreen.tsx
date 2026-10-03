import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatTabs, ConversationRow } from "../../components";
import { useChatUsers } from "../../useChatUsers";
import { filterConversations, toConversation } from "../../utils";
import { styles } from "./ChatScreen.styles";

export function ChatScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Chats");
  const [search, setSearch] = useState("");
  const { users, isLoading, error } = useChatUsers();
  const conversations = users.map(toConversation);
  const visibleConversations = filterConversations(
    conversations,
    search,
    activeFilter,
  );

  console.log("users..", users)

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>WhatsApp</Text>
            <View style={styles.headerActions}>
              <SymbolView
                name={{
                  ios: "camera.fill",
                  android: "photo_camera",
                  web: "photo_camera",
                }}
                tintColor="#FFFFFF"
                size={22}
              />
              <SymbolView
                name={{
                  ios: "magnifyingglass",
                  android: "search",
                  web: "search",
                }}
                tintColor="#FFFFFF"
                size={22}
              />
              <SymbolView
                name={{
                  ios: "ellipsis",
                  android: "more_vert",
                  web: "more_vert",
                }}
                tintColor="#FFFFFF"
                size={23}
              />
            </View>
          </View>
          <ChatTabs activeTab={activeTab} onChangeTab={setActiveTab} />
          {/* <View style={styles.searchBox}>
            <SymbolView
              name={{
                ios: "magnifyingglass",
                android: "search",
                web: "search",
              }}
              tintColor="#667781"
              size={20}
              style={styles.searchIcon}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="#9A958B"
              style={styles.searchInput}
            />
            <Text style={styles.searchShortcut}>⌘ K</Text>
          </View> */}
          <View style={styles.conversationList}>
            {isLoading && (
              <Text style={styles.emptyState}>Loading users...</Text>
            )}
            {!isLoading && error ? (
              <Text style={styles.emptyState}>{error}</Text>
            ) : null}
            {visibleConversations.map((conversation) => (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
                onPress={() =>
                  router.push({
                    pathname: "/chat/[id]",
                    params: { id: conversation.id },
                  })
                }
              />
            ))}
            {!isLoading && !error && visibleConversations.length === 0 && (
              <Text style={styles.emptyState}>No conversations found</Text>
            )}
          </View>
        </ScrollView>
        <Pressable style={styles.fab} accessibilityLabel="Start new chat">
          <Text style={styles.fabText}>✎</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
