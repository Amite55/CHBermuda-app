import { ImgSplashLogo } from "@/assets/image";
import tw from "@/src/lib/tailwind";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "@/src/redux/Api/authSlices";
import { PrimaryColor } from "@/src/utils/util";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
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

  // ============= otp api end point =================
  const [otp, { isLoading: isOTPLoading }] = useVerifyOtpMutation();
  const [reSetOTP, { isLoading: isOTPResetLoading }] =
    useForgotPasswordMutation();

  const handleSendOTP = async (text: string) => {
    try {
      const res = await otp({ email, otp: text }).unwrap();
      if (res) {
        console.log(res, "this is otp response ------------>");
      }
    } catch (error: any) {
      console.log(error, "error in otp");
      router.push({
        pathname: "/Toaster",
        params: { res: error.data.message || error || "Your OTP is incorrect" },
      });
    }
  };

  // ===================== reset otp =====================-
  const handleResendOtp = async () => {
    try {
      const res = await reSetOTP(email).unwrap();
      console.log(res, "thi is res>>>>>>>>>>>");
      if (res) {
        router.push({
          pathname: `/Toaster`,
          params: { res: "OTP sent successfully!" },
        });
      }
    } catch (error: any) {
      console.log(error, "Resend OTP not success ->>");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || "Not send again!" },
      });
    }
  };

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
              onFilled={async (text) => {
                await handleSendOTP(text);
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
            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={isOTPResetLoading}
              activeOpacity={0.6}
              style={tw``}
            >
              {isOTPResetLoading ? (
                <ActivityIndicator size="small" color={PrimaryColor} />
              ) : (
                <Text style={tw`text-primaryBtn font-semibold text-sm`}>
                  Send Again
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {/* ----------------------- button --------------------- */}
          {isOTPLoading && (
            <ActivityIndicator size="large" color={PrimaryColor} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EnterOTP;
