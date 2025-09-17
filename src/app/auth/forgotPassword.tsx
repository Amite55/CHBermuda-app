import { IconEmail } from "@/assets/icons";
import { ImgSplashLogo } from "@/assets/image";
import TitleSubtile from "@/src/components/TitleSubtile";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const ForgotPassword = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={tw`flex-1  bg-bgBaseColor px-5`}>
          <View style={tw`items-center justify-center flex-1`}>
            <Image style={tw`w-36 h-36  `} source={ImgSplashLogo} />

            <TitleSubtile
              title="Forgot password ?"
              subtile="Enter the email address that you used to create your account. We will send an OTP to reset your password."
            />

            <View
              style={tw`w-full h-14 flex-row items-center px-4 rounded-full border border-borderColor gap-3 mt-4`}
            >
              <SvgXml xml={IconEmail} />
              <TextInput
                onChangeText={(value) => {
                  console.log(value);
                }}
                placeholder="Enter your Email"
                placeholderTextColor="#111111"
                style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
              />
            </View>

            <PrimaryButton
              buttonContainerStyle={tw`mt-6 w-full`}
              buttonText="Get OTP"
              onPress={() => {
                router.push({
                  pathname: "/auth/enterOTP",
                  params: { email: "ex********23@gmail.com" },
                });
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
