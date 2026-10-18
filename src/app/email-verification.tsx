import { useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { useAuth } from "@/features/auth/AuthProvider";
import { EmailVerificationScreen } from "@/features/onboarding/screens/EmailVerificationScreen";

export default function EmailVerificationRoute() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { verifyEmail } = useAuth();

  const handleVerifyOtp = useCallback(
    async (otp: string): Promise<boolean> => {
      await verifyEmail({
        email: email ?? "",
        otp,
      });

      return true;
    },
    [email, verifyEmail],
  );

  const handleResendOtp = useCallback(async () => {
    throw new Error("Resending OTP is not available yet.");
  }, []);

  const handleGoToLogin = useCallback(() => {
    router.replace("/auth");
  }, []);

  return (
    <EmailVerificationScreen
      email={email ?? ""}
      onVerifyOtp={handleVerifyOtp}
      onResendOtp={handleResendOtp}
      onGoToLogin={handleGoToLogin}
    />
  );
}
