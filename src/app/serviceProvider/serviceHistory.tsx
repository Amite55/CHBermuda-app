import { usePagination } from "@/src/hooks/usePagination";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useLazyGetOrderProvidedQuery } from "@/src/redux/Api/providers/accounts/balancAndOrder";
import ServiceHistorySkeleton from "@/src/Skeletion/ServiceHistorySkeleton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ServiceHistory = () => {
  // ==================== api end ====================
  const [getProvidedOrder, { isLoading: isOrderProvidedLoading }] =
    useLazyGetOrderProvidedQuery();

  // ================= FETCH FUNCTION HOOKS=================
  const {
    data: orderProvidedData,
    isLoading,
    isFetchingMore,
    refreshing,
    fetchData,
    loadMore,
    refresh,
    response,
  } = usePagination(getProvidedOrder);

  //  ============ call pagination function ===========
  useEffect(() => {
    fetchData(1, true);
  }, []);

  // ─── Empty state ───────────────────────────────────────────────────────────
  const ListEmpty = useCallback(
    () =>
      !isLoading ? (
        <View style={tw`items-center py-10`}>
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            No staffs found
          </Text>
        </View>
      ) : null,
    [isLoading],
  );

  // ─── Footer loader ─────────────────────────────────────────────────────────
  const ListFooter = useCallback(
    () =>
      isFetchingMore ? (
        <ActivityIndicator size="small" color="#000" style={tw`py-4`} />
      ) : null,
    [isFetchingMore],
  );

  const onRefreshHandler = useCallback(() => {
    refresh();
  }, [fetchData]);

  // =============== loading state ====================
  if (isOrderProvidedLoading) {
    return <ServiceHistorySkeleton />;
  }

  return (
    <FlatList
      data={orderProvidedData}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw` bg-bgBaseColor px-5 gap-3 pb-3  `}
      style={tw` flex-1 bg-bgBaseColor`}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title="Service History"
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={({ item }) => {
        const status = item?.status;
        return (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname:
                  "/serviceProvider/notificationProvider/providerOrderDetails",
                params: { status: item?.status, booking_id: item.id },
              })
            }
            activeOpacity={0.7}
            style={[
              tw`flex-row items-center gap-4 px-3 py-4 bg-white  rounded-xl`,
            ]}
          >
            <Image
              style={tw`w-16 h-16 rounded-full`}
              source={item?.package?.icon}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                {item?.package?.title}
              </Text>
              <View>
                <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                  {item?.user?.name}
                </Text>
                <View style={tw` flex-row justify-between items-center`}>
                  <Text style={tw` text-sm text-regularText`}>
                    {helpers.formatDateTime(item?.created_at)}
                  </Text>

                  <Text
                    style={[
                      tw`font-LufgaRegular capitalize text-sm text-white bg-primaryBtn px-2 py-1 rounded-full`,
                      status === "pending"
                        ? tw`bg-orange-600`
                        : status === "completed"
                          ? tw`bg-primaryBtn`
                          : status === "new"
                            ? tw`bg-green-800`
                            : tw`bg-red-600`,
                    ]}
                  >
                    {status}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      // ─── pagination ───────────────────────────────────────────────────
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      // ─── pull to refresh ──────────────────────────────────────────────
      // refreshing={refreshing}
      // onRefresh={onRefreshHandler}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />
      }
      // ─── footer / empty ───────────────────────────────────────────────
      ListFooterComponent={
        isFetchingMore ? <ActivityIndicator size="small" /> : ListFooter
      }
      ListEmptyComponent={ListEmpty}
    />
  );
};

export default ServiceHistory;
