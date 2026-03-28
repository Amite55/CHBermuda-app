import { IconEmail } from "@/assets/icons";
import { ImgSplashLogo } from "@/assets/image";
import TitleSubtile from "@/src/components/TitleSubtile";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useForgotPasswordMutation } from "@/src/redux/Api/authSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { emailSchema } from "@/src/validationSchema/userValidationSchema";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const ForgotPassword = () => {
  const toast = useToastHelpers();
  // =========== api end point ===========
  const [forgotEmail, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPassword = async (email: any) => {
    try {
      await forgotEmail(email);
      router.push({
        pathname: "/auth/enterOTP",
        params: { email: email.email },
      });
    } catch (error: any) {
      console.log(error, "forgot mail not valid");
      toast.showError(error.message || "Email not valid", 3000);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => handleForgotPassword(values)}
          validationSchema={emailSchema}
          enableReinitialize={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            values,
          }) => (
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
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    placeholder="Enter your Email"
                    placeholderTextColor="#111111"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={tw`text-red-500 text-xs mt-1 self-start`}>
                    {errors.email}
                  </Text>
                )}

                <PrimaryButton
                  buttonContainerStyle={tw`mt-6 w-full`}
                  buttonText="Get OTP"
                  onPress={() => {
                    handleSubmit();
                  }}
                  disabled={isLoading}
                  loading={isLoading}
                />
              </View>
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
