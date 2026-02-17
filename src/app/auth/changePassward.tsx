import { IconEyeHide, IconEyeShow, IconPassword } from "@/assets/icons";
import { ImgChangePass } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useChangePasswordMutation } from "@/src/redux/Api/authSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";

const ChangePassward = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const toast = useToastHelpers();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // =================== api end point ===================
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  // ============== handle change password function ================
  const handleChangePassword = async (values: any) => {
    try {
      await changePassword(values).unwrap();
      router.back();
      toast.success("Your Password change successfully", 3000);
    } catch (error: any) {
      console.log(error, "Change Password error ---->");
      toast.showError(
        error.message ||
          error?.data?.message ||
          error ||
          error?.data ||
          "Password not changed please try again",
        3000,
      );
    }
  };

  // ==================== Validation Schema ====================
  const ResetSchema = Yup.object().shape({
    current_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    new_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  // =================== keyboard hide function ================
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 bg-bgBaseColor `}
          contentContainerStyle={[
            tw` px-5`,
            keyboardVisible ? tw`pb-20` : tw`pb-2`,
          ]}
        >
          <BackTitleButton
            title={"Change password"}
            onPress={() => router.back()}
          />

          <Image
            contentFit="contain"
            style={tw`w-full h-48 my-4`}
            source={ImgChangePass}
          />

          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
              password_confirmation: "",
            }}
            onSubmit={(values) => handleChangePassword(values)}
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
                {/* ==================================== old password  ================================ */}
                <View
                  style={tw` h-14  flex-row justify-between items-center px-4 rounded-full border border-borderColor mt-5`}
                >
                  <View style={tw`flex-1 flex-row items-center gap-3`}>
                    <SvgXml xml={IconPassword} />
                    <TextInput
                      key={showOldPassword ? "text" : "password"}
                      onChangeText={handleChange("current_password")}
                      onBlur={handleBlur("password")}
                      value={values.current_password}
                      placeholder="Old Password"
                      placeholderTextColor="#111111"
                      style={tw`flex-1 text-regularText `}
                      secureTextEntry={!showOldPassword}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowOldPassword(!showOldPassword)}
                  >
                    <SvgXml xml={showOldPassword ? IconEyeShow : IconEyeHide} />
                  </TouchableOpacity>
                </View>
                {errors.current_password && touched.current_password && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.current_password}
                  </Text>
                )}
                {/* ====================================new password  ================================ */}
                <View
                  style={tw` h-14  flex-row justify-between items-center px-4 rounded-full border border-borderColor mt-5`}
                >
                  <View style={tw`flex-1 flex-row items-center gap-3`}>
                    <SvgXml xml={IconPassword} />
                    <TextInput
                      key={showNewPassword ? "text" : "password"}
                      onChangeText={handleChange("new_password")}
                      onBlur={handleBlur("password")}
                      value={values.new_password}
                      placeholder="Password"
                      placeholderTextColor="#111111"
                      style={tw`flex-1 text-regularText `}
                      secureTextEntry={!showNewPassword}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    <SvgXml xml={showNewPassword ? IconEyeShow : IconEyeHide} />
                  </TouchableOpacity>
                </View>
                {errors.new_password && touched.new_password && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.new_password}
                  </Text>
                )}
                {/* ==================================== Confirm password  ================================ */}
                <View
                  style={tw` h-14  flex-row justify-between items-center px-4 rounded-full border border-borderColor mt-5`}
                >
                  <View style={tw`flex-1 flex-row items-center gap-3`}>
                    <SvgXml xml={IconPassword} />
                    <TextInput
                      key={showConfirmPassword ? "text" : "password"}
                      onChangeText={handleChange("password_confirmation")}
                      onBlur={handleBlur("password")}
                      value={values.password_confirmation}
                      placeholder="Password"
                      placeholderTextColor="#111111"
                      style={tw`flex-1 text-regularText `}
                      secureTextEntry={!showConfirmPassword}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  loading={isChangePasswordLoading}
                  disabled={isChangePasswordLoading}
                  buttonText="Save & Change"
                  buttonTextStyle={tw`text-base `}
                  buttonContainerStyle={tw`mt-8 `}
                />
              </View>
            )}

            {/* -------------------   submit button   ------------------ */}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChangePassward;
