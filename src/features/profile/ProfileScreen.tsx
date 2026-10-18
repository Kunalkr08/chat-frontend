import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./profileScreen.style";
import { useAuth } from "../auth/AuthProvider";

function getFirstName(name: string | undefined): string {
  if (!name) return "";
  const names = name.split(" ");
  return names[0];
}

export function ProfileScreen() {
  const { user } = useAuth();
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <SymbolView
              name={{
                ios: "chevron.left",
                android: "arrow_back",
              }}
              size={22}
              tintColor="#FFFFFF"
            />
          </Pressable>

          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Profile picture */}
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <SymbolView
                name={{
                  ios: "person.crop.circle.fill",
                  android: "account_circle",
                  web: "account_circle",
                }}
                size={120}
                tintColor="#8696A0"
              />
            </View>

            <Pressable style={styles.cameraButton}>
              <SymbolView
                name={{
                  ios: "camera.fill",
                  android: "photo_camera",
                  web: "photo_camera",
                }}
                size={20}
                tintColor="#FFFFFF"
              />
            </Pressable>

            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.username}>@{getFirstName(user?.name)}</Text>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>

            <View style={styles.infoRow}>
              <SymbolView name="text.bubble" size={23} tintColor="#667781" />

              <View style={styles.infoContent}>
                <Text style={styles.infoText}>Available</Text>
              </View>

              {/* <Pressable>
                <SymbolView name="pencil" size={19} tintColor="#667781" />
              </Pressable> */}
            </View>
          </View>

          {/* Personal information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal information</Text>

            {/* Phone */}
            {/* <View style={styles.infoRow}>
              <SymbolView name="phone" size={22} tintColor="#667781" />

              <View style={styles.infoContent}>
                <Text style={styles.infoText}>+91 98765 43210</Text>
                <Text style={styles.infoLabel}>Phone</Text>
              </View>

              <Pressable>
                <SymbolView name="pencil" size={19} tintColor="#667781" />
              </Pressable>
            </View> */}

            {/* Email */}
            <View style={styles.infoRow}>
              <SymbolView name="envelope" size={22} tintColor="#667781" />

              <View style={styles.infoContent}>
                <Text style={styles.infoText}>{user?.email}</Text>
                <Text style={styles.infoLabel}>Email</Text>
              </View>

              {/* <Pressable>
                <SymbolView name="pencil" size={19} tintColor="#667781" />
              </Pressable> */}
            </View>

            {/* Username */}
            <View style={styles.infoRow}>
              <SymbolView name="at" size={22} tintColor="#667781" />

              <View style={styles.infoContent}>
                <Text style={styles.infoText}>@{getFirstName(user?.name)}</Text>
                <Text style={styles.infoLabel}>Username</Text>
              </View>

              {/* <Pressable>
                <SymbolView name="pencil" size={19} tintColor="#667781" />
              </Pressable> */}
            </View>
          </View>

          {/* Account actions
          <View style={styles.actions}>
            <Pressable style={styles.actionRow}>
              <SymbolView name="lock" size={22} tintColor="#667781" />
              <Text style={styles.actionText}>Privacy</Text>
            </Pressable>

            <Pressable style={styles.actionRow}>
              <SymbolView name="shield" size={22} tintColor="#667781" />
              <Text style={styles.actionText}>Security</Text>
            </Pressable>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
