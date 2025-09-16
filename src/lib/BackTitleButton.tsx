// import { IconBackArrow } from "@/assets/icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "./tailwind";

interface Props {
  title: string;
  icon?: any;
  titleTextStyle?: any;
  continentStyle?: any;
  onPress?: () => void;
}

const BackTitleButton = ({
  title = "Back",
  icon,
  titleTextStyle = "",
  continentStyle = "",
  onPress = () => router.back(),
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tw`flex-row items-center mt-5 mb-6 gap-3`, continentStyle]}
    >
      {/* <SvgXml xml={icon ? icon : IconBackArrow} /> */}
      <Text style={[tw`text-white500  text-2xl`, titleTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BackTitleButton;
