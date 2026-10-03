import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AuthProvider, useAuth } from "../features/auth/AuthProvider";

function AppNavigator() {
  const { user, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />

      {user ? <Redirect href="/chats" /> : <Redirect href="/profile" />}
    </>
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
