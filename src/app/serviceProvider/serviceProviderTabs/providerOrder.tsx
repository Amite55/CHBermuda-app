import { IconNotificationWhite } from "@/assets/icons";
import { ImgNoOrder, ImgProviderBG } from "@/assets/image";
import OrderCard from "@/src/components/OrderCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import tw from "@/src/lib/tailwind";
import { useLazyGetProviderOrdersQuery } from "@/src/redux/Api/providers/orders";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type OrderStatus = "new" | "pending" | "completed";

const ProviderOrder = () => {
  const [orderData, setOrderData] = useState<any[]>([]);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("new");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // hooks and api end points --------------------------
  const { profileData } = useProfile();
  const [getProviderOrders, { isFetching }] = useLazyGetProviderOrdersQuery();

  // ================= FETCH FUNCTION =================
  const fetchOrders = useCallback(
    async (pageNum: number, isRefresh = false) => {
      try {
        const response = await getProviderOrders({
          page: pageNum,
          per_page: 10,
          status: orderStatus,
        }).unwrap();

        const newItems = response?.data?.data || [];
        const lastPage = response?.data?.last_page || 1;

        if (isRefresh) {
          setOrderData(newItems);
        } else {
          setOrderData((prev) => [...prev, ...newItems]);
        }

        setHasMore(pageNum < lastPage);
      } catch (error) {
        console.error("Order fetch error:", error);
      }
    },
    [getProviderOrders, orderStatus],
  );

  // Initial fetch or status change
  useEffect(() => {
    setPage(1);
    fetchOrders(1, true);
  }, [orderStatus]);

  // Handle Refresh
  const onRefresh = () => {
    setPage(1);
    fetchOrders(1, true);
  };

  // Handle Pagination (Load More)
  const loadMore = () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOrders(nextPage);
    }
  };

  // Header Component
  const renderHeader = () => (
    <View>
      <ImageBackground style={tw`w-full h-24`} source={ImgProviderBG}>
        <UserInfoHeader
          containerStyle={tw`px-5 items-center`}
          notificationContentStyle={tw`bg-[#FFFFFF33] `}
          userName={profileData?.data?.name}
          userImage={profileData?.data?.avatar}
          notificationIcon={IconNotificationWhite}
          notificationOnPress={() =>
            router.push("/user_role_sections/notificationsUser/notifications")
          }
          profileOnPress={() => router.push("/auth/editProfile")}
          greetingStyle={tw`text-white`}
          userNameStyle={tw`text-white`}
        />
      </ImageBackground>

      <Text
        style={tw`font-LufgaMedium text-2xl text-center text-regularText pt-5 pb-3`}
      >
        Orders
      </Text>

      {/* Tab bar */}
      <View style={tw`flex-row justify-between items-center gap-1 my-2 px-5`}>
        {(["new", "pending", "completed"] as OrderStatus[]).map((status) => (
          <TouchableOpacity
            key={status}
            activeOpacity={0.8}
            onPress={() => setOrderStatus(status)}
            style={tw.style(
              "flex-1 h-8 rounded-lg justify-center items-center",
              orderStatus === status
                ? "bg-primaryBtn"
                : "border border-primaryBtn bg-white",
            )}
          >
            <Text
              style={tw.style(
                "font-LufgaMedium text-base capitalize",
                orderStatus === status ? "text-white" : "text-primaryBtn",
              )}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Footer Loader
  const renderFooter = () => {
    if (!isFetching) return <View style={tw`h-10`} />;
    return (
      <ActivityIndicator
        size="small"
        color="#yourPrimaryColor"
        style={tw`my-5`}
      />
    );
  };

  // Empty State
  const renderEmpty = () => (
    <View style={tw`flex-1 items-center justify-center gap-4 px-5 mt-20`}>
      <Image style={tw`w-full h-36`} source={ImgNoOrder} />
      <Text style={tw`font-LufgaMedium text-xl text-center text-regularText`}>
        No {orderStatus} orders found
      </Text>
    </View>
  );

  return (
    <FlatList
      data={orderData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View style={tw`px-5 mb-4`}>
            <OrderCard
              onPress={() =>
                router.push({
                  pathname:
                    "/serviceProvider/notificationProvider/providerOrderDetails",
                  params: { status: item?.status, booking_id: item.id },
                })
              }
              image={item.package?.icon}
              title={item.package?.title}
              subTitle={item.user?.name}
              dateAndTime={`${item.schedule_date} | ${item.schedule_time_from}`}
            />
          </View>
        );
      }}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={!isFetching ? renderEmpty : null}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isFetching && page === 1}
          onRefresh={onRefresh}
        />
      }
      contentContainerStyle={tw`pb-10 `}
      style={tw`flex-1 bg-bgBaseColor`}
    />
  );
};

export default ProviderOrder;
