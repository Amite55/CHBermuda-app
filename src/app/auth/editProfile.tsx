import { IconCameraWhite, IconSave } from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useEditProfileMutation,
  useEditProfilePicMutation,
} from "@/src/redux/Api/authSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { PrimaryColor } from "@/src/utils/util";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

const EditProfile = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [image, setImage] = useState<any>(null);
  const toast = useToastHelpers();

  // ============ hooks ==================
  const { profileData, isProfileLoading, profileRefetch, isProfileFetching } =
    useProfile();

  // -------------- api end point =============
  const [updateProfileInfo, { isLoading }] = useEditProfileMutation();
  const [editProfilePicture, { isLoading: isImageLoading }] =
    useEditProfilePicMutation();

  // ================ profile fil image update =================
  const handleProfileImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        // aspect: [4, 4],
        quality: 1,
      });
      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        const selectedImage = result.assets[0];

        const filename =
          selectedImage.fileName ??
          selectedImage.uri.split("/").pop() ??
          `image_${Date.now()}.jpg`;

        const extMatch = /\.(\w+)$/.exec(filename);
        const mime = extMatch ? `image/${extMatch[1]}` : "image/jpeg";
        const formData = new FormData();

        formData.append("photo", {
          uri: selectedImage.uri,
          name: filename,
          type: mime,
        } as any);
        console.log(formData, "this is form data ");
        const res = await editProfilePicture(formData).unwrap();
        if (res) {
          toast.success(
            res?.message || "Profile Image updated successfully",
            3000,
          );
        }
      } else {
        toast.showError("Uploaded cancelled ", 3000);
      }
    } catch (error: any) {
      console.log(error, "Profile Image not updated ------------>");
      toast.showError(
        error.message ||
          error?.data?.message ||
          error ||
          error?.data ||
          "Profile Image not updated please try again",
        3000,
      );
    }
  };

  // ======================== edit profile info ==========================
  const handleUpdateProfile = async (values: any) => {
    try {
      const res = await updateProfileInfo(values).unwrap();
      if (res) {
        toast.success(res?.message || "OTP send successfully", 3000);
      }
      console.log(res, "this is response of update profile");
    } catch (error: any) {
      toast.showError(
        error.message ||
          error?.data?.message ||
          error ||
          error?.data ||
          "Something went wrong please try again",
        3000,
      );
    }
  };

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
        <Formik
          initialValues={{
            phone: profileData?.data?.phone || "",
            name: profileData?.data?.name || "",
            address: profileData?.data?.address || "",
            email: profileData?.data?.email || "",
          }}
          onSubmit={(values) => handleUpdateProfile(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={tw`flex-1 bg-bgBaseColor`}
              contentContainerStyle={[
                tw`px-5 flex-grow justify-between`,
                keyboardVisible ? tw`pb-20` : tw`pb-2`,
              ]}
            >
              <View>
                <BackTitleButton
                  title="Edit profile"
                  onPress={() => router.back()}
                />
                {/* ======================= user profile image ======================= */}
                <View style={tw`relative items-center`}>
                  {isImageLoading ? (
                    <ActivityIndicator color={PrimaryColor} size={"large"} />
                  ) : (
                    <Image
                      style={tw`  w-24 h-24 rounded-full`}
                      source={profileData?.data?.avatar}
                      contentFit="cover"
                      placeholder={ImgPlaceholderProfile}
                    />
                  )}
                  <TouchableOpacity
                    onPress={handleProfileImage}
                    disabled={isImageLoading}
                    activeOpacity={0.7}
                    style={tw`absolute right-4/12 -bottom-1 w-10 h-10 items-center justify-center rounded-full bg-primaryBtn`}
                  >
                    <SvgXml xml={IconCameraWhite} />
                  </TouchableOpacity>
                </View>

                {/* ======================= user profile form ======================= */}
                {/* ---------- input form ---------- */}

                <View style={tw` mt-4`}>
                  <Text
                    style={tw`font-LufgaMedium text-base text-regularText mt-2`}
                  >
                    Full Name
                  </Text>
                  <View
                    style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1 bg-slate-100`}
                  >
                    <TextInput
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      placeholder="Enter your Full Name"
                      placeholderTextColor="#535320"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                      value={values.name}
                    />
                  </View>

                  <Text
                    style={tw`font-LufgaMedium text-base text-regularText mt-4`}
                  >
                    Phone
                  </Text>
                  <View
                    style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1 bg-slate-100`}
                  >
                    <TextInput
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      placeholder="Enter your Phone"
                      placeholderTextColor="#535320"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                      keyboardType="number-pad"
                      value={values.phone}
                    />
                  </View>
                  <Text
                    style={tw`font-LufgaMedium text-base text-regularText mt-4`}
                  >
                    Email
                  </Text>
                  <View
                    style={tw`w-full h-12 px-4 rounded-full border border-borderColor bg-slate-200 mt-1`}
                  >
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      keyboardType="email-address"
                      placeholder="Enter your Email"
                      placeholderTextColor="#535320"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                      value={values.email}
                      editable={false}
                    />
                  </View>

                  <Text
                    style={tw`font-LufgaMedium text-base text-regularText mt-4`}
                  >
                    Location
                  </Text>
                  <View
                    style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1 bg-slate-100`}
                  >
                    <TextInput
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      placeholder="Enter your Location"
                      placeholderTextColor="#535320"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                      value={values.address}
                    />
                  </View>
                </View>
              </View>

              {/* ---------- submit button ---------- */}
              <PrimaryButton
                loading={isLoading}
                disabled={isLoading}
                onPress={handleSubmit}
                buttonText="Save changes"
                buttonContainerStyle={tw`mt-2`}
                buttonTextStyle={tw`text-base font-LufgaMedium`}
                leftIcon={IconSave}
              />
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
