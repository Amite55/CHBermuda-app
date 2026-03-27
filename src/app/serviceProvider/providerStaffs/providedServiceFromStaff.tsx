import { ImgPlaceholderService } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useLazyGetStaffServiceProvidedQuery } from "@/src/redux/Api/providers/accounts/staffs";
import ServiceHistorySkeleton from "@/src/Skeletion/ServiceHistorySkeleton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LIMIT = 10;

const ProvidedServiceFromStaff = () => {
  const [response, setResponse] = useState<any>({});
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const isFetchingRef = useRef(false);
  const { id } = useLocalSearchParams();

  // ============ api end point ===============
  const [providerService, { isLoading: isProviderServiceLoading }] =
    useLazyGetStaffServiceProvidedQuery();

  // ================= FETCH FUNCTION =================
  const fetchData = useCallback(async (page: number, reset = false) => {
    if (isFetchingRef.current) return;
    if (!hasMoreRef.current && !reset) return;
    isFetchingRef.current = true;
    reset ? setIsLoading(true) : setIsFetchingMore(true);
    try {
      const res = await providerService({ page, per_page: LIMIT, id });
      setResponse(res);
      const newData = res?.data?.data ?? [];
      const hasMore = !!res?.data?.data?.next_page_url;
      pageRef.current = page;
      hasMoreRef.current = hasMore;
      setData((prev) => (reset ? newData?.data : [...prev, ...newData?.data]));
    } catch (err) {
      console.log("Pagination error:", err);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
      setIsFetchingMore(false);
      setRefreshing(false);
    }
  }, []);

  //  ============ call pagination function ===========
  useEffect(() => {
    fetchData(1, true);
  }, []);
  const loadMore = () => {
    if (isFetchingRef.current || !hasMoreRef.current) return;
    fetchData(pageRef.current + 1);
  };

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1, true);
  }, []);

  // =============== loading state ====================
  if (isProviderServiceLoading) {
    return <ServiceHistorySkeleton />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3  `}
      style={tw`flex-1 bg-bgBaseColor`}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title="Service provided"
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname:
                  "/serviceProvider/notificationProvider/providerOrderDetails",
                params: { status: item?.status, booking_id: item?.id },
              })
            }
            activeOpacity={0.5}
            style={tw`flex-row items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-100`}
          >
            {/* Avatar */}
            <Image
              source={item?.package?.icon}
              style={tw`w-13 h-13 rounded-full`}
              contentFit="cover"
              placeholder={ImgPlaceholderService}
            />

            {/* Info */}
            <View style={tw`flex-1`}>
              <Text style={tw`text-textColor font-LufgaSemiBold text-sm`}>
                {item?.package?.title}
              </Text>
              <Text style={tw`text-subText font-LufgaRegular text-xs mt-0.5`}>
                {item?.user?.name}
              </Text>
              <Text style={tw`text-subText font-LufgaRegular text-xs mt-0.5`}>
                {helpers.formatDateTime(item?.created_at)}
              </Text>
            </View>

            {/* Rating */}
            {item?.rating && (
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`text-amber-400 text-base`}>★</Text>
                <Text style={tw`text-textColor font-LufgaSemiBold text-base`}>
                  {item?.rating?.rating}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      }}
      // ─── pagination ───────────────────────────────────────────────────
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      // ─── pull to refresh ──────────────────────────────────────────────
      refreshing={refreshing}
      onRefresh={onRefresh}
      // ─── footer / empty ───────────────────────────────────────────────
      ListFooterComponent={
        isFetchingMore ? <ActivityIndicator size="small" /> : ListFooter
      }
      ListEmptyComponent={ListEmpty}
    />
  );
};

export default ProvidedServiceFromStaff;
