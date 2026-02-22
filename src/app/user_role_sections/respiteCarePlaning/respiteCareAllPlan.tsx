import { IconDuration, IconRightCornerArrowWhite } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyGetServiceWisePackageQuery } from "@/src/redux/Api/userHomeSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SvgXml } from "react-native-svg";

const RespiteCareAllPlan = () => {
  const { title, category, id } = useLocalSearchParams();
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [servicePackageData, setServicePackageData] = React.useState([]);

  // ===================== api end point =====================
  const [
    serviceWisePackages,
    { isLoading: isPackageLoading, isFetching: isPackageFetching },
  ] = useLazyGetServiceWisePackageQuery();

  // ========================= get data with paginate ========================
  const loadData = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const response = await serviceWisePackages({
          page: pageNum,
          per_page: 10,
          service_id: id,
          _timestamp: Date.now(),
        }).unwrap();
        const newData = response?.data?.data || [];
        const lastPage = response?.data?.last_page || 1;
        if (isRefresh) {
          setServicePackageData(newData);
        } else if (pageNum === 1) {
          setServicePackageData(newData);
        } else {
          setServicePackageData((prevData) => [...prevData, ...newData]);
        }
        setHasMore(pageNum < lastPage);
        // =============== update page number ===============
        if (pageNum < lastPage) {
          setPage(pageNum + 1);
        }
      } catch (error: any) {
        console.log(error, "not get package data ------------>");
      }
    },
    [serviceWisePackages, id],
  );

  // Render empty component
  const renderEmptyComponent = useCallback(
    () => (
      <View style={tw`py-8 items-center`}>
        {isPackageLoading ? (
          <ActivityIndicator color="#000" size="small" />
        ) : (
          <Text style={tw`text-subText font-LufgaRegular text-base`}>
            No tasks available
          </Text>
        )}
      </View>
    ),
    [isPackageLoading],
  );

  // ========= initial render =========
  useEffect(() => {
    loadData(1);
  }, [serviceWisePackages]);

  // ============= load more =================
  const handleLoadMore = useCallback(async () => {
    if (isPackageFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await loadData(nextPage);
    }
  }, [loadData, isPackageFetching, hasMore, page]);

  if (isPackageLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={3} />;
  }

  const RenderItem = ({ item }: any) => {
    return (
      <View style={tw`py-3`}>
        <Image
          contentFit="cover"
          style={tw`w-full h-40 rounded-3xl`}
          source={item?.image}
        />
        <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
          {item?.title}
        </Text>

        <View style={tw`flex-row justify-between items-center `}>
          <View style={tw`flex-row items-center gap-1 `}>
            <SvgXml xml={IconDuration} />
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              Duration: {item?.duration} hours
            </Text>
          </View>
          <Text style={tw`font-LufgaMedium text-xl text-black`}>
            ${item?.price}
            <Text style={tw`font-LufgaRegular text-sm text-gray-500`}>
              / {item?.type}
            </Text>
          </Text>
        </View>
        {/* ------------------ plan description ---------------- */}
        <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
          {item?.description}
        </Text>
        <PrimaryButton
          buttonText="See details"
          buttonTextStyle={tw`font-LufgaMedium text-base`}
          rightIcon={IconRightCornerArrowWhite}
          buttonContainerStyle={tw`mt-2 h-10 `}
          onPress={() =>
            router.push(
              item?.type === "custom"
                ? {
                    pathname:
                      "/user_role_sections/respiteCarePlaning/customRespiteCare",
                    params: { respiteId: item?.id },
                  }
                : {
                    pathname:
                      "/user_role_sections/respiteCarePlaning/respiteCarePlaningDetails",
                    params: { respiteId: item?.id },
                  },
            )
          }
        />
      </View>
    );
  };

  // ===================== const header content ======================
  const RenderHeaderItems = () => {
    return (
      <BackTitleButton
        title={title ? title.toString() : "Services"}
        onPress={() => router.back()}
      />
    );
  };

  return (
    <FlatList
      data={servicePackageData}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor gap-5`}
      style={tw`flex-1 bg-bgBaseColor`}
      ListHeaderComponent={RenderHeaderItems}
      ListEmptyComponent={renderEmptyComponent}
      renderItem={({ item }) => {
        return <RenderItem item={item} />;
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
    />
  );
};

export default RespiteCareAllPlan;
