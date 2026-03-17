import { Alert, Linking } from "react-native";

export const callPadLinkingFunction = async (phoneNumber: string) => {
  try {
    await Linking.openURL(`tel:${phoneNumber}`);
  } catch (error) {
    Alert.alert("Failed to make a call");
    console.log("Call error:", error);
  }
};
