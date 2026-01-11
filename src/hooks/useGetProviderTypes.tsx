import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useGetProviderTypes = () => {
  const [providerTypes, setProviderTypes] = useState<string | null>();
  useEffect(() => {
    const getProviderTypes = async () => {
      try {
        const value = await AsyncStorage.getItem("providerTypes");
        setProviderTypes(value);
      } catch (error) {
        console.error("Failed to load roll from AsyncStorage:", error);
      }
    };

    getProviderTypes();
  }, []);

  return providerTypes;
};
