import { IconRatingStar } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface Props {
  image: any;
  title: string;
  subTitle: string;
  ratings: number;
  reviews: number;
  onPress?: () => void;
  totalOrder: number;
  containerStyle?: any;
  disabled?: boolean;
}

const ProviderCard = ({
  image,
  title,
  subTitle,
  ratings,
  reviews,
  onPress,
  totalOrder,
  containerStyle,
  disabled = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
      style={[
        tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl`,
        containerStyle,
      ]}
    >
      <Image style={tw`w-16 h-16 rounded-full`} source={image} />
      <View>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`font-LufgaMedium text-base text-regularText`}>
            {title}
          </Text>
          <Text
            style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
          >
            {totalOrder} order
          </Text>
        </View>

        <Text style={tw`font-LufgaRegular text-sm text-subText`}>
          {subTitle}
        </Text>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconRatingStar} />
          <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
            {ratings}
          </Text>
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            ({reviews} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProviderCard;
