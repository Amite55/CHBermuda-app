import { ImgPlaceholderService } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetActivePlansQuery } from "@/src/redux/Api/userRole/accountSlices";
import { updateBooking } from "@/src/redux/appStore/bookingSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { useDispatch } from "react-redux";

const ActivePlan = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  // ================== api end point ================
  const {
    data: activePlans,
    isLoading: isActivePlansLoading,
    refetch,
  } = useGetActivePlansQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // ================== filter active admin plan ================
  const findActiveAdminPlanArray = activePlans?.data?.filter(
    (item: any) => item?.subscription_type === "admin_package",
  );
  // ==================== filtered by bundle plans ====================
  const findActiveBundlePlanArray = activePlans?.data?.filter(
    (item: any) => item?.subscription_type === "bundle",
  );

  // ============== bundle plan and addons plan service =================
  const handleBundlePlanButton = (serviceItem: any) => {
    try {
      dispatch(
        updateBooking({
          subscriptionId: serviceItem?.subscription_id,
        }),
      );
      if (serviceItem?.package?.service?.type === "admin_service") {
        router.push({
          pathname: "/user_role_sections/categoryPlaning/adminServiceDetails",
          params: {
            id: serviceItem?.package_id,
            title: serviceItem?.service?.name || "Service Details",
            // category: item?.subscription_items?.[0]?.package?.service?.type,
            category: serviceItem?.package?.service?.type,
          },
        });
      } else if (serviceItem?.package?.service?.type === "thirdparty_service") {
        dispatch(
          updateBooking({
            booking_type: "thirdparty_service",
          }),
        );
        router?.push({
          pathname: "/user_role_sections/providers/thirdPartyProviders",
          params: {
            id: serviceItem?.service?.id,
          },
        });
      }
    } catch (error: any) {
      console.log(error, "Your bundle button don't toggle----");
    }
  };

  // ==================== refreshing ==============
  const onRefreshHandler = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } catch (error: any) {
      console.log(error, "Active plan refreshing not working ============>");
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  // =-================ loading state -----------------
  if (isActivePlansLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={1} />;
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={[tw`px-5 `]}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefreshHandler}
        />
      }
    >
      <BackTitleButton title="Active plans" onPress={() => router.back()} />
      <Text style={tw`font-LufgaSemiBold text-xl text-black mt-4 mb-2`}>
        Admin Plan
      </Text>
      {/* ================== single plan start hare ================== */}
      <View>
        {findActiveAdminPlanArray?.length > 0 ? (
          findActiveAdminPlanArray.map((item: any, index: number) => {
            const totalDays = item?.subscription_duration.split(" ")[0];
            const totalRemainingDays =
              Number(item?.subscription_days_remaining) / Number(totalDays);
            // =============== weekly plan progress =============
            const weeklyProgress =
              Number(item?.subscription_items?.[0]?.weekly_visits) /
              Number(item?.subscription_items?.[0]?.package?.weekly_visits);
            // =============== monthly plan progress =============
            const monthlyProgress =
              Number(item?.subscription_items?.[0]?.monthly_visits) /
              Number(item?.subscription_items?.[0]?.package?.monthly_visits);

            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  dispatch(
                    updateBooking({
                      subscriptionId:
                        item?.subscription_items?.[0]?.subscription_id,
                    }),
                  );
                  router.push({
                    pathname:
                      "/user_role_sections/categoryPlaning/adminServiceDetails",
                    params: {
                      id: item?.subscription_items?.[0]?.package?.id,
                      title:
                        item?.subscription_items?.[0]?.package?.service?.name ||
                        "Service Details",
                      // category: item?.subscription_items?.[0]?.package?.service?.type,
                      category: item?.subscription_type || "admin_service",
                    },
                  });
                }}
                key={item?.id}
              >
                <Image
                  style={tw`w-full h-36 rounded-3xl mt-2`}
                  source={item?.subscription_items?.[0]?.package?.service?.icon}
                  contentFit="contain"
                />
                <View
                  style={tw`flex-1 flex-row justify-between items-center gap-1 mt-2`}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={tw`flex-1 font-LufgaMedium text-black text-base `}
                  >
                    {item?.subscription_items?.[0]?.package?.title}
                  </Text>
                  <Text
                    style={[
                      tw`border  rounded-md font-LufgaMedium text-sm px-2 py-1 `,
                      item?.status === "active"
                        ? tw`border-green-600 text-green-600 bg-green-100`
                        : tw`border-red-600 text-red-600 bg-red-100`,
                    ]}
                  >
                    {item?.status === "active" ? "Active" : "Inactive"}
                  </Text>
                </View>
                <Text style={tw`font-LufgaRegular text-sm text-subText pt-1`}>
                  {item?.subscription_items?.[0]?.package?.description}
                </Text>
                <View
                  style={tw`flex-row justify-center gap-3 pb-5 items-center mt-1`}
                >
                  {/* ---------------------- plan progress bar start hare  ---------------------- */}
                  <View
                    style={tw`bg-white rounded-3xl w-[46%]  items-center gap-1 py-2`}
                  >
                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      Days remaining
                    </Text>
                    <Text style={tw`font-LufgaMedium text-sm text-black`}>
                      {item?.subscription_days_remaining} {"/"}{" "}
                      {item?.subscription_duration}
                    </Text>
                    <Progress.Circle
                      progress={totalRemainingDays}
                      size={85}
                      thickness={10}
                      color="#183E9F"
                      unfilledColor="#D9D9D9"
                      borderWidth={0}
                      animated={true}
                      showsText={false}
                    />
                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      End date:
                    </Text>
                    <Text style={tw`font-LufgaMedium text-sm text-black`}>
                      {item?.end_date}
                    </Text>
                  </View>

                  {/* ---------------------- plan limitation  ---------------------- */}
                  <View style={tw`rounded-2xl w-[46%] gap-3`}>
                    <View
                      style={tw`bg-white rounded-2xl items-center gap-3 px-2 py-3`}
                    >
                      <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                        Weekly visit
                      </Text>
                      <Text style={tw`font-LufgaMedium text-sm text-black`}>
                        Used:{" "}
                        {item?.subscription_items?.[0]?.weekly_visits || 0} of{" "}
                        {item?.subscription_items?.[0]?.package
                          ?.weekly_visits || 0}
                      </Text>
                      {/* ============= weekly plan progress ============= */}
                      <Progress.Bar
                        width={100}
                        progress={weeklyProgress}
                        color="#183E9F"
                        unfilledColor="#D9D9D9"
                        borderWidth={0}
                        animated={true}
                      />
                    </View>
                    <View
                      style={tw`bg-white rounded-2xl items-center gap-3 px-4 py-3`}
                    >
                      <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                        Weekly visit
                      </Text>
                      <Text style={tw`font-LufgaMedium text-sm text-black`}>
                        Used:{" "}
                        {item?.subscription_items?.[0]?.monthly_visits || 0} of{" "}
                        {item?.subscription_items?.[0]?.package
                          ?.monthly_visits || 0}
                      </Text>
                      {/* ============= monthly plan progress ============= */}
                      <Progress.Bar
                        width={100}
                        progress={monthlyProgress}
                        color="#183E9F"
                        unfilledColor="#D9D9D9"
                        borderWidth={0}
                        animated={true}
                      />
                    </View>
                  </View>
                </View>
                {/* ---------------------- plan progress bar end hare  ---------------------- */}
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={tw`font-LufgaMedium text-center text-base text-subText`}>
            You Have No Active Plan
          </Text>
        )}
      </View>
      {/* ================== single plan end hare ================== */}

      {/* ==================== adom/multiple plan start here =================== */}
      <Text style={tw`font-LufgaSemiBold text-xl text-black mt-5 mb-2`}>
        Bundle Plan
      </Text>
      <View>
        {findActiveBundlePlanArray?.length > 0 ? (
          findActiveBundlePlanArray.map((item: any) => {
            // ============= calculate progress =============
            const totalDays = item?.subscription_duration.split(" ")[0];
            const totalRemainingDays =
              Number(item?.subscription_days_remaining) / Number(totalDays);
            return (
              <View key={item} style={tw``}>
                <View style={tw`w-full bg-white py-4 rounded-2xl`}>
                  <FlatList
                    data={item?.subscription_items}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(i) => i?.id?.toString()}
                    contentContainerStyle={[
                      tw`px-4 items-center`,
                      { flexGrow: 1, justifyContent: "center" },
                    ]}
                    renderItem={({ item: i }) => (
                      <View
                        key={i?.id}
                        style={tw`bg-slate-100 h-14 w-14 rounded-full items-center justify-center mx-1.5`}
                      >
                        <Image
                          contentFit="contain"
                          style={tw`w-8 h-8`}
                          source={i?.service?.icon}
                          placeholder={ImgPlaceholderService}
                        />
                      </View>
                    )}
                  />
                </View>
                {/* =============== bundle plan name =============== */}
                <View
                  style={tw`flex-1 flex-row justify-between items-center gap-1 mt-4`}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={tw`flex-1 font-LufgaMedium text-black text-base `}
                  >
                    {item?.addon?.title}
                  </Text>
                  <Text
                    style={[
                      tw`border  rounded-md font-LufgaMedium text-sm px-2 py-1 `,
                      item?.status === "active"
                        ? tw`border-green-600 text-green-600 bg-green-100`
                        : tw`border-red-600 text-red-600 bg-red-100`,
                    ]}
                  >
                    {item?.status === "active" ? "Active" : "Inactive"}
                  </Text>
                </View>
                <Text style={tw`font-LufgaRegular text-sm text-subText pt-1`}>
                  {item?.addon?.description}
                </Text>

                {/* ---------------------- plan progress bar start hare  ---------------------- */}
                <View style={tw` gap-3 pb-4 items-center mt-4`}>
                  <View
                    style={tw`bg-white rounded-3xl w-full  items-center gap-1 py-2`}
                  >
                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      Days remaining
                    </Text>
                    <Text style={tw`font-LufgaMedium text-sm text-black`}>
                      {item?.subscription_days_remaining} {"/"}{" "}
                      {item?.subscription_duration}
                    </Text>
                    <Progress.Circle
                      progress={totalRemainingDays}
                      size={100}
                      thickness={10}
                      color="#183E9F"
                      unfilledColor="#D9D9D9"
                      borderWidth={0}
                      animated={true}
                      showsText={false}
                    />
                    <View style={tw`flex-row justify-center gap-1`}>
                      <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                        End date:
                      </Text>
                      <Text style={tw`font-LufgaMedium text-sm text-black`}>
                        {item?.end_date}
                      </Text>
                    </View>
                  </View>
                  {/* ====================== addons service item progress bar ================== */}
                  <View style={tw`flex-row flex-grow justify-between gap-2`}>
                    {item?.subscription_items?.length > 0 &&
                      item?.subscription_items?.map((serviceItem: any) => {
                        const progressCalculation =
                          Number(serviceItem?.monthly_visits) /
                          Number(serviceItem?.package?.monthly_visits);
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              handleBundlePlanButton(serviceItem);
                            }}
                            activeOpacity={0.5}
                            key={serviceItem?.id}
                            style={tw`rounded-2xl flex-1 gap-3`}
                          >
                            <View
                              style={tw`bg-white rounded-2xl items-center gap-2 px-2 py-3`}
                            >
                              <Text
                                style={tw`font-LufgaRegular text-sm text-subText`}
                              >
                                {serviceItem?.service?.name}
                              </Text>
                              <Text
                                style={tw`font-LufgaMedium text-sm text-black`}
                              >
                                Used: {serviceItem?.monthly_visits} of{" "}
                                {serviceItem?.package?.monthly_visits}
                              </Text>
                              <Progress.Bar
                                width={120}
                                progress={progressCalculation}
                                color="#183E9F"
                                unfilledColor="#D9D9D9"
                                borderWidth={0}
                                animated={true}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
                {/* ---------------------- plan progress bar end hare  ---------------------- */}
              </View>
            );
          })
        ) : (
          <Text style={tw`font-LufgaMedium text-center text-base text-subText`}>
            You Have No Bundle Plan
          </Text>
        )}
      </View>
      {/* ==================== adom/multiple plan end here =================== */}
    </ScrollView>
  );
};

export default ActivePlan;
