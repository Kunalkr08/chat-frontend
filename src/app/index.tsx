import { Redirect } from "expo-router";

import { useAuth } from "@/features/auth/AuthProvider";
import { LoadingScreen } from "@/shared/components/LoadingScreen";
import { OnboardingScreen } from "@/features/onboarding/screens";
import { EmailVerificationScreen } from "@/features/onboarding/screens/EmailVerificationScreen";

export default function Index() {
  const { user, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Redirect href="/chats" />;
  }

  return <OnboardingScreen />

//   return <EmailVerificationScreen email={""} onVerifyOtp={function (otp: string): Promise<boolean> {
//       throw new Error("Function not implemented.");
//   } } onResendOtp={function (): Promise<void> {
//       throw new Error("Function not implemented.");
//   } } onGoToLogin={function (): void {
//       throw new Error("Function not implemented.");
//   } } />;
}
