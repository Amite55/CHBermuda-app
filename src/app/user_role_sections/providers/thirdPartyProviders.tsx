import ProviderInfoCard from "@/src/components/ProviderInfoCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useLazyGetThirdPartyProviderByServiceIdQuery } from "@/src/redux/Api/userRole/orderSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, View } from "react-native";

const ThirdPartyProviders = () => {
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [servicePackageData, setServicePackageData] = React.useState([]);
  const { id } = useLocalSearchParams();
  console.log(servicePackageData, "this is package id 0--------..");

  //   ================== api end point   ==================
  const [
    getThirdPartyProviderByServiceId,
    {
      isLoading: isThirdPartyProviderServiceLoading,
      isFetching: isThirdPartyProviderServiceFetching,
    },
  ] = useLazyGetThirdPartyProviderByServiceIdQuery();

  // ============== get Data from api ==============
  const getData = useCallback(
    async (page = 1, isRefresh = false) => {
      try {
        const response = await getThirdPartyProviderByServiceId({
          page: page,
          per_page: 10,
          id: id,
          _timestamp: Date.now(),
        }).unwrap();
        const newData = response?.data?.data || [];
        const lastPage = response?.data?.last_page || 1;
        if (isRefresh) {
          setServicePackageData(newData);
        } else if (page === 1) {
          setServicePackageData(newData);
        } else {
          setServicePackageData((prevData) => [...prevData, ...newData]);
        }
        setHasMore(page < lastPage);
      } catch (error: any) {
        console.log(
          error,
          "Admin Service provider data not exit ____________>",
        );
      }
    },
    [id, getThirdPartyProviderByServiceId],
  );

  // ============== initial render ===============
  useEffect(() => {
    getData(1);
  }, [getData, id]);

  // Handle pull to refresh
  // =============== onRefresh ==================
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([isThirdPartyProviderServiceFetching]);
    } finally {
      setRefreshing(false);
    }
  };
  // ============= handle load more data to pagination ============
  const handleLoadMore = useCallback(async () => {
    if (!isThirdPartyProviderServiceFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
      await getData(page + 1);
    }
  }, [hasMore, isThirdPartyProviderServiceFetching, page, hasMore]);

  // ================ loading state     ===========
  if (isThirdPartyProviderServiceLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={4} />;
  }

  return (
    <View style={tw`flex-1 bg-bgBaseColor px-5 `}>
      <BackTitleButton title="Providers " onPress={() => router.back()} />

      {/* ====================== if plan is purchased ====================== */}

      <FlatList
        data={servicePackageData}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-4 pb-2 mt-3`}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleLoadMore}
        renderItem={({ item }: any) => {
          return (
            <ProviderInfoCard
              key={item?.id}
              //   onPress={}
              providerAvgRating={item?.ratings_avg_rating}
              providerImg={item?.avatar}
              providerJoinedDate={helpers.formatTime(item?.created_at)}
              providerName={item?.name}
              providerPackageCount={item?.service_provided}
              //   providerReviewCount={}
              //   providerServiceCount={}
            />
          );
        }}
      />
    </View>
  );
};

export default ThirdPartyProviders;
