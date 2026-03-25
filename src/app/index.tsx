import { ImgSplashLogo } from "@/assets/image";
import * as Font from "expo-font";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAuth } from "../context/AuthContext";
import tw from "../lib/tailwind";
import { BaseColor, PrimaryColor } from "../utils/util";

export default function Index() {
  const { userInfo, isLoading } = useAuth();
  const decideNavigation = () => {
    if (isLoading) return;
    // user wise navigation ======================
    if (userInfo) {
      switch (userInfo.role) {
        case "USER":
          router.replace("/user_role_sections/user_tabs/user_home");
          break;
        case "PROVIDER":
          if (userInfo?.provider_type === "ADMIN") {
            router.replace("/admin_provider/adminTabs/adminHome");
          } else {
            router.replace("/serviceProvider/serviceProviderTabs/providerHome");
          }
          break;
        default:
          router.replace("/chooseRole");
      }
    } else {
      router.replace("/chooseRole");
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
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        decideNavigation();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, userInfo]);

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
