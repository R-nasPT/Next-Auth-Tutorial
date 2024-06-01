"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";

type ContextUser = IUser | null;

interface IAuthContex {
  user: ContextUser;
  setUser: React.Dispatch<React.SetStateAction<ContextUser>>;
}

interface AuthContexProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContex | null>(null);

export function AuthContextProvider({ children }: AuthContexProviderProps) {
  const [user, setUser] = useState<ContextUser>(null);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const apiRes = await axios.get(
          "http://localhost:3000/api/user/profile"
        );
        if (apiRes.data.success) {
          setUser(apiRes.data.user);
        }
      } catch (error) {
        router.push("/login");
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside an auth provider");
  } else {
    return context;
  }
};
