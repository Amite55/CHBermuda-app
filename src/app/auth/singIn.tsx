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
import { useRoleHooks } from "@/src/hooks/useRoleHooks";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useLoginMutation } from "@/src/redux/Api/authSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React, { useCallback, useEffect } from "react";
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
  const [savedEmail, setSavedEmail] = React.useState("");
  const [savedPassword, setSavedPassword] = React.useState("");
  const toast = useToastHelpers();
  const role = useRoleHooks();

  // =============== api end point =================
  const [singInInfo, { isLoading: isLoginLoading }] = useLoginMutation();

  // ==================== Validation Schema ====================
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // ============== remember me checkbox handler ================
  const handleCheckBox = async () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    await AsyncStorage.setItem("rememberMe", JSON.stringify(newValue));
    if (!newValue) {
      await AsyncStorage.removeItem("loginInfo");
      setSavedEmail("");
      setSavedPassword("");
    }
  };

  // ==================== handle sing in =====================
  const handleSingIn = useCallback(
    async (values: any) => {
      console.log(values.email);
      try {
        const payload = {
          ...values,
          role: role,
        };
        const res = await singInInfo(payload).unwrap();
        // ------------- login info save async storage -------------
        if (isChecked) {
          await AsyncStorage.setItem(
            "loginInfo",
            JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          );
        } else {
          await AsyncStorage.removeItem("loginInfo");
        }
        if (res) {
          await AsyncStorage.setItem("token", res?.data?.access_token);
          if (res?.data?.user?.role === "USER") {
            router.replace("/user_role_sections/user_tabs/user_home");
          } else if (res?.data?.user?.role === "PROVIDER") {
            router.replace("/serviceProvider/serviceProviderTabs/providerHome");
          } else if (res?.data?.user?.role === "ADMIN") {
            router.replace("/admin_provider/adminTabs/adminHome");
          }
        }
      } catch (error: any) {
        console.log(error, "Sing in not success _______________________");
        toast.showError(
          error.message ||
            error?.data?.message ||
            error ||
            error?.data ||
            "Something went wrong please try again",
          4000,
        );
      }
    },
    [role, isChecked],
  );

  // -------------------- default render when you can add remember me ---------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const check = await AsyncStorage.getItem("rememberMe");
        const rememberMeValue = check ? JSON.parse(check) : false;
        if (rememberMeValue) {
          const savedInfo = await AsyncStorage.getItem("loginInfo");
          if (savedInfo) {
            const parsed = JSON.parse(savedInfo);
            setIsChecked(true);
            setSavedEmail(parsed.email || "");
            setSavedPassword(parsed.password || "");
          }
        } else {
          await AsyncStorage.removeItem("loginInfo");
          setIsChecked(false);
          setSavedEmail("");
          setSavedPassword("");
        }
      } catch (error) {
        console.error("Error loading saved data:", error);
        await AsyncStorage.removeItem("loginInfo");
        await AsyncStorage.removeItem("rememberMe");
        setIsChecked(false);
        setSavedEmail("");
        setSavedPassword("");
      }
    };
    loadData();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={tw` justify-center px-5`}
          style={tw`flex-1  bg-bgBaseColor `}
        >
          <View style={tw`w-full items-center  `}>
            <Image style={tw`w-36 h-36  `} source={ImgSplashLogo} />

            <TitleSubtile
              title="Welcome Back"
              subtile="Please use your credentials to sign in as a user"
            />
            <Formik
              initialValues={{ email: savedEmail, password: savedPassword }}
              onSubmit={(values) => handleSingIn(values)}
              validationSchema={LoginSchema}
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

                  <View style={tw`flex-row justify-between my-8`}>
                    <View style={tw`flex-row gap-2 items-center rounded-none`}>
                      <TouchableOpacity
                        onPress={() => handleCheckBox()}
                        style={tw.style(
                          `border border-regularText w-5 h-5  justify-center items-center rounded-sm`,
                          isChecked
                            ? `bg-primaryBtn border-0`
                            : `bg-transparent`,
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
                    loading={isLoginLoading}
                    disabled={isLoginLoading}
                    buttonContainerStyle={tw`mb-5`}
                    buttonText="Sign In"
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
