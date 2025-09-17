import { IconEyeHide, IconEyeShow, IconPassword } from "@/assets/icons";
import { ImgSplashLogo } from "@/assets/image";
import TitleSubtile from "@/src/components/TitleSubtile";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
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
import * as Yup from "yup";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // ==================== Validation Schema ====================
  const ResetSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    CPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
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
                CPassword: "",
              }}
              onSubmit={(values) => console.log(values)}
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
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <SvgXml
                        xml={showConfirmPassword ? IconEyeShow : IconEyeHide}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.CPassword && touched.CPassword && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.CPassword}
                    </Text>
                  )}

                  <PrimaryButton
                    // onPress={handleSubmit}
                    loading={false}
                    disabled={false}
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
