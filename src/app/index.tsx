import { ImgSplashLogo } from "@/assets/image";
import * as Font from "expo-font";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import tw from "../lib/tailwind";
import { BaseColor, PrimaryColor } from "../utils/util";

export default function Index() {
  const decideNavigation = async () => {
    try {
      setTimeout(() => {
        router.replace("/chooseRole");
        // router.replace("/taskCreator/creatorHomTabs/dashboard");
      }, 3000);
    } catch (error) {
      console.log("Error in main layout:", error);
    }
  };

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        // =========================== font gucina ===========================
        LufgaBold: require("@/assets/Lufga_Fonts/LufgaBold.ttf"),
        LufgaMedium: require("@/assets/Lufga_Fonts/LufgaMedium.ttf"),
        LufgaRegular: require("@/assets/Lufga_Fonts/LufgaRegular.ttf"),
        LufgaSemiBold: require("@/assets/Lufga_Fonts/LufgaSemiBold.ttf"),
      });
    };
    loadFont();
    decideNavigation();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BaseColor,
      }}
    >
      <Animated.Image
        style={tw`w-52 h-52 `}
        entering={FadeInUp.duration(800).delay(1000)}
        source={ImgSplashLogo}
      />
      <Animated.Text
        entering={FadeInUp.duration(500).delay(800)}
        style={tw`text-center font-semibold text-secondaryBtn text-2xl`}
      >
        Welcome
      </Animated.Text>
      <ActivityIndicator size="small" color={PrimaryColor} />
    </View>
  );
}
