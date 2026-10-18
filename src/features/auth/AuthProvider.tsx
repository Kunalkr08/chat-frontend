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
  verifyEmail as verifyEmailRequest,
} from "./auth.service";
import type {
  CreateUserDto,
  LoginResponse,
  LoginUserDto,
  User,
  VerifyEmailDto,
} from "./auth.types";
import { ApiError } from "@/shared/api-client";
import { removeAccessToken, saveAccessToken } from "./auth.token.handler";

type AuthContextValue = {
  user: User | null;
  isAuthenticating: boolean;
  register: (dto: CreateUserDto) => Promise<{ message: string }>;
  verifyEmail: (dto: VerifyEmailDto) => Promise<{ message: string }>;
  login: (dto: LoginUserDto) => Promise<LoginResponse>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setUser(null);
      }
    } finally {
      setIsAuthenticating(false);
    }
  }

  const register = async (dto: CreateUserDto) => {
    setIsAuthenticating(true);
    console.log("logs from register");
    try {
      return await registerUser(dto);
    } finally {
      console.log("log after register");
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
