import {
  IconNotificationWhite,
  IconProviderNewOrder,
  IconProviderPendingOrder,
  IconProviderRecentOrders,
  IconProviderStaffs,
} from "@/assets/icons";
import {
  ImgPlaceholderProfile,
  ImgProviderBG,
  ImgServiceImage,
} from "@/assets/image";
import OrderCard from "@/src/components/OrderCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import { usePagination } from "@/src/hooks/usePagination";
import tw from "@/src/lib/tailwind";
import { useLazyGetMyStaffsQuery } from "@/src/redux/Api/providers/accounts/staffs";
import { useGetHomePageQuery } from "@/src/redux/Api/providers/home";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const ProviderHome = () => {
  // ============= hooks ==================
  const { profileData, isProfileLoading, profileRefetch, isProfileFetching } =
    useProfile();
  // ============== api end point ================
  const { data: providerHomeData, isLoading: isProviderHomeLoading } =
    useGetHomePageQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const [getMyStaffs] = useLazyGetMyStaffsQuery();
  // ================= FETCH FUNCTION =================
  const {
    data: staffsData,
    isLoading,
    isFetchingMore,
    refreshing,
    fetchData,
    loadMore,
    refresh,
  } = usePagination(getMyStaffs);
  //  ============ call pagination function ===========
  useEffect(() => {
    fetchData(1, true);
  }, []);
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
              <Text style={tw`font-LufgaMedium text-black text-xl`}>
                {providerHomeData?.data?.new_order || 0}{" "}
              </Text>
            </View>
            <View style={tw`w-0.5 h-14 bg-slate-300`} />
            <View style={tw`justify-center items-center gap-2`}>
              <SvgXml xml={IconProviderPendingOrder} />
              <Text style={tw`font-LufgaRegular text-base text-subText `}>
                Pending Order
              </Text>
              <Text style={tw`font-LufgaMedium text-black text-xl`}>
                {providerHomeData?.data?.pending_order || 0}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row items-center gap-1 justify-center pt-3`}>
            <Text className="font-LufgaRegular text-base text-subText">
              Todays total order:
            </Text>
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              {providerHomeData?.data?.todays_total_order || 0}
            </Text>
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
          onPress={() => {
            router.push("/serviceProvider/providerStaffs/staffs");
          }}
          style={tw`border border-subText px-2 py-1 rounded-lg`}
        >
          <Text style={tw`font-LufgaRegular text-sm text-black`}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={staffsData}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={tw`px-5 gap-4 mt-4`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/serviceProvider/providerStaffs/editStaffProfile",
                  params: { id: item?.id },
                })
              }
              activeOpacity={0.6}
              style={tw`justify-center items-center`}
            >
              <View style={tw``}>
                <Image
                  source={item?.image}
                  style={tw`w-16 h-16 rounded-full `}
                  contentFit="cover"
                  placeholder={ImgPlaceholderProfile}
                />
              </View>
              <Text style={tw`font-LufgaMedium text-sm text-black pt-2`}>
                {item?.name?.length > 10
                  ? item?.name?.slice(0, 10) + "..."
                  : item?.name}
              </Text>
            </TouchableOpacity>
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
              onPress={() => {
                router.push({
                  pathname:
                    "/serviceProvider/notificationProvider/providerOrderDetails",
                  params: { status: "new_order" },
                });
              }}
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
