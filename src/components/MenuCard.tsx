import { ImgPlaceholderService } from "@/assets/image";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface Props {
  containerStyle?: any;
  imageStyle?: any;
  onPress?: () => void;
  endIconOnPress?: () => void;
  titleText?: string;
  subTitleText?: string;
  icon?: any;
  image?: any;
  titleTextStyle?: any;
  subTitleStyle?: any;
  endIcon?: any;
  placeholderImage?: any;
}

const MenuCard = ({
  containerStyle = "",
  onPress,
  titleText = "",
  subTitleText = "",
  icon = "",
  image = "",
  imageStyle = "",
  titleTextStyle = "",
  subTitleStyle = "",
  endIcon = "",
  endIconOnPress,
  placeholderImage = ImgPlaceholderService,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}
      delayPressIn={0}
      delayPressOut={0}
      style={[
        tw`flex-row justify-between items-center bg-white rounded-xl px-3 py-2`,
        containerStyle,
      ]}
    >
      {/* ── Left side ── */}
      <View style={tw`flex-1 flex-row items-center gap-3`}>
        {/* icon */}
        {icon && (
          <View
            style={tw`w-14 h-14 shrink-0 rounded-full bg-stone-100 items-center justify-center`}
          >
            <SvgXml xml={icon} />
          </View>
        )}

        {/* image */}
        {image && (
          <Image
            source={image}
            style={[tw`w-16 h-16 shrink-0 rounded-full`, imageStyle]}
            contentFit="cover"
            placeholder={placeholderImage}
          />
        )}

        <View style={tw`flex-1`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              tw`font-LufgaMedium text-base text-regularText`,
              titleTextStyle,
            ]}
          >
            {titleText}
          </Text>

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              tw`font-LufgaRegular text-sm text-regularText`,
              subTitleStyle,
            ]}
          >
            {subTitleText}
          </Text>
        </View>
      </View>

      {/* ── End icon ── */}
      {endIcon ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={endIconOnPress}
          disabled={!endIconOnPress}
          style={tw`pl-2 shrink-0`}
        >
          <SvgXml xml={endIcon} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default MenuCard;
