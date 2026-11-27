import { useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { useAuth } from "@/features/auth/AuthProvider";
import type { VerificationDeliveryStatus } from "@/features/auth/auth.types";
import { EmailVerificationScreen } from "@/features/onboarding/screens/EmailVerificationScreen";

export default function EmailVerificationRoute() {
  const {
    email: rawEmail,
    deliveryStatus: rawDeliveryStatus,
    retryAfterSeconds,
  } = useLocalSearchParams<{
    email?: string | string[];
    deliveryStatus?: string | string[];
    retryAfterSeconds?: string | string[];
  }>();

  const email = Array.isArray(rawEmail) ? rawEmail[0] ?? "" : rawEmail ?? "";
  const rawStatus = Array.isArray(rawDeliveryStatus)
    ? rawDeliveryStatus[0]
    : rawDeliveryStatus;
  const deliveryStatus: VerificationDeliveryStatus | undefined =
    rawStatus === "accepted" ||
    rawStatus === "failed" ||
    rawStatus === "cooldown"
      ? rawStatus
      : undefined;
  const rawDelay = Array.isArray(retryAfterSeconds)
    ? retryAfterSeconds[0]
    : retryAfterSeconds;
  const parsedDelay = Number(rawDelay ?? 0);
  const initialResendAfterSeconds = Number.isFinite(parsedDelay)
    ? Math.max(0, parsedDelay)
    : 0;

  const { verifyEmail, resendVerification } = useAuth();

  const handleVerifyOtp = useCallback(
    async (otp: string): Promise<boolean> => {
      await verifyEmail({ email, otp });
      return true;
    },
    [email, verifyEmail],
  );

  const handleResendOtp = useCallback(
    () => resendVerification({ email }),
    [email, resendVerification],
  );

  const handleGoToLogin = useCallback(() => {
    router.replace("/auth");
  }, []);

  return (
    <EmailVerificationScreen
      email={email}
      initialDeliveryStatus={deliveryStatus}
      initialResendAfterSeconds={initialResendAfterSeconds}
      onVerifyOtp={handleVerifyOtp}
      onResendOtp={handleResendOtp}
      onGoToLogin={handleGoToLogin}
    />
  );
}
