import { ImgPlaceholderProfile } from "@/assets/image";
import { usePagination } from "@/src/hooks/usePagination";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper/helpers";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useAssignStaffMutation,
  useLazyGetMyStaffsQuery,
} from "@/src/redux/Api/providers/accounts/staffs";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ServiceAssign = () => {
  const { booking_id } = useLocalSearchParams();
  const toast = useToastHelpers();

  // ============= api end point =================
  const [getMyStaffs, { isLoading: isStaffsLoading }] =
    useLazyGetMyStaffsQuery();
  const [assignStaff, { isLoading: isAssignLoading }] =
    useAssignStaffMutation();

  // ================ handle assign staff ===============
  const handleAssignStaff = async (staff_id: string) => {
    try {
      const res = await assignStaff({
        booking_id: booking_id,
        staff_id: staff_id,
      }).unwrap();
      console.log(res, "hare is response with staffs");
      toast.success("Your Assign Request send success!", 3000);
      router.replace("/serviceProvider/serviceProviderTabs/providerOrder");
    } catch (error: any) {
      console.log(error, "Your Assign Request Not success!");
      toast.showError(
        error.message || "Your Assign Request Not success!",
        3000,
      );
    }
  };

  // ================= FETCH FUNCTION =================
  const {
    data: staffsData,
    isLoading,
    isFetchingMore,
    refreshing,
    fetchData,
    loadMore,
    refresh,
    response,
  } = usePagination(getMyStaffs);

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

  return (
    <FlatList
      data={staffsData}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 flex-grow `}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title="Assign provider"
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={({ item }) => {
        return (
          <View
            style={tw`flex-1 flex-row items-center justify-between max-h-20 p-3 bg-white rounded-xl`}
          >
            <View style={tw`flex-row items-center gap-3`}>
              <Image
                style={tw`w-12 h-12 rounded-full`}
                source={item?.image}
                contentFit="cover"
                placeholder={ImgPlaceholderProfile}
              />
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={tw`flex-1 font-LufgaMedium text-base text-black`}
                >
                  {item?.name}
                </Text>
                <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                  {helpers.timeDataAgo(item?.created_at)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`p-1.5 border border-subText rounded-xl`}
              activeOpacity={0.7}
              onPress={() => {
                handleAssignStaff(item?.id);
              }}
            >
              {isAssignLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={tw`font-LufgaMedium text-primaryBtn text-sm `}>
                  Assign
                </Text>
              )}
            </TouchableOpacity>
          </View>
        );
      }}
      // ─── pagination ───────────────────────────────────────────────────
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      // ─── pull to refresh ──────────────────────────────────────────────
      refreshing={refreshing}
      onRefresh={refresh}
      // ─── footer / empty ───────────────────────────────────────────────
      ListFooterComponent={
        isFetchingMore ? <ActivityIndicator size="small" /> : ListFooter
      }
      ListEmptyComponent={ListEmpty}
    />
  );
};

export default ServiceAssign;
