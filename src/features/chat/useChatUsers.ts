import { useEffect, useState } from "react";
import { getUsers } from "../auth/auth.service";
import type { User } from "../auth/auth.types";
import { useAuth } from "../auth/AuthProvider";

export function useChatUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
      let isActive = true;
      
      if (!currentUser) {
          console.log("Hehehheh..")
          setUsers([]);
          setIsLoading(false);
          setError("Sign in to load users.");
          return () => {
              isActive = false;
            };
        }
        console.log("currentUser..", currentUser);
        
        setIsLoading(true);
        setError("");
        getUsers()
        .then((result) => {
            if (isActive) {
                setUsers(result.filter((item) => item.id !== currentUser.id));
            }
        })
        .catch((cause: unknown) => {
            if (isActive) {
                setError(
                    cause instanceof Error ? cause.message : "Unable to load users.",
                );
            }
        })
        .finally(() => {
            if (isActive) setIsLoading(false);
        });
        
    return () => {
      isActive = false;
    };
  }, [currentUser]);

  return { users, isLoading, error };
}
