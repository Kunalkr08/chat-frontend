import { apiRequest } from "../../shared/api-client";
import type { CreateUserDto, LoginUserDto, User } from "./auth.types";

export type AuthResponse = User | { user: User };
export type AccessTokenResponse = String;

function getAuthUser(response: AuthResponse): User {
  return "user" in response ? response.user : response;
}

export async function registerUser(dto: CreateUserDto) {
  return getAuthUser(
    await apiRequest<AuthResponse>("/users", {
      method: "POST",
      body: JSON.stringify(dto),
    }),
  );
}

export async function loginUser(dto: LoginUserDto) {
  return getAuthUser(
    await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(dto),
    }),
  );
}

export async function refreshAccessToken() {
  return apiRequest<AccessTokenResponse>("/auth/refresh");
}

export function getUsers() {
  return apiRequest<User[]>("/users");
}

export function getCurrentUser() {
  return apiRequest<User>("/auth/me");
}
