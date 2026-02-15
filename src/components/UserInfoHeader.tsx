import { IconNotification, IconShoppingCart } from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import { getDynamicGreeting } from "./DynamicGreeting";

interface IUserProps {
  notificationOnPress?: () => void;
  cartOnPress?: () => void;
  profileOnPress?: () => void;
  userImage?: any;
  userName?: string;
  containerStyle?: any;
  userNameStyle?: any;
  greetingStyle?: any;
  isNotificationCount?: number;
  isCartCount?: number;
  notificationContentStyle?: any;
  notificationIcon?: any;
}

const UserInfoHeader = ({
  containerStyle = "",
  userName,
  userImage,
  notificationOnPress,
  cartOnPress,
  profileOnPress,
  userNameStyle = "",
  greetingStyle = "",
  isNotificationCount = 0,
  isCartCount = 0,
  notificationContentStyle = "",
  notificationIcon = "",
}: IUserProps) => {
  return (
    <View
      style={[tw` py-4 flex-row justify-between items-center`, containerStyle]}
    >
      <TouchableOpacity
        onPress={profileOnPress}
        activeOpacity={0.8}
        style={tw`flex-row items-center gap-2`}
      >
        <TouchableOpacity
          onPress={profileOnPress}
          activeOpacity={0.7}
          style={tw`h-14 w-14 rounded-full bg-white items-center justify-center`}
        >
          <Image
            contentFit="cover"
            placeholder={ImgPlaceholderProfile}
            source={userImage}
            style={tw`w-12 h-12 rounded-full`}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={[tw`font-LufgaRegular text-base text-black`, greetingStyle]}
          >
            {getDynamicGreeting()}
          </Text>
          <View style={tw`max-w-44`}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[tw`font-LufgaMedium text-xl text-black`, userNameStyle]}
            >
              {userName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={tw`flex-row items-center gap-2`}>
        {cartOnPress && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={cartOnPress}
            style={tw`h-12 w-12 rounded-full bg-white items-center justify-center`}
          >
            <SvgXml xml={IconShoppingCart} />
            {isCartCount > 0 && (
              <Text
                style={tw`absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center`}
              >
                {isCartCount > 99 ? "99+" : isCartCount}
              </Text>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={notificationOnPress}
          activeOpacity={0.7}
          style={[
            tw`h-12 w-12 rounded-full bg-white items-center justify-center`,
            notificationContentStyle,
          ]}
        >
          <SvgXml xml={notificationIcon || IconNotification} />
          {isNotificationCount > 0 && (
            <Text
              style={tw`absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center`}
            >
              {isNotificationCount > 99 ? "99+" : isNotificationCount}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfoHeader;
