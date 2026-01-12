// components/Toast.tsx
import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";
import { ToastType } from "../redux/CommonTypes/ToastTypes";

// Props এর type define করছি
interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  // Color mapping function
  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500",
          icon: "✅",
          text: "text-white",
        };
      case "error":
        return {
          bg: "bg-red-500",
          icon: "❌",
          text: "text-white",
        };
      case "warning":
        return {
          bg: "bg-yellow-500",
          icon: "⚠️",
          text: "text-black",
        };
      case "info":
        return {
          bg: "bg-blue-500",
          icon: "ℹ️",
          text: "text-white",
        };
      default:
        return {
          bg: "bg-gray-800",
          icon: "💡",
          text: "text-white",
        };
    }
  };

  const colors = getColors();

  return (
    <View style={tw`absolute top-12 left-4 right-4 z-50`}>
      <View
        style={[
          tw`${colors.bg} px-4 py-3 rounded-xl shadow-lg flex-row items-center`,
          { elevation: 10 },
        ]}
      >
        <Text style={tw`text-xl mr-3`}>{colors.icon}</Text>
        <Text style={tw`${colors.text} flex-1 font-medium`}>{message}</Text>
      </View>
    </View>
  );
};

export default Toast;
