import {
  IconAboutUs,
  IconDeleteRed,
  IconDiamond,
  IconEditPen,
  IconLock,
  IconLogout,
  IconLogoutModal,
  IconPrivacyPolicy,
  IconRightCornerArrowGray,
  IconRightCornerArrowGreen,
  IconRightTopConnerArrow,
  IconSubscriptionPlan,
  IconSupport,
} from "@/assets/icons";
import { ImgG } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import DeleteAccountModal from "@/src/context/DeleteAccountModal";
import LogoutModal from "@/src/context/LogoutModal";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useLogoutMutation } from "@/src/redux/Api/authSlices";
import { useGetActivePlansQuery } from "@/src/redux/Api/userRole/accountSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const User_Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const toast = useToastHelpers();

  // ============ hooks ==================
  const { profileData, isProfileLoading, profileRefetch, isProfileFetching } =
    useProfile();
  const { data: activePlans, isLoading: isActivePlansLoading } =
    useGetActivePlansQuery({});
  const [singOut, { isLoading: isLogoutLoading }] = useLogoutMutation();

  // =============== account delete function ===============

  const handleDeleteConfirm = (password: string) => {
    console.log("Delete with password:", password);
    setIsModalVisible(false);
  };

  // =============== account logout function ===============
  const handleLogoutUser = async () => {
    try {
      const res = await singOut({}).unwrap();
      if (res) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
        router.replace("/chooseRole");
      }
    } catch (error: any) {
      console.log(error, "can't logout your account ----------->");
      toast.showError(
        error?.message || error || "Can't logout your account",
        3000,
      );
    } finally {
      setLogoutModal(false);
    }
  };

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
            titleText={
              activePlans?.data?.length > 0
                ? `${activePlans?.data?.length}` + " " + "Active Plan"
                : "0 Active Plan"
            }
            subTitleText="Tap to see details"
            icon={IconDiamond}
            containerStyle={[
              tw`py-4 border  `,
              activePlans?.data?.length > 0
                ? tw`border-[#00AD2E] bg-[#EFFFF3]`
                : tw`border-subText bg-slate-200`,
            ]}
            endIcon={
              activePlans?.data?.length > 0
                ? IconRightCornerArrowGreen
                : IconRightCornerArrowGray
            }
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
                // router.replace("/auth/singIn");
                setLogoutModal(true);
              }}
              titleText="Logout"
              subTitleText="You have to login using username and password again after logout"
              subTitleStyle={tw`text-xs`}
              icon={IconLogout}
            />
          </View>
        </View>
      </ScrollView>

      {/* ------------------- logout modal ------------------ */}
      <LogoutModal
        modalVisible={logoutModal}
        setModalVisible={setLogoutModal}
        disabled={isLogoutLoading}
        loading={isLogoutLoading}
        logoutIcon={IconLogoutModal}
        buttonTitle="Yes, Log out"
        modalTitle="Are you sure you want to log out?"
        subTitle="You will need to log in again to access your account."
        onPress={() => {
          handleLogoutUser();
        }}
      />

      {/* ============================ delete  account  modal =========================== */}
      <DeleteAccountModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default User_Profile;
