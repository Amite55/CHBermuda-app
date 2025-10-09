import {
  IconNotificationWhite,
  IconProviderNewOrder,
  IconProviderPendingOrder,
  IconProviderRecentOrders,
  IconProviderStaffs,
} from "@/assets/icons";
import { ImgProfileImg, ImgProviderBG, ImgServiceImage } from "@/assets/image";
import OrderCard from "@/src/components/OrderCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const ProviderHome = () => {
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

      {/* ================ your staff section ================ */}

      <View style={tw`flex-row justify-between items-center px-5 mt-32`}>
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconProviderStaffs} />
          <Text style={tw`font-medium text-base text-black`}>Staffs</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={tw`border border-subText px-2 py-1 rounded-lg`}
        >
          <Text style={tw`font-LufgaRegular text-sm text-black`}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        style={tw``}
        contentContainerStyle={tw`px-5 gap-4 mt-4`}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={tw`relative `}>
                <Image
                  source={ImgProfileImg}
                  style={tw`w-20 h-20 rounded-full `}
                />
                <View
                  style={tw`absolute top-1 right-1 w-3 h-3 bg-green-600 rounded-full`}
                />
              </View>
              <Text style={tw`font-LufgaMedium text-sm text-black pt-2`}>
                Staff Name
              </Text>
            </View>
          );
        }}
      />

      {/* =========================== provider recent order =========================== */}
      <View style={tw`flex-row items-center pl-5 mt-6 gap-2`}>
        <SvgXml xml={IconProviderRecentOrders} />
        <Text style={tw`font-medium text-base text-black`}>Recent orders</Text>
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

export default ProviderHome;
