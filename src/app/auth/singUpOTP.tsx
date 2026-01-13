import { ImgSplashLogo } from "@/assets/image";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "@/src/redux/Api/authSlices";
import { PrimaryColor } from "@/src/utils/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [otpKey, setOtpKey] = React.useState(Date.now());
  const [otpCode, setOtpCode] = React.useState("");
  const { email } = useLocalSearchParams();
  const toast = useToastHelpers();

  // ============= otp api end point =================
  const [otp, { isLoading: isOTPLoading }] = useVerifyOtpMutation();
  const [reSetOTP, { isLoading: isOTPResetLoading }] =
    useForgotPasswordMutation();

  // ====================  otp handler ====================
  const handleSendOTP = async (text: string) => {
    try {
      const res = await otp({ email, otp: text }).unwrap();
      if (res?.status === "success") {
        toast.success(res?.message || "OTP send successfully", 3000);
        await AsyncStorage.setItem("token", res?.data?.access_token);
        // ============= navigate to dynamic role ===================
        if (res?.data?.user?.role === "USER") {
          router.replace("/user_role_sections/user_tabs/user_home");
        }
      }
    } catch (error: any) {
      console.log(error, "error in otp");
      toast.showError(
        error.message ||
          error?.data?.message ||
          error ||
          error?.data ||
          "Invalid OTP please try again",
        4000
      );
    }
  };

  // ===================== reset otp =====================-
  const handleResendOtp = async () => {
    setOtpCode("");
    setOtpKey(Date.now());
    try {
      const res = await reSetOTP({ email }).unwrap();
      if (res) {
        toast.success(res?.message || "OTP send successfully", 3000);
      }
    } catch (error: any) {
      console.log(error, "Resend OTP not success ->>");
      toast.showError(
        error.message ||
          error?.data?.message ||
          error ||
          error?.data ||
          "OTP not send please try again",
        4000
      );
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
          <Image
            contentFit="contain"
            style={tw`w-36 h-36 `}
            source={ImgSplashLogo}
          />
          <View style={tw`gap-2 items-center justify-center`}>
            <Text
              style={tw`font-LufgaBold text-3xl text-regularText text-center`}
            >
              Enter OTP
            </Text>
            <Text
              style={tw`font-LufgaRegular text-base text-regularText text-center`}
            >
              We’ve sent you a 6 digit OTP to{" "}
              <Text style={tw`font-LufgaSemiBold text-lg`}>{email}</Text>
            </Text>
          </View>

          <View style={tw`flex-row gap-4 mt-5`}>
            <OtpInput
              numberOfDigits={6}
              focusColor={PrimaryColor}
              autoFocus={false}
              hideStick={true}
              placeholder="-"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              key={otpKey}
              value={otpCode}
              onChange={(text: any) => setOtpCode(text)}
              onFilled={async (text) => {
                await handleSendOTP(text);
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: tw`rounded-full mb-2`,
                pinCodeContainerStyle: tw`h-14 w-14 justify-center items-center bg-white rounded-lg `,
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
                <ActivityIndicator
                  style={tw`mr-6`}
                  size="small"
                  color={PrimaryColor}
                />
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
