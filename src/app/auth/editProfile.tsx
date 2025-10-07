import { IconCameraWhite, IconSave } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
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

const EditProfile = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
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
              <Image
                style={tw`  w-24 h-24 rounded-full`}
                source={ImgProfileImg}
              />
              <TouchableOpacity
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
                style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
              >
                <TextInput
                  defaultValue="John Doe"
                  placeholder="Enter your Full Name"
                  placeholderTextColor="#535353"
                  style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                />
              </View>

              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-4`}
              >
                Email
              </Text>
              <View
                style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
              >
                <TextInput
                  defaultValue="example@gmail.com"
                  placeholder="Enter your Email"
                  placeholderTextColor="#535353"
                  style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                />
              </View>

              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-4`}
              >
                Location
              </Text>
              <View
                style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
              >
                <TextInput
                  defaultValue="Dhaka, Bangladesh"
                  placeholder="Enter your Location"
                  placeholderTextColor="#535353"
                  style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                />
              </View>
            </View>
          </View>

          {/* ---------- submit button ---------- */}
          <PrimaryButton
            buttonText="Save changes"
            buttonContainerStyle={tw`mt-2`}
            buttonTextStyle={tw`text-base font-LufgaMedium`}
            leftIcon={IconSave}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
