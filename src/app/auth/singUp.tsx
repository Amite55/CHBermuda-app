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
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";

const SingUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  // ==================== Validation Schema ====================
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    CPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
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
    <ScrollView
      contentContainerStyle={tw`flex-1 justify-center  px-5`}
      style={tw`bg-bgBaseColor`}
    >
      <View style={tw`w-full items-center  `}>
        <Image style={tw`w-36 h-36  `} source={ImgSplashLogo} />

        <TitleSubtile
          title="Create an account as a user"
          subtile="Use your credentials to create a new account"
        />

        <Formik
          initialValues={{
            email: "",
            password: "",
            fullName: "",
            CPassword: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={SignUpSchema}
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
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  placeholder="Enter your Full Name"
                  placeholderTextColor="#111111"
                  style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                />
              </View>
              {errors.fullName && touched.fullName && (
                <Text style={tw`text-red-500 text-xs mt-1`}>
                  {errors.fullName}
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
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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

              <View style={tw`flex-row gap-2 items-center rounded-none my-6`}>
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
                    <Text style={tw`text-primaryBtn`}>Terms & conditions </Text>{" "}
                    and <Text style={tw`text-primaryBtn`}>Privacy policy.</Text>
                    .
                  </Text>
                </View>
              </View>

              {/* ------------------- sign in button    ---------------- */}

              <PrimaryButton
                buttonContainerStyle={tw`mb-5`}
                buttonText="Sign In"
              />

              <View style={tw`flex-row items-center justify-center gap-4`}>
                <View style={tw`border-t border-borderColor `} />
                <Text style={tw`text-regularText text-base font-LufgaRegular`}>
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

              <View style={tw`flex-row items-center justify-center gap-2 pt-8`}>
                <Text style={tw`text-regularText text-base font-LufgaRegular`}>
                  Already have an account ?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => router.push("/auth/singIn")}
                  style={tw`flex-row items-center gap-1 `}
                >
                  <Text style={tw`text-primaryBtn text-base font-LufgaRegular`}>
                    Sign in
                  </Text>
                  <SvgXml xml={IconTriangleArrow} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default SingUp;
