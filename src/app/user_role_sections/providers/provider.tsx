import {
  IconInterGative,
  IconRatingStar,
  IconRightCornerArrowWhite,
} from "@/assets/icons";
import { ImgBennerImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useLazyGetAdminProviderByPackageIdQuery } from "@/src/redux/Api/userRole/orderSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Provider = () => {
  const { id } = useLocalSearchParams();
  const [isPlanPurchased, setIsPlanPurchased] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [servicePackageData, setServicePackageData] = React.useState([]);

  // ===================== api end point ====================
  const [
    adminServiceProvider,
    {
      isLoading: isAdminServiceProviderLoading,
      isFetching: isAdminServiceProviderFetching,
    },
  ] = useLazyGetAdminProviderByPackageIdQuery();

  // ============== get Data from api ==============
  const getData = useCallback(
    async (page = 1, isRefresh = false) => {
      try {
        const response = await adminServiceProvider({
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
    [id, adminServiceProvider],
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
      await Promise.all([isAdminServiceProviderFetching]);
    } finally {
      setRefreshing(false);
    }
  };
  // ============= handle load more data to pagination ============
  const handleLoadMore = useCallback(async () => {
    if (!isAdminServiceProviderFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
      await getData(page + 1);
    }
  }, [hasMore, isAdminServiceProviderFetching, page, hasMore]);

  // ================ loading state     ===========
  if (isAdminServiceProviderLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={4} />;
  }

  return (
    <View style={tw`flex-1 bg-bgBaseColor px-5 `}>
      <BackTitleButton title="Providers" onPress={() => router.back()} />

      {/* ====================== if plan is not purchased ====================== */}
      {!isPlanPurchased && (
        <View
          style={tw`flex-row justify-center items-center gap-2 border p-2 rounded-lg border-red-700 bg-red-100 mt-8`}
        >
          <SvgXml xml={IconInterGative} />
          <Text style={tw`font-LufgaRegular text-base text-red-700`}>
            Purchase plan for book providers
          </Text>
        </View>
      )}

      {/* ====================== if plan is purchased ====================== */}
      {isPlanPurchased && (
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
          renderItem={({ item }) => {
            return (
              <View style={tw`bg-white rounded-2xl p-4`}>
                {/* ------------------ provider info ---------------- */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled
                  style={tw`flex-row items-center py-2 gap-4`}
                >
                  <View style={tw`relative`}>
                    <Image
                      style={tw`w-12 h-12 rounded-full`}
                      source={ImgBennerImage}
                      contentFit="contain"
                    />
                    <View
                      style={tw`absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full`}
                    />
                  </View>
                  <View>
                    <Text
                      style={tw`font-LufgaMedium text-base text-regularText`}
                    >
                      {item?.provider?.name}
                    </Text>

                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      Joined {helpers.formatDate(item?.provider?.created_at)}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={tw`gap-1 my-2`}>
                  <View style={tw`flex-row items-center gap-1`}>
                    <SvgXml xml={IconRatingStar} />
                    <Text
                      style={tw`font-LufgaRegular text-sm text-regularText`}
                    >
                      {item?.provider?.avg_rating || 0}
                    </Text>
                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      ({item?.provider?.ratings_count || 0} reviews)
                    </Text>
                  </View>
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    {item?.provider?.service_provided} orders completed
                  </Text>
                </View>

                <PrimaryButton
                  buttonText="See details"
                  buttonTextStyle={tw`font-LufgaRegular text-base`}
                  buttonContainerStyle={tw` h-10  `}
                  rightIcon={IconRightCornerArrowWhite}
                  onPress={() => {
                    router.push({
                      pathname:
                        "/user_role_sections/providers/providerDetailsInfoAdmin",
                      params: { id: item?.provider?.id },
                    });
                  }}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Provider;
