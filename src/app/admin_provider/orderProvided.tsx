import { usePagination } from "@/src/hooks/usePagination";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyGetOrderProvidedQuery } from "@/src/redux/Api/providers/accounts/balancAndOrder";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const OrderProvided = () => {
  // ================ api endpoint =================
  const [orderProvided, { isLoading: isOrderProvidedLoading }] =
    useLazyGetOrderProvidedQuery();

  const {
    data: orderProvidedData,
    isLoading,
    isFetchingMore,
    refreshing,
    fetchData,
    loadMore,
    refresh,
  } = usePagination(orderProvided);

  useEffect(() => {
    fetchData(1, true);
  }, []);
  // ─── Header ───────────────────────────────────────────────────────────────
  const ListHeader = useCallback(
    () => (
      <View style={tw`gap-4`}>
        <BackTitleButton title="My Wallet" onPress={() => router.back()} />
      </View>
    ),
    [],
  );

  //   =-========= render item ==========
  const OrderProvidedItems = ({ item }: any) => {
    return <Text>ami tmi ser</Text>;
  };

  // ─── Empty ────────────────────────────────────────────────────────────────
  const ListEmpty = useCallback(
    () =>
      !isLoading ? (
        <View style={tw`items-center py-10`}>
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            No order provided
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#1D4ED8" style={tw`py-10`} />
      ),
    [isLoading],
  );

  // ─── Footer ───────────────────────────────────────────────────────────────
  const ListFooter = useCallback(
    () =>
      isFetchingMore ? (
        <ActivityIndicator size="small" color="#000" style={tw`py-4`} />
      ) : null,
    [isFetchingMore],
  );

  // ─── Refresh ──────────────────────────────────────────────────────────────
  const onRefreshHandler = useCallback(() => {
    fetchData(1, true);
  }, [fetchData]);

  //   ============= loading =================
  if (isOrderProvidedLoading) {
    return <ServicePackageListSkeleton />;
  }

  return (
    <FlatList
      data={orderProvidedData}
      keyExtractor={(item) => String(item.id.tolocaleString())}
      contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-6`}
      style={tw`flex-1 bg-bgBaseColor`}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeader}
      renderItem={OrderProvidedItems}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefreshHandler}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={ListEmpty}
    />
  );
};

export default OrderProvided;
