import {
  IconAboutUs,
  IconCrossRed,
  IconDeleteRed,
  IconEditPen,
  IconLock,
  IconLogout,
  IconNotificationWhite,
  IconPrivacyPolicy,
  IconProviderBalance,
  IconProviderMyService,
  IconProviderRecentOrders,
  IconProviderStaffs,
  IconRightTopConnerArrow,
} from "@/assets/icons";
import { ImgProfileImg, ImgProviderBG } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
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

const ProviderAccount = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
            userName="Provider"
            userImage={ImgProfileImg}
            notificationIcon={IconNotificationWhite}
            greetingStyle={tw`text-white `}
            userNameStyle={tw`text-white `}
            notificationOnPress={() => {
              router.push(
                "/serviceProvider/notificationProvider/notifications"
              );
            }}
            profileOnPress={() => {}}
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
            titleText="Mr. Lopez"
            subTitleText="example@gmail.com"
            image={ImgProfileImg}
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
              // router.push("/auth/changePassward");
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
              router.replace("/auth/singIn");
            }}
            titleText="Logout"
            subTitleText="You have to login using username and password again after logout"
            subTitleStyle={tw`text-xs`}
            icon={IconLogout}
          />
        </View>
      </ScrollView>

      {/* ============================ logout modal =========================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 px-5`}
          >
            <View style={[tw`bg-white   rounded-2xl p-6 h-88`]}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                // behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
                // keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
              >
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
              </KeyboardAvoidingView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ProviderAccount;
