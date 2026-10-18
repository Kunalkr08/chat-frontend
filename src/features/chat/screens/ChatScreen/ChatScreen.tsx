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
import { Dropdown } from "@/shared/components/Dropdown";
import { useAuth } from "@/features/auth/AuthProvider";

export function ChatScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Chats");
  const [search, setSearch] = useState("");
  const { users, isLoading, error } = useChatUsers();
  const conversations = users.map(toConversation);
  const visibleConversations = filterConversations(
    conversations,
    search,
    activeFilter,
  );
  const { logout } = useAuth();

  const options = [
    {
      label: "Profile",
      value: "profile",
    },
    {
      label: "Logout",
      value: "logout",
      danger: true,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Connectify</Text>
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
              <Pressable
                onPress={() => setIsDropdownOpen(true)}
                style={{ padding: 8 }}
              >
                <SymbolView
                  name={{
                    ios: "ellipsis",
                    android: "more_vert",
                    web: "more_vert",
                  }}
                  tintColor="#FFFFFF"
                  size={23}
                />
              </Pressable>

              <Dropdown
                visible={isDropdownOpen}
                options={options}
                onClose={() => setIsDropdownOpen(false)}
                onSelect={async (value) => {
                  if (value === "profile") {
                    router.push("/profile");
                  } else if (value === "logout") {
                    await logout();
                    router.replace("/");
                  }
                }}
              />
            </View>
          </View>
          <ChatTabs activeTab={activeTab} onChangeTab={setActiveTab} />
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
                    params: {
                      id: conversation.id,
                      name: conversation.name,
                      initials: conversation.initials,
                      color: conversation.color,
                      preview: conversation.preview ?? "",
                      avatar: conversation.avatar ?? ""
                    },
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
