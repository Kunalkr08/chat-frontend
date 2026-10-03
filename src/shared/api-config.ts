import { Platform } from "react-native";

const trimTrailingSlash = (value: string) =>
  value.replace(/\/+$/, "");

const localApiUrl =
  Platform.OS === "android"
    ? "http://10.108.98.180:3000"
    : "http://localhost:3000";

export const API_BASE_URL = trimTrailingSlash(
  process.env.EXPO_PUBLIC_API_URL || localApiUrl,
);

export const SOCKET_URL = trimTrailingSlash(
  process.env.EXPO_PUBLIC_SOCKET_URL || API_BASE_URL,
);

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
