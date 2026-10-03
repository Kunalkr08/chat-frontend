import { apiRequest } from "../../shared/api-client";
import type { CreateUserDto, LoginResponse, LoginUserDto, User } from "./auth.types";

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

export async function loginUser(dto: LoginUserDto): Promise<LoginResponse> {
  return await apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(dto),
    });
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
