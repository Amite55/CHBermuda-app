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
import ServiceHistorySkeleton from "@/src/Skeletion/ServiceHistorySkeleton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AssingCard = ({ item, booking_id }: any) => {
  const toast = useToastHelpers();

  const [assignStaff, { isLoading: isAssignLoading }] =
    useAssignStaffMutation();
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

  return (
    <View
      style={tw`flex-1 flex-row flex-shrink-0 my-1 items-center justify-between max-h-20 p-3 bg-white rounded-xl`}
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
        disabled={isAssignLoading}
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
};

const ServiceAssign = () => {
  const { booking_id } = useLocalSearchParams();

  // ============= api end point =================
  const [getMyStaffs, { isLoading: isStaffsLoading, isFetching }] =
    useLazyGetMyStaffsQuery();

  // ================ handle assign staff ===============

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

  // console.log(staffsData);

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

  // // =========== loading state  ===============
  if (isStaffsLoading) {
    return <ServiceHistorySkeleton />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => {
        return (
          <View style={tw`bg-bgBaseColor  py-3`}>
            <BackTitleButton
              title="Assign provider"
              onPress={() => router.back()}
            />
          </View>
        );
      }}
      data={staffsData}
      refreshControl={
        <RefreshControl
          style={tw`z-50`}
          refreshing={false}
          onRefresh={() => {
            console.log("Refreshing");
          }}
        />
      }
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item?.id?.toString()}
      contentContainerStyle={tw`pb-6 flex-grow `}
      style={tw` bg-bgBaseColor px-5`}
      renderItem={({ item }) => {
        return <AssingCard item={item} booking_id={booking_id} />;
      }}
      // ─── pagination ───────────────────────────────────────────────────
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      // ─── footer / empty ───────────────────────────────────────────────
      ListFooterComponent={
        isFetchingMore ? <ActivityIndicator size="small" /> : ListFooter
      }
      ListEmptyComponent={ListEmpty}
    />
  );
};

export default ServiceAssign;
