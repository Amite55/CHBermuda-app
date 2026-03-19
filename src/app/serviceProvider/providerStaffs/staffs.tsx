import { IconPlus, IconRightTopConnerArrow } from "@/assets/icons";
import { ImgEmployees } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import { usePagination } from "@/src/hooks/usePagination";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyGetMyStaffsQuery } from "@/src/redux/Api/providers/accounts/staffs";
import StaffsSkeleton from "@/src/Skeletion/StaffsSkeleton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Staffs = () => {
  const [activeStatus, setActiveStatus] = React.useState("all");

  // ============= api end point =================
  const [getMyStaffs, { isLoading: isStaffsLoading }] =
    useLazyGetMyStaffsQuery();

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

  console.log(response?.data?.data?.total, "this is staff;;;;;;;;;");

  // ─── Header (everything above the list) ───────────────────────────────────
  const ListHeader = useCallback(
    () => (
      <View>
        {/* Top bar */}
        <View style={tw`relative`}>
          <BackTitleButton title="Staffs pro" onPress={() => router.back()} />
          <TouchableOpacity
            onPress={() =>
              router.push("/serviceProvider/providerStaffs/addNewStaffs")
            }
            activeOpacity={0.7}
            style={tw`absolute top-2 right-0 bg-primaryBtn flex-row items-center justify-center gap-1 rounded-lg py-2 px-3`}
          >
            <Text style={tw`font-LufgaMedium text-base text-white`}>Add</Text>
            <SvgXml xml={IconPlus} />
          </TouchableOpacity>
        </View>

        {/* Total employees card */}
        <View
          style={tw`justify-center items-center gap-2 bg-white p-5 rounded-2xl mt-3`}
        >
          <Image
            style={tw`w-16 h-14`}
            source={ImgEmployees}
            contentFit="contain"
          />
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            Total employees
          </Text>
          <Text style={tw`font-LufgaSemiBold text-lg text-black`}>
            {response?.data?.data?.total}
          </Text>
        </View>

        {/* Section title */}
        <Text
          style={tw`font-LufgaSemiBold text-xl text-center text-black mt-4 mb-3`}
        >
          All Staffs
        </Text>
      </View>
    ),
    [activeStatus],
  );

  // ─── Footer loader ─────────────────────────────────────────────────────────
  const ListFooter = useCallback(
    () =>
      isFetchingMore ? (
        <ActivityIndicator size="small" color="#000" style={tw`py-4`} />
      ) : null,
    [isFetchingMore],
  );

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

  // ─── First page skeleton / loader ─────────────────────────────────────────
  if (isLoading || isStaffsLoading) {
    return <StaffsSkeleton />;
  }

  return (
    <FlatList
      data={staffsData}
      keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-5 px-5`}
      // ─── header ───────────────────────────────────────────────────────
      ListHeaderComponent={ListHeader}
      // ─── each staff row ───────────────────────────────────────────────
      renderItem={({ item }) => (
        <View style={tw`mb-4`}>
          <MenuCard
            onPress={() =>
              router.push({
                pathname: "/serviceProvider/providerStaffs/editStaffProfile",
                params: { id: item?.id },
              })
            }
            titleText={item?.name}
            subTitleText={item?.email}
            image={item?.image}
            imageStyle={tw`w-16 h-16 rounded-full`}
            endIcon={IconRightTopConnerArrow}
            containerStyle={tw`py-2`}
          />
        </View>
      )}
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

export default Staffs;
