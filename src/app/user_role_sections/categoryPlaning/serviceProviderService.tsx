import { IconRatingStar, IconRightCornerArrowWhite } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyGetServiceWisePackageQuery } from "@/src/redux/Api/userHomeSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { PrimaryColor } from "@/src/utils/util";
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
import { SvgXml } from "react-native-svg";

const ServiceProviderService = () => {
  const { title, category, id } = useLocalSearchParams();
  const [page, setPage] = React.useState(1);
  const [hasmore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [servicePackageData, setServicePackageData] = React.useState([]);

  // ================== api end point ==================
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

  // ========= initial render =========
  useEffect(() => {
    loadData();
  }, [serviceWisePackages]);

  // ============= on refresh control ===========
  const onRefresh = () => {
    try {
      setRefreshing(true);
      Promise.all([isPackageFetching]);
    } catch (error: any) {
      console.log(error, "this is wrong refresh ------------>");
    } finally {
      setRefreshing(false);
    }
  };
  // ============= load more =================
  const handleLoadMore = useCallback(async () => {
    if (isPackageFetching && hasmore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await loadData(nextPage);
    }
  }, [loadData, isPackageFetching, hasmore, page]);

  if (isPackageLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={3} />;
  }

  // ==================== render ====================
  const renderItem = ({ item }) => {
    return (
      <View style={tw`border rounded-xl p-2 border-gray-400`}>
        <Image
          source={item?.icon}
          style={tw`w-full h-40 rounded-3xl`}
          contentFit="cover"
        />
        {/* ------------------ plan name and price ---------------- */}
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={tw`font-LufgaMedium text-base text-black flex-shrink pt-2`}
        >
          {item?.title}
        </Text>
        <Text style={tw`font-LufgaMedium text-base text-black self-end`}>
          ${item?.price}{" "}
          <Text style={tw` font-LufgaRegular text-sm text-subText`}>
            /{item?.type}
          </Text>
        </Text>

        {/* ------------------ provider info ---------------- */}
        <TouchableOpacity
          activeOpacity={0.7}
          disabled
          style={tw`flex-row items-center py-2 gap-2`}
        >
          <Image
            style={tw`w-10 h-10 rounded-full`}
            source={item?.provider?.avatar}
            contentFit="contain"
          />
          <View>
            <Text style={tw`font-LufgaMedium text-base text-regularText`}>
              {item?.provider?.name}
            </Text>
            <View style={tw`flex-row items-center gap-1`}>
              <SvgXml xml={IconRatingStar} />
              <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                {item?.provider?.avg_rating}
              </Text>
              <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                ({item?.provider?.total_reviews} reviews)
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* ------------------ plan description ---------------- */}
        <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
          {item?.description}
        </Text>
        <PrimaryButton
          onPress={() => {
            router.push({
              pathname:
                "/user_role_sections/providers/providerDetailsInfoProviders",
              params: { id: item?.provider?.id },
            });
          }}
          buttonText="See details"
          buttonTextStyle={tw`font-LufgaMedium text-base`}
          rightIcon={IconRightCornerArrowWhite}
          buttonContainerStyle={tw`mt-2 h-10 `}
        />
      </View>
    );
  };
  return (
    <FlatList
      data={servicePackageData}
      refreshing={refreshing}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, index) => item?.id?.toString()}
      contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor gap-5`}
      style={tw`flex-1 bg-bgBaseColor`}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title={title ? title.toString() : "Services"}
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={renderItem}
      ListFooterComponent={() => {
        return (
          <View style={tw`flex-1 items-center justify-center`}>
            {hasmore ? (
              <ActivityIndicator size="small" color={PrimaryColor} />
            ) : (
              <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                No more data
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default ServiceProviderService;
