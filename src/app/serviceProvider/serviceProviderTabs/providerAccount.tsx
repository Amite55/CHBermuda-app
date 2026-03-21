import {
  IconAboutUs,
  IconDeleteRed,
  IconEditPen,
  IconLock,
  IconLogout,
  IconLogoutModal,
  IconNotificationWhite,
  IconPrivacyPolicy,
  IconProviderBalance,
  IconProviderMyService,
  IconProviderRecentOrders,
  IconProviderStaffs,
  IconRightTopConnerArrow,
} from "@/assets/icons";
import { ImgProviderBG } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import DeleteAccountModal from "@/src/context/DeleteAccountModal";
import LogoutModal from "@/src/context/LogoutModal";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useDeleteProfileMutation,
  useLogoutMutation,
} from "@/src/redux/Api/authSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const ProviderAccount = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toast = useToastHelpers();

  // ============ hooks ==================
  const { profileData, isProfileLoading, profileRefetch, isProfileFetching } =
    useProfile();
  // ============== api end point =============================
  const [singOut, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [deleteProfile, { isLoading: isDeleteProfileLoading }] =
    useDeleteProfileMutation();

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

  // ============== delete account function ================
  const handleDeleteConfirm = async (password: string) => {
    try {
      const res = await deleteProfile({ password }).unwrap();
      if (res) {
        setIsModalVisible(false);
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
        await AsyncStorage.removeItem("loginInfo");
        router.replace("/chooseRole");
      }
    } catch (error: any) {
      setIsModalVisible(false);
      console.log(error, "Your account not deleted ->");
      toast.showError(error.message || "Your account not deleted", 3000);
    }
  };
  return (
    <View style={tw`flex-1`}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-bgBaseColor`}
        contentContainerStyle={tw`pb-5 `}
      >
        <ImageBackground style={tw` w-full h-24`} source={ImgProviderBG}>
          {/* ------------------- user header part ---------------- */}
          <UserInfoHeader
            containerStyle={tw`px-5 items-center`}
            notificationContentStyle={tw`bg-[#FFFFFF33] `}
            userName={profileData?.data?.name}
            userImage={profileData?.data?.avatar}
            notificationIcon={IconNotificationWhite}
            greetingStyle={tw`text-white `}
            userNameStyle={tw`text-white `}
            notificationOnPress={() => {
              router.push(
                "/serviceProvider/notificationProvider/notifications",
              );
            }}
            profileOnPress={() => {
              router.push("/auth/editProfile");
            }}
          />
        </ImageBackground>
        <Text
          style={tw`font-LufgaMedium text-2xl text-center text-regularText pt-5 pb-3`}
        >
          Account
        </Text>

        {/* ------------------------ profile menu ---------------- */}
        <View style={tw`px-5 gap-3 `}>
          <MenuCard
            endIconOnPress={() => {
              router.push("/auth/editProfile");
            }}
            titleText={profileData?.data?.name}
            subTitleText={profileData?.data?.email}
            image={profileData?.data?.avatar}
            imageStyle={tw`w-20 h-20 rounded-full `}
            endIcon={IconEditPen}
            containerStyle={tw`py-2`}
          />
          <MenuCard
            onPress={() => {
              // router.push("/auth/changePassward");
            }}
            titleText="Available balance"
            subTitleText="$1200"
            subTitleStyle={tw`font-LufgaSemiBold text-xl text-black`}
            icon={IconProviderBalance}
            endIcon={IconRightTopConnerArrow}
            containerStyle={tw`pb-2`}
          />

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
              router.push("/serviceProvider/myServices/myService");
            }}
            titleText="My services"
            subTitleText="Manage your services"
            subTitleStyle={tw`text-xs`}
            icon={IconProviderMyService}
            endIcon={IconRightTopConnerArrow}
          />
          <MenuCard
            onPress={() => {
              router.push("/serviceProvider/serviceHistory");
            }}
            titleText="Service history"
            subTitleText="See your previous services."
            subTitleStyle={tw`text-xs`}
            icon={IconProviderRecentOrders}
            endIcon={IconRightTopConnerArrow}
          />
          <MenuCard
            onPress={() => {
              router.push("/serviceProvider/providerStaffs/staffs");
            }}
            titleText="Staffs"
            subTitleText="Manage your staffs"
            subTitleStyle={tw`text-xs`}
            icon={IconProviderStaffs}
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
              setLogoutModal(true);
            }}
            titleText="Logout"
            subTitleText="You have to login using username and password again after logout"
            subTitleStyle={tw`text-xs`}
            icon={IconLogout}
          />
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
        disabled={isDeleteProfileLoading}
        loading={isDeleteProfileLoading}
      />
    </View>
  );
};

export default ProviderAccount;
