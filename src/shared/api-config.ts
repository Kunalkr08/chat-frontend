const trimTrailingSlash = (value: string) =>
  value.replace(/\/+$/, "");

const apiUrlFromEnv = process.env.EXPO_PUBLIC_API_URL;
const socketUrlFromEnv = process.env.EXPO_PUBLIC_SOCKET_URL;

if (!apiUrlFromEnv) {
  throw new Error("EXPO_PUBLIC_API_URL is not configured");
}

export const API_BASE_URL = trimTrailingSlash(apiUrlFromEnv);

export const SOCKET_URL = trimTrailingSlash(
  socketUrlFromEnv || API_BASE_URL,
);

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
