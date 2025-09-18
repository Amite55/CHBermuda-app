import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useRoleHooks = () => {
  const [role, setRole] = useState("");
  const getRole = async () => {
    const value = await AsyncStorage.getItem("role");
    const newRole = JSON.parse(value as string);
    setRole(newRole);
  };
  getRole();

  return role;
};
