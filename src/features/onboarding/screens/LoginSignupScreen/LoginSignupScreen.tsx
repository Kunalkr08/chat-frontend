
import { useAuth } from "@/features/auth/AuthProvider";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from "./LoginSignuoScreen.styles";

export function LoginSignupScreen() {
  const { isAuthenticating, login, register } = useAuth();

  const [mode, setMode] = useState<"register" | "login">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Enter your email and password.");
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setError("Enter your name to create an account.");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }
    }

    try {
      if (mode === "register") {
        await register({
          name: name.trim(),
          email: normalizedEmail,
          password,
        });

        router.push({
          pathname: "/email-verification",
          params: { email: normalizedEmail },
        });

        return;
      }

      await login({
        email: normalizedEmail,
        password,
      });

      router.replace("/chats");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to continue. Please try again.",
      );
    }
  };

  const submitButton = (
    <Pressable
      onPress={submit}
      style={[
        styles.primaryButton,
        isAuthenticating && styles.disabledButton,
      ]}
      disabled={isAuthenticating}
      accessibilityRole="button"
    >
      {isAuthenticating ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.primaryButtonText}>
          {mode === "register" ? "Create account" : "Sign in"}
        </Text>
      )}
    </Pressable>
  );

  const formContent = (
    <>
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <Text style={styles.backText}>‹</Text>
      </Pressable>

      <Text style={styles.profileTitle}>
        {mode === "register" ? "Create your profile" : "Welcome back"}
      </Text>

      <Text style={styles.profileBody}>
        {mode === "register"
          ? "Add your details to get started."
          : "Sign in to continue to your chats."}
      </Text>

      <Pressable
        onPress={() => {
          setError("");
          setMode((current) =>
            current === "register" ? "login" : "register",
          );
        }}
        style={styles.modeSwitch}
        accessibilityRole="button"
      >
        <Text style={styles.modeSwitchText}>
          {mode === "register"
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </Text>
      </Pressable>

      {mode === "register" && (
        <>
          <Pressable
            style={styles.avatarButton}
            accessibilityLabel="Add profile photo"
            accessibilityRole="button"
          >
            <Text style={styles.avatarText}>
              {name.trim()
                ? name.trim().slice(0, 2).toUpperCase()
                : "＋"}
            </Text>

            <View style={styles.cameraBadge}>
              <Text style={styles.cameraText}>⌾</Text>
            </View>
          </Pressable>

          <Text style={styles.label}>Your name</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Type your name"
            placeholderTextColor="#8696A0"
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            textContentType="name"
          />
        </>
      )}

      <Text style={styles.label}>Email</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        placeholderTextColor="#8696A0"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
        returnKeyType="next"
      />

      <Text style={styles.label}>Password</Text>

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#8696A0"
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType={
          mode === "register" ? "newPassword" : "password"
        }
        returnKeyType="go"
        onSubmitEditing={submit}
      />

      {error ? (
        <Text accessibilityRole="alert" style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      <View style={styles.profileButton}>{submitButton}</View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.screen}>
        {Platform.OS === "web" ? (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[
              styles.profileTop,
              {
                flexGrow: 1,
                paddingBottom: 32,
              },
            ]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            {formContent}
          </ScrollView>
        ) : (
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[
              styles.profileTop,
              {
                flexGrow: 1,
                paddingBottom: 32,
              },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bottomOffset={24}
          >
            {formContent}
          </KeyboardAwareScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
