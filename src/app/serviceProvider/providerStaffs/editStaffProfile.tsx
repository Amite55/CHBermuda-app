import {
  IconCameraWhite,
  IconDeleteRed,
  IconRightCornerArrowGray,
  IconSave,
  IconStaffProfile,
} from "@/assets/icons";
import { ImgProfileImg } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import LogoutModal from "@/src/context/LogoutModal";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
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

const EditStaffProfile = () => {
  const { id } = useLocalSearchParams();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  console.log(id, "this is da pppppppp>F");

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
          style={tw`flex-1 bg-bgBaseColor`}
          contentContainerStyle={[
            tw`px-5 flex-grow justify-between`,
            keyboardVisible ? tw`pb-10 pt-3` : tw`pb-0 `,
          ]}
        >
          <View>
            <BackTitleButton
              title="Staff details pro"
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
            {/* =-================= how much provided services =-================= */}
            <MenuCard
              endIcon={IconRightCornerArrowGray}
              icon={IconStaffProfile}
              titleText=" Service provided"
              subTitleText="Tab to Details"
              containerStyle={tw`justify-center rounded-full px-3 h-16 mt-6`}
              onPress={() => {}}
            />
            {/* ---------- input form ---------- */}
            <View style={tw` my-4`}>
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
                  defaultValue="K5kMl@example.com"
                  placeholder="Enter your Email"
                  placeholderTextColor="#535353"
                  style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                />
              </View>
              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-4`}
              >
                Phone
              </Text>
              <View
                style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
              >
                <TextInput
                  keyboardType="numeric"
                  defaultValue="01712345678"
                  placeholder="Enter your Phone"
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
          <View>
            {/* =-================= how much provided services =-================= */}
            <MenuCard
              icon={IconDeleteRed}
              titleText="Remove staff"
              subTitleText="Your account will be permanently deleted from this application."
              containerStyle={tw`justify-center  px-3  mt-6`}
              onPress={() => {
                setDeleteModalVisible(true);
              }}
            />
            {/* ====================== buttons ====================== */}
            <PrimaryButton
              onPress={() => {}}
              buttonText="Save changes"
              buttonTextStyle={tw`text-lg font-LufgaRegular`}
              leftIcon={IconSave}
              buttonContainerStyle={tw`mt-4 h-10`}
            />
          </View>

          {/* =================== delete modal ====================== */}
          <LogoutModal
            modalVisible={deleteModalVisible}
            onPress={() => setDeleteModalVisible(false)}
            setModalVisible={setDeleteModalVisible}
            buttonTitle="Remove"
            disabled={false}
            modalTitle="Are you sure to remove this staff ?"
            subTitle="After removing, this staff will no longer available it this system."
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditStaffProfile;
