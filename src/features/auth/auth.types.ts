export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type CreateUserDto = {
  email: string;
  name: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User,
  accessToken: string
}

export type VerifyEmailDto = {
  email: string,
  otp: string
}

export type VerificationDeliveryStatus = "accepted" | "failed" | "cooldown";

export type VerificationRequestResponse = {
  message: string;
  deliveryStatus: VerificationDeliveryStatus;
  resendAfterSeconds: number;
};

export type ResendVerificationDto = {
  email: string;
};
