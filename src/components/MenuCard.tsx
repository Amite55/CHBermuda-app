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
      <View style={tw`flex-row items-center gap-3`}>
        {icon && (
          <View
            style={tw`w-14 h-14 rounded-full bg-stone-100 items-center justify-center`}
          >
            <SvgXml xml={icon} />
          </View>
        )}
        {image && (
          <Image
            source={image}
            style={[tw`w-16 h-16 rounded-full`, imageStyle]}
          />
        )}
        <View>
          <Text
            style={[
              tw`font-LufgaMedium text-base text-regularText`,
              titleTextStyle,
            ]}
          >
            {titleText}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              tw`font-LufgaRegular text-sm text-regularText`,
              subTitleStyle,
            ]}
          >
            {subTitleText.length > 30
              ? subTitleText.slice(0, 30) + "..."
              : subTitleText}
          </Text>
        </View>
      </View>
      {endIcon ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={endIconOnPress}
          disabled={!endIconOnPress}
        >
          <SvgXml xml={endIcon} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default MenuCard;
