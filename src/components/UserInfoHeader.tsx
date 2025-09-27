import {
  IconNotification,
  IconShoppingCart,
  IconUserHome,
} from "@/assets/icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import { getDynamicGreeting } from "./DynamicGreeting";

const UserInfoHeader = ({ containerStyle = "" }: any) => {
  return (
    <View
      style={[tw` py-4 flex-row justify-between items-center`, containerStyle]}
    >
      <TouchableOpacity
        onPress={() => {
          router.push("/user_role_sections/user_tabs/user_profile");
        }}
        activeOpacity={0.8}
        style={tw`flex-row items-center gap-2`}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/user_role_sections/user_tabs/user_profile");
          }}
          activeOpacity={0.7}
          style={tw`h-14 w-14 rounded-full bg-white items-center justify-center`}
        >
          <SvgXml xml={IconUserHome} />
        </TouchableOpacity>
        <View>
          <Text style={tw`font-LufgaRegular text-base text-black`}>
            {getDynamicGreeting()}
          </Text>
          <Text style={tw`font-LufgaMedium text-xl text-black`}>Mr. Lopez</Text>
        </View>
      </TouchableOpacity>
      <View style={tw`flex-row items-center gap-2`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.push("/user_role_sections/cart");
          }}
          style={tw`h-12 w-12 rounded-full bg-white items-center justify-center`}
        >
          <SvgXml xml={IconShoppingCart} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/user_role_sections/notificationsUser/notifications");
          }}
          activeOpacity={0.7}
          style={tw`h-12 w-12 rounded-full bg-white items-center justify-center`}
        >
          <SvgXml xml={IconNotification} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfoHeader;
