import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface PrimaryButtonProps {
  buttonContainerStyle?: any;
  buttonTextStyle?: any;
  buttonText?: string;
  loading?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  leftIcon?: any;
  rightIcon?: any;
}

const PrimaryButton = ({
  buttonContainerStyle,
  buttonTextStyle,
  buttonText,
  loading = false,
  onPress = () => {},
  disabled = false,
  leftIcon = null,
  rightIcon = null,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      delayPressIn={0}
      delayPressOut={0}
      onPress={onPress}
      disabled={disabled}
      style={[
        tw`h-12 bg-primaryBtn rounded-full justify-center items-center flex-row gap-3 `,
        buttonContainerStyle,
      ]}
    >
      {leftIcon ? <SvgXml xml={leftIcon} /> : null}
      <Text
        style={[tw`text-white font-LufgaSemiBold text-xl`, buttonTextStyle]}
      >
        {loading || !buttonText ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          buttonText
        )}
      </Text>
      {rightIcon ? <SvgXml xml={rightIcon} /> : null}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
