import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface Props {
  title: string;
  description: string;
  time: string;
  icon: string;
  onPress?: () => void;
}

const NotificationCard = ({
  title,
  description,
  time,
  icon,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={tw`bg-slate-300 rounded-2xl p-3 flex-row items-center gap-3 `}
    >
      <View
        style={tw`w-12 h-12 rounded-full bg-white items-center justify-center`}
      >
        <SvgXml xml={icon} />
      </View>
      <View>
        <Text style={tw`font-LufgaMedium text-sm text-black`}>{title}</Text>
        <Text style={tw`font-LufgaRegular text-sm text-subText`}>
          {description}
        </Text>
        <Text style={tw`font-LufgaRegular text-xs text-subText`}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
