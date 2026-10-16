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
          setUsers([]);
          setIsLoading(false);
          setError("");
          return () => {
              isActive = false;
            };
        }
        
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
