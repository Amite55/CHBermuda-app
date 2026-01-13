import {
  IconEmail,
  IconEyeHide,
  IconEyeShow,
  IconGoogle,
  IconPassword,
  IconTriangleArrow,
  IconUserName,
} from "@/assets/icons";
import { ImgSplashLogo } from "@/assets/image";
import TitleSubtile from "@/src/components/TitleSubtile";
import { useGetProviderTypes } from "@/src/hooks/useGetProviderTypes";
import { useRoleHooks } from "@/src/hooks/useRoleHooks";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useRegisterMutation } from "@/src/redux/Api/authSlices";
import { ISignUp } from "@/src/redux/CommonTypes/CommonType";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
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

const SingUp = () => {
  const toast = useToastHelpers();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const role = useRoleHooks();
  const providerType = useGetProviderTypes();
  // =============== api end point =================
  const [registerInfo, { isLoading: isSingUpLoading }] = useRegisterMutation();

  // ==================== Validation Schema ====================
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    name: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
    try {
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };

  // =-==================== handle sing up =====================-=
  const handleSingUp = async (values: ISignUp) => {
    try {
      const payload = {
        ...values,
        role: role,
        // ...(role === "PROVIDER" && { provider_type: providerType }),
      };
      const res = await registerInfo(payload).unwrap();
      if (res) {
        router.push({
          pathname: "/auth/singUpOTP",
          params: { email: values.email },
        });
      }
    } catch (error: any) {
      console.log(error, "Sing up not success _______________________");
      toast.showError(
        error.message ||
          error?.data?.message ||
          error ||
          error?.data ||
          "Something went wrong please try again",
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
        <ScrollView
          contentContainerStyle={tw`justify-center  px-5`}
          style={tw`flex-1  bg-bgBaseColor`}
        >
          <View style={tw`w-full items-center  `}>
            <Image style={tw`w-36 h-36  `} source={ImgSplashLogo} />

            <TitleSubtile
              title="Create an account as a user"
              subtile="Use your credentials to create a new account"
            />

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values) => handleSingUp(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
              }) => (
                <View>
                  {/* ---------------------- full name Input ---------------------- */}
                  <View
                    style={tw`w-full h-14 flex-row items-center px-4 rounded-full border border-borderColor gap-3 mt-6`}
                  >
                    <SvgXml xml={IconUserName} />
                    <TextInput
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      placeholder="Enter your Full Name"
                      placeholderTextColor="#111111"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.name && touched.name && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.name}
                    </Text>
                  )}
                  {/* ---------------------- Email Input ---------------------- */}
                  <View
                    style={tw`w-full h-14 flex-row items-center px-4 rounded-full border border-borderColor gap-3 mt-3`}
                  >
                    <SvgXml xml={IconEmail} />
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Enter your Email"
                      placeholderTextColor="#111111"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.email}
                    </Text>
                  )}

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
                        style={tw`flex-1 text-regularText `}
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
                        onChangeText={handleChange("password_confirmation")}
                        onBlur={handleBlur("password_confirmation")}
                        value={values.password_confirmation}
                        placeholder="Confirm Password"
                        placeholderTextColor="#111111"
                        style={tw`flex-1 text-regularText `}
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
                  {errors.password_confirmation &&
                    touched.password_confirmation && (
                      <Text style={tw`text-red-500 text-xs mt-1`}>
                        {errors.password_confirmation}
                      </Text>
                    )}

                  <View
                    style={tw`flex-row gap-2 items-center rounded-none my-6`}
                  >
                    <TouchableOpacity
                      onPress={() => handleCheckBox()}
                      style={tw.style(
                        `border border-regularText w-5 h-5  justify-center items-center rounded-sm`,
                        isChecked ? `bg-primaryBtn border-0` : `bg-transparent`
                      )}
                    >
                      {isChecked ? (
                        <Text style={tw`text-white text-sm`}>✔</Text>
                      ) : null}
                    </TouchableOpacity>
                    <View style={tw`flex-1`}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={tw` font-LufgaRegular text-regularText text-xs`}
                      >
                        Agree to{" "}
                        <Text style={tw`text-primaryBtn`}>
                          Terms & conditions{" "}
                        </Text>{" "}
                        and{" "}
                        <Text style={tw`text-primaryBtn`}>Privacy policy.</Text>
                        .
                      </Text>
                    </View>
                  </View>

                  {/* ------------------- sign in button    ---------------- */}
                  <PrimaryButton
                    disabled={!isChecked}
                    loading={isSingUpLoading}
                    buttonContainerStyle={[
                      tw`mb-5`,
                      !isChecked && tw`bg-gray-500 pointer-events-none`,
                    ]}
                    buttonText="Sign UP"
                    onPress={handleSubmit}
                  />

                  <View style={tw`flex-row items-center justify-center gap-4`}>
                    <View style={tw`border-t border-borderColor `} />
                    <Text
                      style={tw`text-regularText text-base font-LufgaRegular`}
                    >
                      or continue with
                    </Text>
                    <View style={tw`border  border-borderColor `} />
                  </View>

                  <View style={tw`justify-center items-center pt-5`}>
                    <TouchableOpacity
                      style={tw`bg-white rounded-full w-14 h-14 items-center justify-center`}
                    >
                      <SvgXml xml={IconGoogle} />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={tw`flex-row items-center justify-center gap-2 pt-8`}
                  >
                    <Text
                      style={tw`text-regularText text-base font-LufgaRegular`}
                    >
                      Already have an account ?
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => router.push("/auth/singIn")}
                      style={tw`flex-row items-center gap-1 `}
                    >
                      <Text
                        style={tw`text-primaryBtn text-base font-LufgaRegular`}
                      >
                        Sign In
                      </Text>
                      <SvgXml xml={IconTriangleArrow} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SingUp;
