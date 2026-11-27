import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutCurrentUser,
  registerUser,
  resendVerification as resendVerificationRequest,
  verifyEmail as verifyEmailRequest,
} from "./auth.service";
import type {
  CreateUserDto,
  LoginResponse,
  LoginUserDto,
  ResendVerificationDto,
  User,
  VerifyEmailDto,
  VerificationRequestResponse,
} from "./auth.types";
import { ApiError } from "@/shared/api-client";
import { removeAccessToken, saveAccessToken } from "./auth.token.handler";

type AuthContextValue = {
  user: User | null;
  isAuthenticating: boolean;
  register: (dto: CreateUserDto) => Promise<VerificationRequestResponse>;
  resendVerification: (
    dto: ResendVerificationDto,
  ) => Promise<VerificationRequestResponse>;
  verifyEmail: (dto: VerifyEmailDto) => Promise<{ message: string }>;
  login: (dto: LoginUserDto) => Promise<LoginResponse>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getCurrentUser()
      .then((currentUser) => {
        if (isMounted) {
          setUser(currentUser);
        }
      })
      .catch((error) => {
        if (isMounted && error instanceof ApiError && error.status === 401) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsAuthenticating(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const register = async (dto: CreateUserDto) => {
    setIsAuthenticating(true);
    try {
      return await registerUser(dto);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resendVerification = async (dto: ResendVerificationDto) => {
    setIsAuthenticating(true);
    try {
      return await resendVerificationRequest(dto);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const verifyEmail = async (dto: VerifyEmailDto) => {
    setIsAuthenticating(true);

    try {
      return await verifyEmailRequest(dto);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const login = async (dto: LoginUserDto) => {
    setIsAuthenticating(true);
    try {
      const loggedInUser = await loginUser(dto);
      await saveAccessToken(loggedInUser.accessToken);
      setUser(loggedInUser.user);
      return loggedInUser;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    await logoutCurrentUser();
    await removeAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticating,
        register,
        resendVerification,
        verifyEmail,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
