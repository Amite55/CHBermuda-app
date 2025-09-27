import {
  IconAboutUs,
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
import { ImgProfileImg, ImgUserBG } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import { ImageBackground } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const User_Profile = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-20`}
    >
      <ImageBackground style={[tw` w-full h-36 `]} source={ImgUserBG}>
        {/* ------------------- user header part ---------------- */}
        <UserInfoHeader containerStyle={tw`px-5`} />
        <Text
          style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
        >
          Account
        </Text>
      </ImageBackground>
      {/* ========================== user profile section ========================== */}
      <View style={tw`px-5 gap-6 py-4`}>
        <MenuCard
          onPress={() => {}}
          titleText="Mr. Lopez"
          subTitleText="example@gmail.com"
          image={ImgProfileImg}
          imageStyle={tw`w-20 h-20 rounded-full `}
          endIcon={IconEditPen}
          containerStyle={tw`py-4`}
        />

        <MenuCard
          onPress={() => {}}
          titleText="2 active plans"
          subTitleText="Tap to see details"
          icon={IconDiamond}
          containerStyle={tw`py-4 border border-[#00AD2E] bg-[#EFFFF3]`}
          endIcon={IconRightCornerArrowGreen}
        />

        {/* ========================== user setting menu ========================== */}

        <View style={tw`gap-3`}>
          <MenuCard
            onPress={() => {}}
            titleText="Change password"
            subTitleText="Change your account password."
            subTitleStyle={tw`text-xs`}
            icon={IconLock}
            endIcon={IconRightTopConnerArrow}
          />

          <MenuCard
            onPress={() => {}}
            titleText="About us"
            subTitleText="About application and platform."
            subTitleStyle={tw`text-xs`}
            icon={IconAboutUs}
            endIcon={IconRightTopConnerArrow}
          />

          <MenuCard
            onPress={() => {}}
            titleText="Privacy policy"
            subTitleText="Read it carefully before accepting. "
            subTitleStyle={tw`text-xs`}
            icon={IconPrivacyPolicy}
            endIcon={IconRightTopConnerArrow}
          />
          <MenuCard
            onPress={() => {}}
            titleText="Subscription plans"
            subTitleText="Purchase plans to get more features."
            subTitleStyle={tw`text-xs`}
            icon={IconSubscriptionPlan}
            endIcon={IconRightTopConnerArrow}
          />
          <MenuCard
            onPress={() => {}}
            titleText="Support"
            subTitleText="Contact with admin for any kind of emergency support. "
            subTitleStyle={tw`text-xs`}
            icon={IconSupport}
            endIcon={IconRightTopConnerArrow}
          />
          <MenuCard
            onPress={() => {}}
            titleText="Delete account"
            subTitleText="Your account will be permanently deleted from this application. "
            subTitleStyle={tw`text-xs`}
            icon={IconDeleteRed}
            endIcon={IconRightTopConnerArrow}
          />
          <MenuCard
            onPress={() => {}}
            titleText="Logout"
            subTitleText="You have to login using username and password again after logout"
            subTitleStyle={tw`text-xs`}
            icon={IconLogout}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default User_Profile;
