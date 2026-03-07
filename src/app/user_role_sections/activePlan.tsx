import { ImgPlaceholderService } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetActivePlansQuery } from "@/src/redux/Api/userRole/accountSlices";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";

const ActivePlan = () => {
  // ================== api end point ================
  const { data: activePlans, isLoading: isActivePlansLoading } =
    useGetActivePlansQuery({});
  // ================== filter active admin plan ================
  const findActiveAdminPlanArray = activePlans?.data?.filter(
    (item: any) => item?.subscription_type === "admin_package",
  );
  // ==================== filtered by bundle plans ====================
  const findActiveBundlePlanArray = activePlans?.data?.filter(
    (item: any) => item?.subscription_type === "bundle",
  );

  console.log(
    findActiveBundlePlanArray,
    "there is active bundle _________________>",
  );

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={[tw`px-5 `]}
    >
      <BackTitleButton title="Active plans" onPress={() => router.back()} />
      <Text style={tw`font-LufgaSemiBold text-xl text-black mt-4 mb-2`}>
        Admin Plan
      </Text>
      {/* ================== single plan start hare ================== */}
      <View>
        {findActiveAdminPlanArray.map((item: any, index: number) => {
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
              activeOpacity={0.9}
              onPress={() => {
                router.push({
                  pathname:
                    "/user_role_sections/categoryPlaning/adminServiceDetails",
                  params: {
                    id: item?.subscription_items?.[0]?.package?.id,
                    title:
                      item?.subscription_items?.[0]?.package?.service?.name ||
                      "Service Details",
                    // category: item?.subscription_items?.[0]?.package?.service?.type,
                    category: "admin_service",
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
                      Used: {item?.subscription_items?.[0]?.weekly_visits || 0}{" "}
                      of{" "}
                      {item?.subscription_items?.[0]?.package?.weekly_visits ||
                        0}
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
                      Used: {item?.subscription_items?.[0]?.monthly_visits || 0}{" "}
                      of{" "}
                      {item?.subscription_items?.[0]?.package?.monthly_visits ||
                        0}
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
        })}
      </View>
      {/* ================== single plan end hare ================== */}

      {/* ==================== adom/multiple plan start here =================== */}
      <Text style={tw`font-LufgaSemiBold text-xl text-black mt-5 mb-2`}>
        Bundle Plan
      </Text>
      <View>
        {findActiveBundlePlanArray.map((item: any) => {
          // ============= calculate progress =============
          const totalDays = item?.subscription_duration.split(" ")[0];
          const totalRemainingDays =
            Number(item?.subscription_days_remaining) / Number(totalDays);
          return (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname:
                    "/user_role_sections/categoryPlaning/adminServiceDetails",
                  params: {
                    category: "Services Details",
                  },
                });
              }}
              activeOpacity={0.9}
              key={item}
              style={tw``}
            >
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

                <View style={tw`rounded-2xl w-full gap-3`}>
                  <View
                    style={tw`bg-white rounded-2xl items-center gap-2 px-2 py-3`}
                  >
                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      Meal delivery
                    </Text>
                    <Text style={tw`font-LufgaMedium text-sm text-black`}>
                      Used: 1 of 2
                    </Text>
                    <Progress.Bar
                      width={300}
                      progress={0.6}
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
        })}
      </View>
      {/* ==================== adom/multiple plan end here =================== */}
    </ScrollView>
  );
};

export default ActivePlan;
