import { ImgPlaceholderService } from "@/assets/image";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../lib/tailwind";

interface Props {
  onPress: () => void;
  image: string;
  title: string;
  subTitle: string;
  dateAndTime: string;
}

const OrderCard = ({ onPress, image, title, subTitle, dateAndTime }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={tw`flex-row items-center gap-4 px-5 py-4 bg-white rounded-xl`}
    >
      <Image
        style={tw`w-16 h-16 rounded-full shrink-0`}
        source={image}
        contentFit="cover"
        placeholder={ImgPlaceholderService}
      />

      <View style={tw`flex-1`}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={tw`font-LufgaMedium text-base text-regularText`}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={tw`font-LufgaRegular text-sm text-black`}
        >
          {subTitle}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={tw`font-LufgaMedium text-xs text-subText pt-1`}
        >
          {dateAndTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
