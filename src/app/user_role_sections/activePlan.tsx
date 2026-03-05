import { ImgCategoryNurse } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetActivePlansQuery } from "@/src/redux/Api/userRole/accountSlices";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

const ActivePlan = () => {
  // ================== api end point ================
  const { data: activePlans, isLoading: isActivePlansLoading } =
    useGetActivePlansQuery({});

  const findActiveAdminPlanArray = activePlans?.data?.filter(
    (item: any) => item?.subscription_type === "admin_package",
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
        Single Plan
      </Text>
      {/* ================== single plan start hare ================== */}
      <View>
        {findActiveAdminPlanArray.map((item: any, index: number) => {
          const totalDays = item?.subscription_duration.split(" ")[0];
          const totalRemainingDays =
            Number(item?.subscription_days_remaining) / Number(totalDays);

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() => {
              //   router.push({
              //     pathname:
              //       "/user_role_sections/categoryPlaning/adminServiceDetails",
              //     params: {
              //       // category: category ? category.toString() : "Services",
              //       category: "Services Details",
              //     },
              //   });
              // }}
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
              {/* ---------------------- plan progress bar start hare  ---------------------- */}
              <View
                style={tw`flex-row justify-center gap-3 pb-5 items-center mt-1`}
              >
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

                <View style={tw`rounded-2xl w-[46%] gap-3`}>
                  <View
                    style={tw`bg-white rounded-2xl items-center gap-3 px-2 py-3`}
                  >
                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      Weekly visit
                    </Text>
                    <Text style={tw`font-LufgaMedium text-sm text-black`}>
                      Used: 1 of 2
                    </Text>
                    <Progress.Bar
                      width={100}
                      progress={0.6}
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
                      Used: 1 of 2
                    </Text>
                    <Progress.Bar
                      width={100}
                      progress={0.4}
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
      <Text style={tw`font-LufgaSemiBold text-xl text-black mt-4 mb-2`}>
        Bundle Plan
      </Text>
      <View>
        {[1, 2].map((item) => {
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
              <View
                style={tw`flex-row items-center justify-center bg-white py-4 rounded-2xl gap-2`}
              >
                {[1, 2].map((i) => {
                  return (
                    <View
                      key={i}
                      style={tw`bg-slate-100 h-14 w-14 rounded-full items-center justify-center`}
                    >
                      <Image
                        contentFit="contain"
                        style={tw`w-8 h-8`}
                        source={ImgCategoryNurse}
                      />
                    </View>
                  );
                })}
              </View>
              <View style={tw`flex-row justify-between items-center mt-2`}>
                <Text style={tw`font-LufgaMedium text-black text-base `}>
                  Essential Comfort Bundle
                </Text>
                <Text
                  style={tw`border border-green-600 rounded-md font-LufgaMedium text-green-600 text-sm px-2 py-1 bg-green-100`}
                >
                  Active
                </Text>
              </View>
              <Text style={tw`font-LufgaRegular text-sm text-subText pt-2`}>
                Enjoy reliable support with services designed to ease your daily
                routine.
              </Text>

              {/* ---------------------- plan progress bar start hare  ---------------------- */}
              <View
                style={tw`flex-row justify-center gap-3 pb-4 items-center mt-4`}
              >
                <View
                  style={tw`bg-white rounded-3xl w-[47%]  items-center gap-1 py-2`}
                >
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    Days remaining
                  </Text>
                  <Text style={tw`font-LufgaMedium text-sm text-black`}>
                    25 days
                  </Text>
                  <Progress.Circle
                    progress={0.6}
                    size={90}
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
                    02-10-2025
                  </Text>
                </View>

                <View style={tw`rounded-2xl w-[47%] gap-3`}>
                  <View
                    style={tw`bg-white rounded-2xl items-center gap-3 px-2 py-3`}
                  >
                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      Weekly visit
                    </Text>
                    <Text style={tw`font-LufgaMedium text-sm text-black`}>
                      Used: 1 of 2
                    </Text>
                    <Progress.Bar
                      width={100}
                      progress={0.6}
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
                      Used: 1 of 2
                    </Text>
                    <Progress.Bar
                      width={100}
                      progress={0.4}
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
