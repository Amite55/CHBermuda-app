import {
  IconEmail,
  IconEyeHide,
  IconEyeShow,
  IconGoogle,
  IconPassword,
  IconTriangleArrow,
} from "@/assets/icons";
import { ImgSplashLogo } from "@/assets/image";
import TitleSubtile from "@/src/components/TitleSubtile";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
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

const SingIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  // ==================== Validation Schema ====================
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
    try {
      // await AsyncStorage.setItem("check", JSON.stringify(isChecked));
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={tw`flex-1 justify-center  px-5`}
          style={tw`bg-bgBaseColor`}
        >
          <View style={tw`w-full items-center  `}>
            <Image style={tw`w-36 h-36  `} source={ImgSplashLogo} />

            <TitleSubtile
              title="Welcome Back"
              subtile="Please use your credentials to sign in as a user"
            />

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => console.log(values)}
              validationSchema={LoginSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
              }) => (
                <View style={tw`w-full  mt-5`}>
                  <View
                    style={tw`w-full h-14 flex-row items-center px-4 rounded-full border border-borderColor gap-3`}
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

                  <View style={tw`flex-row justify-between my-8`}>
                    <View style={tw`flex-row gap-2 items-center rounded-none`}>
                      <TouchableOpacity
                        onPress={() => handleCheckBox()}
                        style={tw.style(
                          `border border-regularText w-5 h-5  justify-center items-center rounded-sm`,
                          isChecked
                            ? `bg-primaryBtn border-0`
                            : `bg-transparent`
                        )}
                      >
                        {isChecked ? (
                          <Text style={tw`text-white text-sm`}>✔</Text>
                        ) : null}
                      </TouchableOpacity>
                      <Text style={tw`text-regularText text-xs`}>
                        Remember me
                      </Text>
                    </View>
                    <Text style={tw` text-[12px] font-LufgaRegular`}>
                      <Link
                        href={"/auth/forgotPassword"}
                        style={tw`text-primaryBtn underline`}
                      >
                        Forget password?
                      </Link>
                    </Text>
                  </View>
                  {/* ------------------- sign in button    ---------------- */}

                  <PrimaryButton
                    buttonContainerStyle={tw`mb-5`}
                    buttonText="Sign In"
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
                      Don’t have an account ?
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => router.push("/auth/singUp")}
                      style={tw`flex-row items-center gap-1 `}
                    >
                      <Text
                        style={tw`text-primaryBtn text-base font-LufgaRegular`}
                      >
                        Sign up
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

export default SingIn;
