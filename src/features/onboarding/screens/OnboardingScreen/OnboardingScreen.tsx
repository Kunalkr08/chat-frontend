import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./OnboardingScreen.styles";

export function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <Text style={styles.language}>English ▾</Text>
        <View style={styles.hero}>
          <View style={styles.logoCircle}>
            <View style={styles.logoBubble}>
              <Text style={styles.logoText}>☎</Text>
            </View>
          </View>
          <Text style={styles.title}>Welcome to WhatsApp</Text>
          <Text style={styles.body}>
            Message your friends and family privately and securely. Connect with
            the people who matter most.
          </Text>
        </View>
        <Text style={styles.privacy}>
          By tapping Agree and continue, you agree to our{" "}
          <Text style={styles.privacyLink}>Terms of Service</Text> and{" "}
          <Text style={styles.privacyLink}>Privacy Policy</Text>.
        </Text>
        <Pressable
          onPress={() => router.push("/profile")}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Agree and continue</Text>
        </Pressable>
        <Text style={styles.version}>from Meta</Text>
      </View>
    </SafeAreaView>
  );
}
