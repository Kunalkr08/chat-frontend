import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AuthProvider, useAuth } from "../features/auth/AuthProvider";

function AppNavigator() {
  const { user, isAuthenticating } = useAuth();
  if (isAuthenticating) {
    return null;
  }
  if (user) {
    return <Redirect href="/chats" />;
  }
  return <Redirect href="/profile" />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <KeyboardProvider>
        <StatusBar style="light" hidden={false} />

        <AppNavigator />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
      </KeyboardProvider>
    </AuthProvider>
  );
}
