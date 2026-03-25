import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// ✅ role hook
export const useRoleHooks = () => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const getRole = async () => {
      const value = await AsyncStorage.getItem("role");
      setRole(value ?? "");
    };
    getRole();
  }, []);

  return role;
};

// ✅ providerType hook
export const useGetProviderTypes = () => {
  const [providerType, setProviderTypes] = useState<string | null>(null);

  useEffect(() => {
    const getProviderTypes = async () => {
      try {
        const value = await AsyncStorage.getItem("providerType");
        setProviderTypes(value);
      } catch (error) {
        console.error("Failed to load providerType from AsyncStorage:", error);
      }
    };
    getProviderTypes();
  }, []);

  return providerType;
};
