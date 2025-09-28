import { IconEyeHide, IconEyeShow, IconPassword } from "@/assets/icons";
import { ImgChangePass } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
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

const ChangePassward = () => {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // ==================== Validation Schema ====================
  const ResetSchema = Yup.object().shape({
    old_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    CPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor `}
      contentContainerStyle={tw`pb-5 px-5`}
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
          old_password: "",
          new_password: "",
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
            {/* ==================================== old password  ================================ */}
            <View
              style={tw` h-14  flex-row justify-between items-center px-4 rounded-full border border-borderColor mt-5`}
            >
              <View style={tw`flex-1 flex-row items-center gap-3`}>
                <SvgXml xml={IconPassword} />
                <TextInput
                  key={showOldPassword ? "text" : "password"}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.old_password}
                  placeholder="Old Password"
                  placeholderTextColor="#111111"
                  style={tw` text-regularText `}
                  secureTextEntry={!showOldPassword}
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowOldPassword(!showOldPassword)}
              >
                <SvgXml xml={showOldPassword ? IconEyeShow : IconEyeHide} />
              </TouchableOpacity>
            </View>
            {errors.old_password && touched.old_password && (
              <Text style={tw`text-red-500 text-xs mt-1`}>
                {errors.old_password}
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
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.new_password}
                  placeholder="Password"
                  placeholderTextColor="#111111"
                  style={tw` text-regularText `}
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
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.CPassword}
                  placeholder="Password"
                  placeholderTextColor="#111111"
                  style={tw` text-regularText `}
                  secureTextEntry={!showConfirmPassword}
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <SvgXml xml={showConfirmPassword ? IconEyeShow : IconEyeHide} />
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
              buttonText="Save chanegs"
              buttonTextStyle={tw`text-base `}
              buttonContainerStyle={tw`mt-8 `}
            />
          </View>
        )}

        {/* -------------------   submit button   ------------------ */}
      </Formik>
    </ScrollView>
  );
};

export default ChangePassward;
