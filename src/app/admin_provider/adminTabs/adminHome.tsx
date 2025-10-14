import {
  IconNotificationWhite,
  IconProviderNewOrder,
  IconProviderPendingOrder,
  IconProviderRecentOrders,
} from "@/assets/icons";
import { ImgProfileImg, ImgProviderBG, ImgServiceImage } from "@/assets/image";
import OrderCard from "@/src/components/OrderCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AdminHome = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-5 `}
    >
      <StatusBar style="dark" backgroundColor="#183E9F" />
      <View style={tw`relative`}>
        <ImageBackground style={tw` w-full h-48`} source={ImgProviderBG}>
          {/* ------------------- user header part ---------------- */}
          <UserInfoHeader
            containerStyle={tw`px-5`}
            notificationContentStyle={tw`bg-[#FFFFFF33] `}
            userName="Admin Provider"
            userImage={ImgProfileImg}
            notificationIcon={IconNotificationWhite}
            greetingStyle={tw`text-white `}
            userNameStyle={tw`text-white `}
            notificationOnPress={() => {
              router.push(
                "/admin_provider/adminNotification/notificationsAdmin"
              );
            }}
            profileOnPress={() => {}}
          />
        </ImageBackground>

        <View
          style={tw`absolute -bottom-25 left-0 right-0 p-5 bg-white rounded-3xl  mx-4`}
        >
          <View style={tw` flex-row items-center justify-between `}>
            <View style={tw`justify-center items-center gap-2`}>
              <SvgXml xml={IconProviderNewOrder} />
              <Text style={tw`font-LufgaRegular text-base text-subText `}>
                New Order
              </Text>
              <Text style={tw`font-LufgaMedium text-black text-xl`}>10</Text>
            </View>
            <View style={tw`w-0.5 h-14 bg-slate-300`} />
            <View style={tw`justify-center items-center gap-2`}>
              <SvgXml xml={IconProviderPendingOrder} />
              <Text style={tw`font-LufgaRegular text-base text-subText `}>
                Pending Order
              </Text>
              <Text style={tw`font-LufgaMedium text-black text-xl`}>8</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center gap-1 justify-center pt-3`}>
            <Text className="font-LufgaRegular text-base text-subText">
              Todays total order:
            </Text>
            <Text style={tw`font-LufgaMedium text-base text-black`}>18</Text>
          </View>
        </View>
      </View>

      {/* =========================== provider recent order =========================== */}
      <View style={tw`flex-row items-center pl-5 gap-2 mt-32`}>
        <SvgXml xml={IconProviderRecentOrders} />
        <Text style={tw`font-medium text-base text-black`}>Assigned order</Text>
      </View>
      <View style={tw`mt-4 gap-4 px-5`}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <OrderCard
              key={index.toString()}
              onPress={() => {}}
              image={ImgServiceImage}
              title="Order Title"
              subTitle="Order Sub Title"
              dateAndTime="Date and Time"
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AdminHome;
