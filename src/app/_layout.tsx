import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AuthProvider, useAuth } from "../features/auth/AuthProvider";
import { LoadingScreen } from "@/shared/components/LoadingScreen";

function AppNavigator() {
  const { user, isAuthenticating } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticating) return;

    const currentRoute = segments[0];

    if (user && (currentRoute === "auth" || currentRoute === undefined)) {
      router.replace("/chats");
    } else if (
      !user &&
      ["chats", "profile", "chat"].includes(String(currentRoute))
    ) {
      router.replace("/"); // Go to onboarding after logout
    }
  }, [user, isAuthenticating, segments, router]);

  if (isAuthenticating) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        contentStyle: { backgroundColor: "#FFFFFF" },
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <KeyboardProvider>
        <StatusBar style="dark" hidden={false} />
        <AppNavigator />
      </KeyboardProvider>
    </AuthProvider>
  );
}
