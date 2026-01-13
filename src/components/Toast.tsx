// components/Toast.tsx
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import tw from "../lib/tailwind";
// import { ToastType } from "../redux/CommonTypes/ToastTypes";

type ToastType = "success" | "error" | "warning" | "info";

// Props এর type define করছি
interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const displayMessage =
    typeof message === "string" ? message : JSON.stringify(message);

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
    <Animated.View
      style={tw`absolute top-12 left-4 right-4 z-50`}
      entering={FadeInUp.duration(300).delay(500)}
    >
      <Animated.View
        style={[
          tw`${colors.bg} px-4 py-3 rounded-xl shadow-lg flex-row items-center`,
          { elevation: 10 },
        ]}
        entering={FadeInUp.duration(300).delay(500)}
      >
        <Animated.Text
          entering={FadeInUp.duration(300).delay(500)}
          style={tw`text-xl mr-3`}
        >
          {colors.icon}
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.duration(500).delay(500)}
          style={tw`${colors.text} flex-1 font-medium text-base`}
        >
          {displayMessage}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Toast;
