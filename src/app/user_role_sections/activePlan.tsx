import { ImgCategoryNurse, ImgService } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ActivePlan = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={[tw`px-5 `]}
    >
      <BackTitleButton title="Notifications" onPress={() => router.back()} />
      <Text style={tw`font-LufgaSemiBold text-xl text-black mt-4 mb-2`}>
        Single Plan
      </Text>
      {/* ================== single plan start hare ================== */}
      <View>
        {[1, 2].map((item) => {
          return (
            <View key={item}>
              <Image
                style={tw`w-full h-40 rounded-3xl mt-2`}
                source={ImgService}
              />
              <View style={tw`flex-row justify-between items-center mt-2`}>
                <Text style={tw`font-LufgaMedium text-black text-base `}>
                  Crystal Comfort Plan
                </Text>
                <Text
                  style={tw`border border-green-600 rounded-md font-LufgaMedium text-green-600 text-sm px-2 py-1 bg-green-100`}
                >
                  Active
                </Text>
              </View>
              <Text style={tw`font-LufgaRegular text-sm text-subText pt-2`}>
                Ideal for independent seniors who value peace of mind and a
                gentle helping hand...
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
            </View>
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
            <View key={item} style={tw``}>
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
            </View>
          );
        })}
      </View>
      {/* ==================== adom/multiple plan end here =================== */}
    </ScrollView>
  );
};

export default ActivePlan;
