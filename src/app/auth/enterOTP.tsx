import { ImgSplashLogo } from "@/assets/image";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { PrimaryColor } from "@/src/utils/util";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

const EnterOTP = () => {
  const { email } = useLocalSearchParams();
  const [value, setValue] = useState();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={tw`flex-1 justify-center items-center bg-bgBaseColor  px-5 `}
        >
          <Image style={tw`w-36 h-36  `} source={ImgSplashLogo} />
          <View style={tw`gap-2 items-center justify-center`}>
            <Text
              style={tw`font-LufgaBold text-3xl text-regularText text-center`}
            >
              Enter OTP
            </Text>
            <Text
              style={tw`font-LufgaRegular text-base text-regularText text-center`}
            >
              We’ve sent you a 4 digit OTP to {email}
            </Text>
          </View>

          <View style={tw`flex-row gap-4 mt-5`}>
            <OtpInput
              numberOfDigits={4}
              focusColor={PrimaryColor}
              autoFocus={false}
              hideStick={true}
              placeholder="-"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onTextChange={(text) => {
                setValue(text);
              }}
              onFilled={async (text) => {
                // try {
                //   const res = await otpVerify({
                //     email: email,
                //     otp: text,
                //   }).unwrap();
                //   if (res.status) {
                //     await AsyncStorage.setItem(
                //       "token",
                //       res?.data?.access_token
                //     );
                //     router?.replace("/drewer/home");
                //   } else {
                //     Toast.show({
                //       type: ALERT_TYPE.DANGER,
                //       title: "Error!",
                //       textBody: "Wrong OTP",
                //     });
                //   }
                // } catch (error) {}
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: tw`rounded-full mb-2`,
                pinCodeContainerStyle: tw`h-20 w-20 justify-center items-center bg-white rounded-lg `,
                pinCodeTextStyle: tw`text-[#262626] text-2xl font-semibold`,
                placeholderTextStyle: tw`text-[#6D6D6D] text-2xl font-semibold`,
              }}
            />
          </View>
          <View style={tw`w-full items-end mt-1`}>
            <TouchableOpacity style={tw``}>
              <Text style={tw`text-primaryBtn font-semibold text-sm`}>
                Send Again
              </Text>
            </TouchableOpacity>
          </View>
          {/* ----------------------- button --------------------- */}
          <PrimaryButton
            buttonContainerStyle={tw`w-full mt-5`}
            buttonText={"Next"}
            onPress={() => {
              router.push("/auth/resetPassword");
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EnterOTP;
