import { apiUrl } from "./api-config";
import {
  getAccessToken,
  saveAccessToken,
} from "@/features/auth/auth.token.handler";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getErrorMessage(
  payload: unknown,
  statusText: string,
  status: number,
): string {
  if (typeof payload === "string") {
    return payload || statusText || `Request failed (${status})`;
  }

  if (!payload || typeof payload !== "object") {
    return statusText || `Request failed (${status})`;
  }

  const body = payload as { message?: unknown };
  const message = body.message;

  if (typeof message === "string") {
    return message;
  }

  if (Array.isArray(message)) {
    return message.filter((item) => typeof item === "string").join("\n");
  }

  if (message && typeof message === "object" && "message" in message) {
    const nestedMessage = message.message;

    if (typeof nestedMessage === "string") {
      return nestedMessage;
    }
  }

  return statusText || `Request failed (${status})`;
}

type AccessTokenResponse = {
  accessToken: string;
};

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const accessToken = await getAccessToken();

  const response = await fetch(apiUrl(path), {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  // Access token expired
  if (response.status === 401 && path !== "/auth/refresh") {
    const refreshResponse = await fetch(apiUrl("/auth/refresh"), {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      const refreshData = (await refreshResponse.json()) as AccessTokenResponse;

      await saveAccessToken(refreshData.accessToken);

      // Retry original request with new token
      return apiRequest<T>(path, options);
    }
  }

  const responseText = await response.text();

  let payload: unknown;

  try {
    payload = responseText ? JSON.parse(responseText) : undefined;
  } catch {
    payload = responseText;
  }

  if (!response.ok) {
    const message = getErrorMessage(
      payload,
      response.statusText,
      response.status,
    );

    throw new ApiError(message, response.status);
  }

  return payload as T;
}
