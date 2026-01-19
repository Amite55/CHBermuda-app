import ServicePlanCard from "@/src/components/ServicePlanCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyGetServiceWisePackageQuery } from "@/src/redux/Api/userHomeSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const AdminProviderService = () => {
  const { id, title, category } = useLocalSearchParams();
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
  return (
    <FlatList
      data={servicePackageData}
      keyExtractor={(item, index) => item?.id?.toString()}
      contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor gap-5`}
      style={tw`flex-1 bg-bgBaseColor`}
      ListEmptyComponent={renderEmptyComponent}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title={title ? title.toString() : "Services"}
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={({ item }: any) => {
        return (
          <ServicePlanCard
            image={item?.icon}
            planName={item?.title}
            price={item?.price}
            providers={item?.providers_count}
            description={item?.description}
            plan={item?.type}
            onPress={() => {
              router.push({
                pathname:
                  "/user_role_sections/categoryPlaning/adminServiceDetails",
                params: {
                  category: category ? category.toString() : "Services",
                },
              });
            }}
          />
        );
      }}
    />
  );
};

export default AdminProviderService;
