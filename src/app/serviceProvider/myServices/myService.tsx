import { IconDeleteRed, IconEditPenGreen, IconPlus } from "@/assets/icons";
import { ImgPlaceholderService } from "@/assets/image";
import LogoutModal from "@/src/context/LogoutModal";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import { usePagination } from "@/src/hooks/usePagination";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import {
  useDeletePackageMutation,
  useLazyGetMyPackageQuery,
} from "@/src/redux/Api/providers/accounts/myServices";
import MyServiceSkeleton from "@/src/Skeletion/MyServiceSkeleton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SvgXml } from "react-native-svg";

const MyService = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // ============ hooks  ===========
  const { profileData, isProfileLoading, profileRefetch } = useProfile();

  // ========== api end point ===========
  const [getMyPackageQuery, { isLoading: isGetMyPackageLoading }] =
    useLazyGetMyPackageQuery();
  const [deletePackage, { isLoading: isDeletePackageLoading }] =
    useDeletePackageMutation();

  // =========== delete package function ================
  const handleDeleteConfirm = async () => {
    try {
      const res = await deletePackage(selectedId).unwrap();
      if (res) {
        setIsModalVisible(false);
        refresh();
      }
    } catch (error: any) {
      console.log(error, "Your package not deleted ");
    }
  };

  // ================= FETCH FUNCTION HOOKS=================
  const {
    data: myServicesData,
    isLoading,
    isFetchingMore,
    refreshing,
    fetchData,
    loadMore,
    refresh,
    response,
  } = usePagination(getMyPackageQuery);

  //  ============ call pagination function ===========
  useEffect(() => {
    fetchData(1, true);
  }, []);

  // ==================== refreshing ==============
  const onRefreshHandler = useCallback(async () => {
    try {
      await profileRefetch();
      fetchData(1, true);
    } catch (error: any) {
      console.log(error, "Active plan refreshing not working ============>");
    }
  }, [profileRefetch]);

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

  // ================ render header items ===============
  const renderHeaderItem = ({ item }: any) => {
    return (
      <View>
        <BackTitleButton title="My services " onPress={() => router.back()} />
        <View style={tw`flex-row   self-end mt-3`}>
          {profileData?.data?.stripe_account_id === null ? (
            <TouchableOpacity
              onPress={() => {
                router.push("/serviceProvider/myServices/createAccountWebview");
              }}
              activeOpacity={0.7}
              style={tw` bg-primaryBtn  items-center justify-center rounded-lg py-1.5 px-3`}
            >
              <Text style={tw`font-LufgaMedium text-base text-white`}>
                Create Account
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                router.push("/serviceProvider/myServices/addNewService");
              }}
              activeOpacity={0.7}
              style={tw` bg-primaryBtn flex-row items-center justify-center gap-1 rounded-lg py-1.5 px-3`}
            >
              <Text style={tw`font-LufgaMedium text-base text-white`}>Add</Text>
              <SvgXml xml={IconPlus} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ================== render item ================
  const renderItem = ({ item }: any) => {
    return (
      <View style={tw`bg-white rounded-3xl p-4`}>
        {/* --------------- service image  --------------- */}
        <View style={tw`relative`}>
          <Image
            style={tw`w-full h-40 rounded-3xl mt-2`}
            contentFit="cover"
            source={item?.icon}
            placeholder={ImgPlaceholderService}
          />

          <View style={tw`absolute top-3 right-2 flex-row items-center gap-2`}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/serviceProvider/myServices/editMyService",
                  params: { id: item?.id },
                })
              }
              activeOpacity={0.6}
              style={tw`w-10 h-10 rounded-lg bg-white justify-center items-center shadow`}
            >
              <SvgXml xml={IconEditPenGreen} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(true);
                setSelectedId(item?.id);
              }}
              activeOpacity={0.6}
              style={tw`w-10 h-10 rounded-lg bg-white justify-center items-center shadow`}
            >
              <SvgXml xml={IconDeleteRed} />
            </TouchableOpacity>
          </View>
        </View>

        {/* --------------- service details  --------------- */}
        <View
          style={tw`flex-1 flex-row items-center justify-between gap-2 py-3`}
        >
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={tw`flex-1 flex-shrink font-LufgaMedium gap-1 text-regularText text-base`}
          >
            {item?.title}
          </Text>
          <Text style={tw`font-LufgaMedium text-regularText text-sm`}>
            ${item?.price}
          </Text>
        </View>

        <View style={tw`gap-1`}>
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`w-1 h-1 bg-black rounded-full`} />
            <Text
              numberOfLines={2}
              style={tw`font-LufgaRegular text-base text-subText`}
            >
              Duration: {item?.duration} hour
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              {item?.description}
            </Text>
          </View>
        </View>

        <Text style={tw`font-LufgaMedium text-regularText text-xl py-2`}>
          Included Services:
        </Text>
        <View style={tw`gap-1`}>
          {item?.included_services?.map((item: any, index: number) => (
            <View key={index} style={tw`flex-row items-center gap-2`}>
              <View style={tw`w-1 h-1 bg-black rounded-full`} />
              <Text
                numberOfLines={2}
                style={tw`flex-1 flex-shrink font-LufgaRegular text-base text-subText`}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // -=============== here is loading state ===============-
  if (isProfileLoading || isGetMyPackageLoading) {
    return <MyServiceSkeleton />;
  }

  return (
    <>
      <FlatList
        data={myServicesData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 `}
        style={tw`flex-1 bg-bgBaseColor`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeaderItem}
        renderItem={renderItem}
        // ─── pagination ───────────────────────────────────────────────────
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        // ─── pull to refresh ──────────────────────────────────────────────
        refreshing={refreshing}
        onRefresh={() => {
          onRefreshHandler();
        }}
        // ─── footer / empty ───────────────────────────────────────────────
        ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="small" /> : ListFooter
        }
        ListEmptyComponent={ListEmpty}
      />

      {/* ============================ delete modal =========================== */}
      <LogoutModal
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        buttonTitle="Yes, Delete"
        subTitle="After deleting, users won’t be able to find your service."
        logoutIcon={IconDeleteRed}
        modalTitle="Are you sure to delete this package ?"
        onPress={handleDeleteConfirm}
        loading={isDeletePackageLoading}
        disabled={isDeletePackageLoading}
      />
    </>
  );
};

export default MyService;
