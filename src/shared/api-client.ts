import { apiUrl } from "./api-config";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const responseText = await response.text();
  let payload: unknown;

  try {
    payload = responseText ? JSON.parse(responseText) : undefined;
  } catch {
    payload = responseText;
  }

  if (!response.ok) {
    const body = payload as { message?: string | string[] } | undefined;
    const message = Array.isArray(body?.message)
      ? body.message.join("\n")
      : body?.message || response.statusText || "Request failed";
    throw new ApiError(message, response.status);
  }

  return payload as T;
}
