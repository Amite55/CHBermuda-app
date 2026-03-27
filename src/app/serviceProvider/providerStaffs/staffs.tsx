import {
  IconDeleteWhite,
  IconPlus,
  IconRightTopConnerArrow,
} from "@/assets/icons";
import { ImgEmployees } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import { usePagination } from "@/src/hooks/usePagination";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useDeleteStaffMutation,
  useLazyGetMyStaffsQuery,
} from "@/src/redux/Api/providers/accounts/staffs";
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
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SvgXml } from "react-native-svg";

const Staffs = () => {
  const [activeStatus, setActiveStatus] = React.useState("all");
  const toast = useToastHelpers();

  // ============= api end point =================
  const [getMyStaffs, { isLoading: isStaffsLoading }] =
    useLazyGetMyStaffsQuery();
  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation();

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

  // ================ delete staffs =============
  const handleDeleteStaff = async (id: number) => {
    try {
      const res = await deleteStaff(id).unwrap();
      if (res) {
        toast.success(res?.message || "Staff deleted successfully", 3000);
        refresh();
      }
    } catch (error: any) {
      console.log(error, "Your staff not deleted.");
      toast.showError(error.message || "Your staff not deleted.", 3000);
    }
  };

  // ─── Header (everything above the list) ───────────────────────────────────
  const ListHeader = useCallback(
    () => (
      <View>
        {/* Top bar */}
        <View style={tw`relative`}>
          <BackTitleButton title="Staffs " onPress={() => router.back()} />
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

  const RightAction = ({ onDelete, deleteLoading }: any) => {
    return (
      <TouchableOpacity
        onPress={onDelete}
        disabled={deleteLoading}
        activeOpacity={0.8}
        style={tw`bg-red-500 w-20 justify-center items-center rounded-2xl ml-2 mb-4`}
      >
        {deleteLoading ? (
          <ActivityIndicator size={"small"} color="#fff" />
        ) : (
          <SvgXml xml={IconDeleteWhite} />
        )}
        <Text style={tw`text-white text-xs mt-1`}>Delete</Text>
      </TouchableOpacity>
    );
  };
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
        <Swipeable
          renderRightActions={() =>
            RightAction({
              onDelete: () => {
                handleDeleteStaff(item?.id);
              },
              deleteLoading: isDeleting,
            })
          }
          overshootRight={false}
        >
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
        </Swipeable>
      )}
      // ─── pagination ───────────────────────────────────────────────────
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
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
