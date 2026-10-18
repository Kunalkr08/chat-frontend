import { apiRequest } from "../../shared/api-client";
import type {
  CreateUserDto,
  LoginResponse,
  LoginUserDto,
  User,
  VerifyEmailDto,
} from "./auth.types";

export type AuthResponse = User | { user: User };
export type AccessTokenResponse = String;
export type VerifyEmailResponse = {
  message: string;
};
export type RegisterResponse = {
  message: string;
};
type LogoutResponse = {
  message: string;
};

function getAuthUser(response: AuthResponse): User {
  return "user" in response ? response.user : response;
}

export async function registerUser(dto: CreateUserDto) {
  console.log("Starting user registration.");
  const result = await apiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(dto),
  });
  console.log("User register successfully.", result);
  return result;
}

export async function loginUser(dto: LoginUserDto): Promise<LoginResponse> {
  console.log("Starting user login");
  const result = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(dto),
  });
  console.log("user logged in successfully", result);
  return result;
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

export function logoutCurrentUser() {
  return apiRequest<LogoutResponse>("/auth/logout", {
    method: "POST",
  });
}

export function verifyEmail(dto: VerifyEmailDto) {
  return apiRequest<VerifyEmailResponse>("auth/verify-email", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
