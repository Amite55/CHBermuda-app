import { IconNotificationWhite } from "@/assets/icons";
import { ImgProfileImg, ImgProviderBG } from "@/assets/image";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native";

const ProviderHome = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-5 `}
    >
      <StatusBar style="dark" backgroundColor="#183E9F" />
      <ImageBackground style={tw` w-full h-56`} source={ImgProviderBG}>
        <UserInfoHeader
          containerStyle={tw`px-5`}
          notificationContentStyle={tw`bg-[#FFFFFF33] `}
          userName="Provider"
          userImage={ImgProfileImg}
          notificationIcon={IconNotificationWhite}
          greetingStyle={tw`text-white `}
          userNameStyle={tw`text-white `}
          notificationOnPress={() => {}}
          profileOnPress={() => {}}
        />
      </ImageBackground>
    </ScrollView>
  );
};

export default ProviderHome;
