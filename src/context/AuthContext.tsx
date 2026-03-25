// context/AuthContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const verifyTokenWithBackend = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_API_URL}/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.status === 200;
  } catch {
    return false;
  }
};

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
        const parsed: UserInfo = JSON.parse(stored);

        const isValid = await verifyTokenWithBackend(parsed.token);

        if (isValid) {
          setUserInfo(parsed);
        } else {
          await SecureStore.deleteItemAsync("user_info");
          setUserInfo(null);
        }
      }
    } catch (e) {
      console.log("SecureStore read error:", e);
      await SecureStore.deleteItemAsync("user_info");
      setUserInfo(null);
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
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, isLoading, saveUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
