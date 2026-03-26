import { ImgG, ImgNoOrder } from "@/assets/image";
import OrderCard from "@/src/components/OrderCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useLazyGetUserOrderQuery } from "@/src/redux/Api/userRole/orderSlices";
import { LIMIT } from "@/src/utils/PaginationLimit";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type OrderStatus = "new" | "pending" | "completed";

const Order = () => {
  const [orderStatus, setOrderStatus] = React.useState<OrderStatus>("new");
  const [orders, setOrders] = React.useState<any[]>([]);
  const [isFirstPageLoading, setIsFirstPageLoading] = React.useState(false);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const isFetchingRef = useRef(false);
  const orderStatusRef = useRef<OrderStatus>("new");

  const { profileData } = useProfile();
  // hooks and api end points --------------------------
  const [getUserOrder] = useLazyGetUserOrderQuery();

  // ─────────────────────────────────────────────────────────────────────────
  const fetchOrders = useCallback(
    async (targetPage: number, reset = false) => {
      if (isFetchingRef.current) return;
      if (!hasMoreRef.current && !reset) return;
      isFetchingRef.current = true;
      if (reset) {
        setIsFirstPageLoading(true);
      } else {
        setIsFetchingMore(true);
      }
      try {
        const result = await getUserOrder({
          status: orderStatusRef.current,
          page: Number(targetPage),
          per_page: LIMIT,
        }).unwrap();

        const newItems: any[] = result?.data?.data ?? [];
        const more =
          result?.data?.next_page_url !== null &&
          result?.data?.next_page_url !== undefined;

        // ref update
        pageRef.current = targetPage;
        hasMoreRef.current = more;

        setOrders((prev) => (reset ? newItems : [...prev, ...newItems]));
      } catch (error) {
        console.error("fetchOrders error:", error);
      } finally {
        isFetchingRef.current = false;
        setIsFirstPageLoading(false);
        setIsFetchingMore(false);
      }
    },
    [getUserOrder],
  );

  // ====== when you change tab status to reset data ===========
  useEffect(() => {
    orderStatusRef.current = orderStatus;
    pageRef.current = 1;
    hasMoreRef.current = true;
    isFetchingRef.current = false;
    setOrders([]);
    fetchOrders(1, true);
  }, [orderStatus]);

  // ─── Scroll handler ───────────────────────────────────────────────────────
  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

      const isNearBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 150;

      // ref update
      if (isNearBottom && hasMoreRef.current && !isFetchingRef.current) {
        fetchOrders(pageRef.current + 1);
      }
    },
    [fetchOrders],
  );
  const isEmpty = !isFirstPageLoading && orders.length === 0;

  // ============= on refresh control ===========
  const onRefresh = () => {
    try {
      setRefreshing(true);
      Promise.all([fetchOrders(1, true)]);
    } catch (error: any) {
      console.log(error, "this is wrong refresh ------------>");
    } finally {
      setRefreshing(false);
    }
  };
  // =============== change status and type =-===============
  const STATUS_MAP: Record<string, string> = {
    new: "new_booking",
    pending: "booking_approved",
    completed: "completed",
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-24`}
      onScroll={handleScroll}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <ImageBackground style={tw`w-full h-36`} source={ImgG}>
        <UserInfoHeader
          containerStyle={tw`px-5`}
          userName={profileData?.data?.name}
          userImage={profileData?.data?.avatar}
          notificationOnPress={() =>
            router.push("/user_role_sections/notificationsUser/notifications")
          }
          profileOnPress={() =>
            router.push("/user_role_sections/user_tabs/user_profile")
          }
        />
        <Text
          style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
        >
          Orders
        </Text>
      </ImageBackground>

      {/* ─── Body ────────────────────────────────────────────────────────── */}
      <View style={tw`px-5`}>
        {/* ── Tab bar ── */}
        <View style={tw`flex-row justify-between items-center gap-1 my-2`}>
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

        {/* ── First-page loader ── */}
        {isFirstPageLoading && (
          <ActivityIndicator
            style={tw`mt-10`}
            size="large"
            color={tw.color("primaryBtn")}
          />
        )}

        {/* ── Empty state ── */}
        {isEmpty && (
          <View style={tw`flex-1 items-center justify-center gap-4 mt-10`}>
            <Image style={tw`w-full h-36`} source={ImgNoOrder} />
            <Text
              style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
            >
              Purchase a plan
            </Text>
            <Text
              style={tw`font-LufgaMedium text-base text-subText text-center`}
            >
              Purchase a subscription and book a service to see them in this
              area.
            </Text>
          </View>
        )}

        {/* ── Order list ── */}
        {!isFirstPageLoading && orders.length > 0 && (
          <View style={tw`mt-4 gap-4`}>
            {orders.map((item, index) => {
              const status = STATUS_MAP[item?.status] ?? item?.status;
              return (
                <OrderCard
                  key={`${item?.id ?? index}`}
                  onPress={() => {
                    router.push({
                      pathname:
                        "/user_role_sections/notificationsUser/orderDetailsStatus",
                      params: { status: status, id: item?.id },
                    });
                  }}
                  image={item?.package?.icon}
                  title={item?.package?.title}
                  subTitle={item?.provider?.name ?? "No Assign Provider"}
                  dateAndTime={helpers.formatDate(item?.created_at)}
                />
              );
            })}

            {/* ── Pagination loader ── */}
            {isFetchingMore && (
              <ActivityIndicator
                style={tw`py-4`}
                size="small"
                color={"#0290CF"}
              />
            )}

            {/* ── End-of-list ── */}
            {!hasMoreRef.current && !isFetchingMore && (
              <Text
                style={tw`font-LufgaMedium text-sm text-subText text-center py-4`}
              >
                No more orders
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Order;
