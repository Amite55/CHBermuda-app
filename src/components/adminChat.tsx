import { IconNotificationWhite, IconProviderSearch } from "@/assets/icons";
import { ImgProfileImg, ImgProviderBG } from "@/assets/image";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const AdminChat = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-5 `}
    >
      <ImageBackground style={tw` w-full h-24`} source={ImgProviderBG}>
        {/* ------------------- user header part ---------------- */}
        <UserInfoHeader
          containerStyle={tw`px-5 items-center`}
          notificationContentStyle={tw`bg-[#FFFFFF33] `}
          userName="Admin Provider"
          userImage={ImgProfileImg}
          notificationIcon={IconNotificationWhite}
          greetingStyle={tw`text-white `}
          userNameStyle={tw`text-white `}
          notificationOnPress={() => {
            router.push("/admin_provider/adminNotification/notificationsAdmin");
          }}
          profileOnPress={() => {}}
        />
      </ImageBackground>
      <Text
        style={tw`font-LufgaMedium text-2xl text-center text-regularText pt-5 pb-3`}
      >
        Chats
      </Text>
      {/* ------------------- search part ---------------- */}
      <View
        style={tw`flex-row items-center gap-2 px-5 py-1 bg-white rounded-full mx-4`}
      >
        <SvgXml xml={IconProviderSearch} />
        <TextInput
          placeholder="Search Chat"
          style={tw`text-subText font-LufgaRegular text-sm flex-1 `}
        />
      </View>

      <View style={tw`flex-1 pt-5 gap-3 px-5 `}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push("/admin_provider/adminMessaging");
              }}
              activeOpacity={0.8}
              key={index}
              style={tw`  flex-row items-center gap-2  p-4 bg-white  rounded-xl shadow`}
            >
              <Image
                source={ImgProfileImg}
                style={tw`w-14 h-14 rounded-full`}
              />
              <View style={tw` flex-1 gap-1`}>
                <View style={tw`flex-row justify-between items-center `}>
                  <Text style={tw`font-LufgaMedium text-base text-black`}>
                    Jhon Doe
                  </Text>
                  <Text style={tw`font-LufgaRegular text-xs text-subText`}>
                    10:20pm
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={tw` font-LufgaRegular text-sm text-regularText `}
                >
                  Lorem ipsum dolor sit amet consectetur.
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AdminChat;
