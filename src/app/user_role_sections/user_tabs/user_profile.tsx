import {
  IconAboutUs,
  IconCrossRed,
  IconDeleteRed,
  IconDiamond,
  IconEditPen,
  IconLock,
  IconLogout,
  IconPrivacyPolicy,
  IconRightCornerArrowGreen,
  IconRightTopConnerArrow,
  IconSubscriptionPlan,
  IconSupport,
} from "@/assets/icons";
import { ImgG } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import tw from "@/src/lib/tailwind";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const User_Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // ============ hooks ==================
  const { profileData, isProfileLoading, profileRefetch, isProfileFetching } =
    useProfile();

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-bgBaseColor`}
        contentContainerStyle={tw`pb-20`}
      >
        <ImageBackground style={[tw` w-full h-36 `]} source={ImgG}>
          {/* ------------------- user header part ---------------- */}
          <UserInfoHeader
            containerStyle={tw`px-5`}
            userName={profileData?.data?.name}
            userImage={profileData?.data?.avatar}
            cartOnPress={() => {
              router.push("/user_role_sections/cart");
            }}
            notificationOnPress={() => {
              router.push(
                "/user_role_sections/notificationsUser/notifications",
              );
            }}
            profileOnPress={() => {
              router.push("/user_role_sections/user_tabs/user_profile");
            }}
          />
          <Text
            style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
          >
            Account
          </Text>
        </ImageBackground>
        {/* ========================== user profile section ========================== */}
        <View style={tw`px-5 gap-6 py-4`}>
          <MenuCard
            endIconOnPress={() => {
              router.push("/auth/editProfile");
            }}
            titleText={profileData?.data?.name}
            subTitleText={profileData?.data?.email}
            image={profileData?.data?.avatar}
            imageStyle={tw`w-20 h-20 rounded-full `}
            endIcon={IconEditPen}
            containerStyle={tw`py-4`}
          />

          <MenuCard
            onPress={() => {
              router.push("/user_role_sections/activePlan");
            }}
            titleText="2 active plans"
            subTitleText="Tap to see details"
            icon={IconDiamond}
            containerStyle={tw`py-4 border border-[#00AD2E] bg-[#EFFFF3]`}
            endIcon={IconRightCornerArrowGreen}
          />

          {/* ========================== user setting menu ========================== */}

          <View style={tw`gap-3`}>
            <MenuCard
              onPress={() => {
                router.push("/auth/changePassward");
              }}
              titleText="Change password"
              subTitleText="Change your account password."
              subTitleStyle={tw`text-xs`}
              icon={IconLock}
              endIcon={IconRightTopConnerArrow}
            />

            <MenuCard
              onPress={() => {
                router.push("/common/boutAboutUs");
              }}
              titleText="About us"
              subTitleText="About application and platform."
              subTitleStyle={tw`text-xs`}
              icon={IconAboutUs}
              endIcon={IconRightTopConnerArrow}
            />

            <MenuCard
              onPress={() => {
                router.push("/common/boutPrivacyPolicy");
              }}
              titleText="Privacy policy"
              subTitleText="Read it carefully before accepting. "
              subTitleStyle={tw`text-xs`}
              icon={IconPrivacyPolicy}
              endIcon={IconRightTopConnerArrow}
            />
            <MenuCard
              onPress={() => {
                router.push("/user_role_sections/user_tabs/explore");
              }}
              titleText="Subscription plans"
              subTitleText="Purchase plans to get more features."
              subTitleStyle={tw`text-xs`}
              icon={IconSubscriptionPlan}
              endIcon={IconRightTopConnerArrow}
            />
            <MenuCard
              onPress={() => {
                router.push("/user_role_sections/support");
              }}
              titleText="Support"
              subTitleText="Contact with admin for any kind of emergency support. "
              subTitleStyle={tw`text-xs`}
              icon={IconSupport}
              endIcon={IconRightTopConnerArrow}
            />
            <MenuCard
              onPress={() => {
                setIsModalVisible(true);
              }}
              titleText="Delete account"
              subTitleText="Your account will be permanently deleted from this application. "
              subTitleStyle={tw`text-xs`}
              icon={IconDeleteRed}
              endIcon={IconRightTopConnerArrow}
            />
            <MenuCard
              onPress={() => {
                router.replace("/auth/singIn");
              }}
              titleText="Logout"
              subTitleText="You have to login using username and password again after logout"
              subTitleStyle={tw`text-xs`}
              icon={IconLogout}
            />
          </View>
        </View>
      </ScrollView>

      {/* ============================ logout modal =========================== */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View
              style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 px-5`}
            >
              <View style={[tw`bg-white   rounded-2xl p-6 h-88`]}>
                <View style={tw`flex-row justify-between`}>
                  <View />
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    style={tw`p-3 rounded-full justify-center items-center bg-gray-300 shadow-md`}
                  >
                    <SvgXml xml={IconCrossRed} />
                  </TouchableOpacity>
                </View>
                <View style={tw`justify-center items-center pb-4 gap-1`}>
                  <SvgXml width={35} height={35} xml={IconDeleteRed} />
                  <Text style={tw`text-center font-LufgaSemiBold  text-lg `}>
                    Are you sure to delete your account ?
                  </Text>

                  <Text
                    style={tw`text-center font-LufgaMedium  text-sm text-regularText`}
                  >
                    For deleting please enter your password
                  </Text>
                </View>

                <View style={tw`mt-6`}>
                  <TextInput
                    placeholder="Password"
                    style={tw`w-full border rounded-lg h-11 bg-bgBaseColor px-2`}
                    // onChangeText={(i) => serUserPass(i)}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsModalVisible(false)}
                  style={tw` rounded-full bg-red-500 my-3`}
                >
                  <Text
                    style={tw`font-LufgaMedium text-lg text-center p-2 text-white`}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default User_Profile;
