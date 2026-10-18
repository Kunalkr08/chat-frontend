import { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./EmailVerification.styles";

const GREEN = "#25D366";
const DARK_GREEN = "#075E54";
const BACKGROUND = "#F7F9FA";

interface EmailVerificationScreenProps {
  email: string;
  onVerifyOtp: (otp: string) => Promise<boolean>;
  onResendOtp: () => Promise<void>;
  onGoToLogin: () => void;
}

const OTP_LENGTH = 4;

export function EmailVerificationScreen({
  email,
  onVerifyOtp,
  onResendOtp,
  onGoToLogin,
}: EmailVerificationScreenProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const otpValue = otp.join("");
  const isOtpComplete = otpValue.length === OTP_LENGTH;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onGoToLogin();
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [success, onGoToLogin]);

  const handleOtpChange = (text: string, index: number) => {
    setError("");

    // Keep only numeric characters and allow one digit.
    const digit = text.replace(/\D/g, "").slice(0, 1);;

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);

    // Move to the next field after entering a digit.
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Close the keyboard after the fourth digit.
    if (digit && index === OTP_LENGTH - 1) {
      Keyboard.dismiss();
      inputRefs.current[index]?.blur();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (!isOtpComplete || loading) {
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setError("");

    try {
      const isValid = await onVerifyOtp(otpValue);

      if (isValid) {
        setSuccess(true);
      } else {
        setError("Invalid OTP. Please check and try again.");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resending) {
      return;
    }

    setResending(true);
    setError("");

    try {
      await onResendOtp();
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch {
      setError("Unable to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  if (success) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND} />

        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successCheck}>✓</Text>
          </View>

          <Text style={styles.successTitle}>Email verified!</Text>

          <Text style={styles.successDescription}>
            Your email has been verified successfully. You can now log in to
            Connectify.
          </Text>

          <ActivityIndicator
            size="small"
            color={DARK_GREEN}
            style={styles.successLoader}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.container}>
            {/* Brand */}
            <View style={styles.brandContainer}>
              <View style={styles.brandIcon}>
                <Text style={styles.brandIconText}>C</Text>
              </View>

              <Text style={styles.brandName}>Connectify</Text>
            </View>

            {/* Email illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationCircle}>
                <Text style={styles.envelopeIcon}>✉</Text>

                <View style={styles.checkBadge}>
                  <Text style={styles.checkBadgeText}>✓</Text>
                </View>
              </View>
            </View>

            {/* Heading */}
            <Text style={styles.title}>Verify your email</Text>

            <Text style={styles.description}>
              We've sent a 4-digit verification code to
            </Text>

            <Text style={styles.email}>{email}</Text>

            {/* OTP inputs */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="default"
                  maxLength={1}
                  selectionColor={GREEN}
                  cursorColor={GREEN}
                  selectTextOnFocus
                  editable={!loading}
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null,
                  ]}
                  textContentType="oneTimeCode"
                  accessibilityLabel={`OTP digit ${index + 1}`}
                />
              ))}
            </View>

            <Text style={styles.helperText}>
              Enter the 4-digit code to verify your account.
            </Text>

            {/* Error */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Verify */}
            <Pressable
              onPress={handleVerify}
              disabled={!isOtpComplete || loading}
              style={({ pressed }) => [
                styles.verifyButton,
                (!isOtpComplete || loading) && styles.verifyButtonDisabled,
                pressed && isOtpComplete && !loading
                  ? styles.verifyButtonPressed
                  : null,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify email</Text>
              )}
            </Pressable>

            {/* Resend */}
            {/* <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the code? </Text>

              <Pressable
                onPress={handleResendOtp}
                disabled={resending}
                hitSlop={8}
              >
                {resending ? (
                  <ActivityIndicator size="small" color={DARK_GREEN} />
                ) : (
                  <Text style={styles.resendButton}>Resend OTP</Text>
                )}
              </Pressable>
            </View> */}

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.footerLine} />

              <Text style={styles.footerText}>
                Secure verification powered by Connectify
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
