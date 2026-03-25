import {
  IconNotificationWhite,
  IconProviderNewOrder,
  IconProviderPendingOrder,
  IconProviderRecentOrders,
} from "@/assets/icons";
import { ImgProviderBG } from "@/assets/image";
import OrderCard from "@/src/components/OrderCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import { useCheckLocation } from "@/src/hooks/useCheckLocation";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useUpdateLatLongMutation } from "@/src/redux/Api/authSlices";
import { useGetHomePageQuery } from "@/src/redux/Api/providers/home";
import UserHomeSkeleton from "@/src/Skeletion/UserHomeSkeleton";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AdminHome = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { location, loading, error, getLocation } = useCheckLocation();

  // ============ hooks ==================
  const { profileData, isProfileLoading, profileRefetch, isProfileFetching } =
    useProfile();

  // ============== api end point ================
  const { data: providerHomeData, isLoading: isProviderHomeLoading } =
    useGetHomePageQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const [updateLatLong, { isLoading: isUpdateLatLongLoading }] =
    useUpdateLatLongMutation();

  // =============== get location ==================
  const handleGetLocation = async () => {
    const loc = await getLocation();
    const data = {
      lat: loc.latitude,
      long: loc.longitude,
    };
    const res = await updateLatLong(data);
    console.log(res, "update lat long");
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([profileRefetch(), isProfileFetching]);
    } catch (error: any) {
      console.log(error, "Your Refresh not success------------>");
    } finally {
      setRefreshing(false);
    }
  }, []);

  // ===================== loading state ===================
  if (isProfileLoading || isProviderHomeLoading) return <UserHomeSkeleton />;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-5 `}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="dark" backgroundColor="#183E9F" />
      <View style={tw`relative`}>
        <ImageBackground style={tw` w-full h-48`} source={ImgProviderBG}>
          {/* ------------------- user header part ---------------- */}
          <UserInfoHeader
            containerStyle={tw`px-5`}
            notificationContentStyle={tw`bg-[#FFFFFF33]`}
            userName={profileData?.data?.name}
            userImage={profileData?.data?.avatar}
            notificationIcon={IconNotificationWhite}
            greetingStyle={tw`text-white `}
            userNameStyle={tw`text-white `}
            notificationOnPress={() => {
              router.push(
                "/admin_provider/adminNotification/notificationsAdmin",
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
                {providerHomeData?.data?.new_order}
              </Text>
            </View>
            <View style={tw`w-0.5 h-14 bg-slate-300`} />
            <View style={tw`justify-center items-center gap-2`}>
              <SvgXml xml={IconProviderPendingOrder} />
              <Text style={tw`font-LufgaRegular text-base text-subText `}>
                Pending Order
              </Text>
              <Text style={tw`font-LufgaMedium text-black text-xl`}>
                {providerHomeData?.data?.pending_order}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row items-center gap-1 justify-center pt-3`}>
            <Text className="font-LufgaRegular text-base text-subText">
              Todays total order:
            </Text>
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              {providerHomeData?.data?.todays_total_order}
            </Text>
          </View>
        </View>
      </View>

      {/* =========================== provider recent order =========================== */}
      <View style={tw`flex-row items-center pl-5 gap-2 mt-32`}>
        <SvgXml xml={IconProviderRecentOrders} />
        <Text style={tw`font-medium text-base text-black`}>Assigned order</Text>
      </View>
      <View style={tw`mt-4 gap-4 px-5`}>
        {providerHomeData?.data?.recent_order?.length > 0 ? (
          providerHomeData?.data?.recent_order.map((item: any) => {
            return (
              <OrderCard
                key={item?.id}
                onPress={() => {
                  router.push({
                    pathname:
                      "/serviceProvider/notificationProvider/providerOrderDetails",
                    params: { status: item?.status, booking_id: item?.id },
                  });
                }}
                image={item?.package?.icon}
                title={item?.package?.title}
                subTitle={item?.user?.name}
                dateAndTime={helpers.timeDataAgo(item?.created_at)}
              />
            );
          })
        ) : (
          <Text
            style={tw`font-LufgaRegular text-base text-center text-subText`}
          >
            No recent order
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default AdminHome;
