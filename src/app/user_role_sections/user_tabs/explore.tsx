import { ImgG } from "@/assets/image";
import CategoryItems from "@/src/components/CategoryItems";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import tw from "@/src/lib/tailwind";
import {
  useGetAllCategoryQuery,
  useLazyGetAddonBundlesQuery,
} from "@/src/redux/Api/userHomeSlices";
import UserHomeSkeleton from "@/src/Skeletion/UserHomeSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

const Explore = () => {
  const [addonsData, setAddonsData] = React.useState<any>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  // ============ hooks ==================
  const { profileData, isProfileLoading, profileRefetch, isProfileFetching } =
    useProfile();

  // ================= api end point ==================
  const {
    data: allCategory,
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
  } = useGetAllCategoryQuery({});
  const [addonBundles, { isLoading: isAddonBundlesLoading, isFetching }] =
    useLazyGetAddonBundlesQuery({});

  const getAddonBundles = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const response = await addonBundles({
          page: pageNum,
          per_page: 10,
          _timestamp: Date.now(),
        }).unwrap();

        const newData = response?.data?.data || [];
        const lastPage = response?.data?.last_page || 1;
        if (isRefresh) {
          setAddonsData(newData);
        } else if (pageNum === 1) {
          setAddonsData(newData);
        } else {
          setAddonsData((prevData) => [...prevData, ...newData]);
        }
        setHasMore(pageNum < lastPage);
        // =============== update page number ===============
        if (pageNum < lastPage) {
          setPage(pageNum + 1);
        }
      } catch (error: any) {
        console.log(error, "Addons data not get ");
      }
    },
    [addonBundles],
  );

  useEffect(() => {
    getAddonBundles(1);
  }, [addonBundles]);

  // ================= HEADER ==================
  const RenderHeader = () => {
    return (
      <View>
        <ImageBackground style={[tw`w-full h-36`]} source={ImgG}>
          <UserInfoHeader
            containerStyle={tw`px-5`}
            userName={profileData?.data?.name}
            userImage={profileData?.data?.avatar}
            cartOnPress={() => router.push("/user_role_sections/cart")}
            notificationOnPress={() =>
              router.push("/user_role_sections/notificationsUser/notifications")
            }
            profileOnPress={() =>
              router.push("/user_role_sections/user_tabs/user_profile")
            }
          />
          <Text
            style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
          >
            Explore
          </Text>
        </ImageBackground>

        {/* ===== ALL CATEGORY (moved to header) ===== */}
        <View style={tw`py-6 bg-bgBaseColor`}>
          <FlatList
            data={allCategory?.data}
            numColumns={3}
            keyExtractor={(items) => items.id.toString()}
            columnWrapperStyle={tw`justify-between mb-6 px-5`}
            scrollEnabled={false}
            renderItem={(items) => <CategoryItems items={items} />}
          />
        </View>

        {/* ===== Section Title ===== */}
        <Text
          style={tw`font-LufgaMedium text-xl text-center text-regularText pt-2`}
        >
          Personalized Add-On Bundles
        </Text>
      </View>
    );
  };

  // ================= RENDER EACH ADD-ON (pagination ready) ==================
  const renderAddonItem = ({ item }: any) => {
    return (
      <View style={tw`items-center gap-4 py-4`}>
        <View style={tw`bg-white w-[95%] rounded-3xl p-4`}>
          <View style={tw`flex-grow justify-between`}>
            {/* Header */}
            <View>
              <View style={tw`flex-row justify-between items-center`}>
                {/* ============ ADD-ON ICONS   =============== */}
                <View style={tw`flex-row items-center `}>
                  {item?.addon_services?.length > 0 &&
                    item?.addon_services?.map((img, index) => (
                      <View
                        style={[
                          tw`bg-slate-100 rounded-full p-1 items-center`,
                          {
                            marginLeft: index === 0 ? 0 : -20,
                            zIndex: 50 - index,
                          },
                        ]}
                        key={img?.id}
                      >
                        <Image
                          style={[
                            tw`border border-white items-center justify-center rounded-full w-10 h-10`,
                          ]}
                          source={img?.service?.icon}
                          contentFit="contain"
                        />
                      </View>
                    ))}
                </View>

                <View style={tw`flex-row items-center`}>
                  <Text style={tw`font-LufgaMedium text-lg text-black`}>
                    ${item?.price}
                  </Text>
                  <Text style={tw`font-LufgaMedium text-base text-subText`}>
                    /month
                  </Text>
                </View>
              </View>

              {/* title */}
              <Text
                numberOfLines={2}
                style={tw`font-LufgaMedium text-base text-black py-4`}
              >
                {item?.title}
              </Text>

              {/* Description */}
              <Text
                numberOfLines={2}
                style={tw`font-LufgaMedium text-xs text-subText mb-3`}
              >
                {item?.description}
              </Text>

              {/* Included */}
              <Text style={tw`font-LufgaRegular text-base text-regularText`}>
                Included
              </Text>
              <View style={tw`gap-2 mb-4`}>
                {item?.included_services?.length > 0 ? (
                  item?.included_services?.map(
                    (line: string, index: number) => (
                      <View
                        key={index}
                        style={tw`flex-row items-center gap-2 mt-2`}
                      >
                        <View style={tw`w-2 h-2 rounded-full bg-black`} />
                        <Text
                          numberOfLines={2}
                          style={tw`font-LufgaRegular text-sm text-black flex-1`}
                        >
                          {line}
                        </Text>
                      </View>
                    ),
                  )
                ) : (
                  <Text
                    style={tw`text-center justify-center text-subText text-xl `}
                  >
                    No included services
                  </Text>
                )}
              </View>
            </View>

            {/* Button */}
            <PrimaryButton
              onPress={() => router.push("/user_role_sections/cart")}
              buttonTextStyle={tw`text-lg font-LufgaMedium`}
              buttonContainerStyle={tw`mt-4 h-10`}
              buttonText="Subscribe Now"
            />
          </View>
        </View>
      </View>
    );
  };

  // ================= REFRESH FUNCTION ==================
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([isCategoryFetching, isFetching, profileRefetch()]);
    } catch (error: any) {
      console.log(error, "this is wrong refresh ------------");
    } finally {
      setRefreshing(false);
    }
  }, []);

  // ========= loading state ==================
  if (isCategoryLoading || isAddonBundlesLoading || isProfileLoading) {
    return <UserHomeSkeleton />;
  }

  // ================= MAIN RETURN ==================
  return (
    <FlatList
      data={addonsData}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderAddonItem}
      ListHeaderComponent={RenderHeader}
      contentContainerStyle={tw`pb-16 bg-bgBaseColor`}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
};

export default Explore;
