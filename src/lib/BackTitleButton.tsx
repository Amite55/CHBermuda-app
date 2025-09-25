// import { IconBackArrow } from "@/assets/icons";
import { IconHeaderBackArrow } from "@/assets/icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "./tailwind";

interface Props {
  title: string;
  icon?: any;
  titleTextStyle?: any;
  continentStyle?: any;
  onPress?: () => void;
  endTextStyle?: any;
  endText?: string;
}

const BackTitleButton = ({
  title = "Back",
  icon,
  titleTextStyle = "",
  continentStyle = "",
  endTextStyle = "",
  endText = "",
  onPress = () => router.back(),
}: Props) => {
  return (
    <View
      style={[tw`flex-row justify-between items-center mt-2 `, continentStyle]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={tw`w-12 h-12 rounded-full bg-white items-center justify-center`}
      >
        <SvgXml xml={icon ? icon : IconHeaderBackArrow} />
      </TouchableOpacity>
      <Text style={[tw`text-black  font-medium text-lg`, titleTextStyle]}>
        {title}
      </Text>
      {endText ? (
        <Text style={[tw`text-black font-medium text-lg`, endTextStyle]}>
          {endText}
        </Text>
      ) : (
        // spacer placeholder so title stays centered
        <View style={tw`w-12 `} />
      )}
    </View>
  );
};

export default BackTitleButton;
