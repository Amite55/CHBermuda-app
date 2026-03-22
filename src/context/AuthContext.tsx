// context/AuthContext.tsx
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

type UserInfo = {
  token: string;
  role: "USER" | "PROVIDER" | "ADMIN";
  id: number;
  name: string;
  email: string;
  phone: string | null;
  provider_type: string | null;
  otp: string | null;
  status: string;
};

type AuthContextType = {
  userInfo: UserInfo | null;
  isLoading: boolean;
  saveUser: (data: UserInfo) => Promise<void>;
  clearUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFromSecureStore();
  }, []);

  const loadFromSecureStore = async () => {
    try {
      const stored = await SecureStore.getItemAsync("user_info");
      if (stored) {
        setUserInfo(JSON.parse(stored));
      }
    } catch (e) {
      console.log("SecureStore read error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Login এর পর call করো
  const saveUser = async (data: UserInfo) => {
    await SecureStore.setItemAsync("user_info", JSON.stringify(data));
    setUserInfo(data);
  };

  // Logout এ call করো
  const clearUser = async () => {
    await SecureStore.deleteItemAsync("user_info");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, isLoading, saveUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
