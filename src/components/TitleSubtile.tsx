import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";

interface Props {
  title: string;
  subtile: string;
}

const TitleSubtile = ({ title, subtile }: Props) => {
  return (
    <View style={tw`gap-2 items-center justify-center`}>
      <Text style={tw`font-LufgaBold text-3xl text-regularText`}>{title}</Text>
      <Text style={tw`font-LufgaRegular text-base text-regularText`}>
        {subtile}
      </Text>
    </View>
  );
};

export default TitleSubtile;
