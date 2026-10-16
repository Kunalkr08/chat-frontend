import { Redirect } from "expo-router";

import { useAuth } from "@/features/auth/AuthProvider";
import { LoadingScreen } from "@/shared/components/LoadingScreen";
import { OnboardingScreen } from "@/features/onboarding/screens";

export default function Index() {
  const { user, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Redirect href="/chats" />;
  }

  return <OnboardingScreen />;
}
