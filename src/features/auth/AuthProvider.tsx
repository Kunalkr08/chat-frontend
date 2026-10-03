import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { getCurrentUser, getUsers, loginUser, registerUser } from "./auth.service";
import type { CreateUserDto, LoginUserDto, User } from "./auth.types";
import { ApiError } from "@/shared/api-client";

type AuthContextValue = {
  user: User | null;
  isAuthenticating: boolean;
  register: (dto: CreateUserDto) => Promise<User>;
  login: (dto: LoginUserDto) => Promise<User>;
  logout: () => void;
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

    try {
      const createdUser = await registerUser(dto);
      setUser(createdUser);
      return createdUser;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const login = async (dto: LoginUserDto) => {
    setIsAuthenticating(true);

    try {
      const loggedInUser = await loginUser(dto);
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticating,
        register,
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
