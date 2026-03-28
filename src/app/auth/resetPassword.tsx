import { IconEyeHide, IconEyeShow, IconPassword } from "@/assets/icons";
import { ImgSplashLogo } from "@/assets/image";
import TitleSubtile from "@/src/components/TitleSubtile";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useResetPasswordMutation } from "@/src/redux/Api/authSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { ResetSchema } from "@/src/validationSchema/userValidationSchema";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { email } = useLocalSearchParams();
  const toast = useToastHelpers();

  // ================= api end point =================
  const [ResetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();

  // =============== handle change password function ================
  const handResetPassword = async (values: any) => {
    try {
      await ResetPassword({ email, ...values }).unwrap();
      toast.success("Your Password change successfully", 3000);
      router.push("/auth/singIn");
    } catch (error: any) {
      console.log(error, "Your Reset not success ---------->");
      toast.showError(
        error.message ||
          error?.data?.message ||
          "Something went wrong please try again",
        4000,
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={tw`flex-1 text-center justify-center bg-bgBaseColor px-5`}>
          <View style={tw`w-full items-center  `}>
            <Image style={tw`w-36 h-36  `} source={ImgSplashLogo} />
            <TitleSubtile
              title="Welcome Back"
              subtile="Enter a new password for your account"
            />
            <Formik
              initialValues={{
                password: "",
                password_confirmation: "",
              }}
              onSubmit={(values) => handResetPassword(values)}
              validationSchema={ResetSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
              }) => (
                <View style={tw`w-full `}>
                  {/* ==================================== password  ================================ */}
                  <View
                    style={tw` h-14  flex-row justify-between items-center px-4 rounded-full border border-borderColor mt-5`}
                  >
                    <View style={tw`flex-1 flex-row items-center gap-3`}>
                      <SvgXml xml={IconPassword} />
                      <TextInput
                        key={showPassword ? "text" : "password"}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="Password"
                        placeholderTextColor="#111111"
                        style={tw` text-regularText `}
                        secureTextEntry={!showPassword}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <SvgXml xml={showPassword ? IconEyeShow : IconEyeHide} />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.password}
                    </Text>
                  )}
                  {/* ==================================== Confirm password  ================================ */}
                  <View
                    style={tw` h-14  flex-row justify-between items-center px-4 rounded-full border border-borderColor mt-5`}
                  >
                    <View style={tw`flex-1 flex-row items-center gap-3`}>
                      <SvgXml xml={IconPassword} />
                      <TextInput
                        key={
                          showConfirmPassword ? "text" : "password_confirmation"
                        }
                        onChangeText={handleChange("password_confirmation")}
                        onBlur={handleBlur("password_confirmation")}
                        value={values.password_confirmation}
                        placeholder="Confirm Password"
                        placeholderTextColor="#111111"
                        style={tw` text-regularText `}
                        secureTextEntry={!showConfirmPassword}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <SvgXml
                        xml={showConfirmPassword ? IconEyeShow : IconEyeHide}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password_confirmation &&
                    touched.password_confirmation && (
                      <Text style={tw`text-red-500 text-xs mt-1`}>
                        {errors.password_confirmation}
                      </Text>
                    )}
                  <PrimaryButton
                    onPress={handleSubmit}
                    loading={isResetLoading}
                    disabled={isResetLoading}
                    buttonText="Change password"
                    buttonContainerStyle={tw`mt-8`}
                  />
                </View>
              )}

              {/* -------------------   submit button   ------------------ */}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
