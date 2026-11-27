import { apiRequest } from "../../shared/api-client";
import type {
  CreateUserDto,
  LoginResponse,
  LoginUserDto,
  User,
  VerifyEmailDto,
  ResendVerificationDto,
  VerificationRequestResponse,
} from "./auth.types";

export type AccessTokenResponse = string;
export type VerifyEmailResponse = {
  message: string;
};
type LogoutResponse = {
  message: string;
};

export function registerUser(dto: CreateUserDto) {
  return apiRequest<VerificationRequestResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export function resendVerification(dto: ResendVerificationDto) {
  return apiRequest<VerificationRequestResponse>("/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify(dto),
  });
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
