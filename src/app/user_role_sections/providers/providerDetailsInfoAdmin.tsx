import { IconLocation, IconRatingStar } from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useGetAdminProviderDetailsQuery } from "@/src/redux/Api/userRole/orderSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { SvgXml } from "react-native-svg";

const ProviderDetailsInfoAdmin = () => {
  const { id } = useLocalSearchParams();

  // ================= api end point =================
  const {
    data: adminProviderDetails,
    isLoading: isAdminProviderDetailsLoading,
  } = useGetAdminProviderDetailsQuery(id);

  // ======================== max rating count array =======================
  const ratingCounts = [
    adminProviderDetails?.data?.rating?.total_five_stars || 0,
    adminProviderDetails?.data?.rating?.total_four_stars || 0,
    adminProviderDetails?.data?.rating?.total_three_stars || 0,
    adminProviderDetails?.data?.rating?.total_two_stars || 0,
    adminProviderDetails?.data?.rating?.total_one_stars || 0,
  ];
  const maxRatingCount = Math.max(...ratingCounts, 1);
  const fiveStarProgress =
    (adminProviderDetails?.data?.rating?.total_five_stars || 0) /
    maxRatingCount;
  const fourStarProgress =
    (adminProviderDetails?.data?.rating?.total_four_stars || 0) /
    maxRatingCount;
  const threeStarProgress =
    (adminProviderDetails?.data?.rating?.total_three_stars || 0) /
    maxRatingCount;
  const twoStarProgress =
    (adminProviderDetails?.data?.rating?.total_two_stars || 0) / maxRatingCount;
  const oneStarProgress =
    (adminProviderDetails?.data?.rating?.total_one_stars || 0) / maxRatingCount;

  return (
    <ScrollView
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`flex-grow justify-between pb-4 px-5 bg-bgBaseColor  `}
    >
      <View>
        <BackTitleButton
          title="Provider details"
          onPress={() => router.back()}
        />
        {/* =--------------------------- provider info --------------------------- */}
        <TouchableOpacity
          activeOpacity={0.7}
          disabled
          style={tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl mt-2`}
        >
          <Image
            style={tw`w-16 h-16 rounded-full`}
            source={adminProviderDetails?.data?.provider?.avatar}
            contentFit="contain"
            placeholder={ImgPlaceholderProfile}
          />
          <View>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                {adminProviderDetails?.data?.provider?.name}
              </Text>
              <Text
                style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
              >
                {adminProviderDetails?.data?.provider?.completed_orders || 0}{" "}
                order
              </Text>
            </View>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              Joined{" "}
              {helpers.formatDate(
                adminProviderDetails?.data?.provider?.created_at,
              )}
            </Text>
          </View>
        </TouchableOpacity>
        {/* --------------------------- provider location --------------------------- */}
        <View style={tw`flex-row items-center gap-4  my-3`}>
          <SvgXml xml={IconLocation} />
          <View style={tw`gap-1`}>
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              Location
            </Text>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              {adminProviderDetails?.data?.provider?.address}
            </Text>
          </View>
        </View>

        {/* ------------------- provider rating and review ------------------ */}

        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconRatingStar} />
          <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
            {adminProviderDetails?.data?.rating?.avg_rating || 0}
          </Text>
          <Text style={tw`font-LufgaRegular text-sm text-black`}>
            ({adminProviderDetails?.data?.rating?.total_reviews || 0} reviews)
          </Text>
        </View>

        <View style={tw`my-6 bg-white rounded-2xl p-4 gap-2`}>
          {/* --------------------- rating excellent --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                5.0
              </Text>
              <Progress.Bar
                progress={fiveStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Excellent
            </Text>
          </View>
          {/* --------------------- rating Best --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                4.0
              </Text>
              <Progress.Bar
                progress={fourStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Best
            </Text>
          </View>
          {/* --------------------- rating Better --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                3.0
              </Text>
              <Progress.Bar
                progress={threeStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Better
            </Text>
          </View>
          {/* --------------------- rating Good --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                2.0
              </Text>
              <Progress.Bar
                progress={twoStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Good
            </Text>
          </View>
          {/* --------------------- rating Poor --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                1.0
              </Text>
              <Progress.Bar
                progress={oneStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Poor
            </Text>
          </View>
        </View>

        {/* ========================== Reviews section ========================== */}
        <Text style={tw`font-LufgaMedium text-base text-regularText mb-2`}>
          Reviews
        </Text>
        <FlatList
          data={adminProviderDetails?.data?.reviews}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={tw`gap-4 pb-2 `}
          renderItem={({ item }) => {
            return (
              <View style={tw`bg-white rounded-2xl gap-4 w-80`}>
                <Text style={tw`font-LufgaRegular text-sm text-black p-4 `}>
                  {item?.review}
                </Text>
                <View
                  style={tw`flex-row items-center justify-between bg-slate-200 py-1.5 px-3 rounded-xl`}
                >
                  <View>
                    <Text style={tw`font-LufgaMedium text-base text-black`}>
                      {item?.user?.name}
                    </Text>
                  </View>
                  <Image
                    source={item?.user?.avatar}
                    style={tw`w-12 h-12 rounded-full `}
                    placeholder={ImgPlaceholderProfile}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      {/* ------------------------ booking button ---------------- */}
      <PrimaryButton
        buttonText="Book now"
        buttonTextStyle={tw`font-LufgaMedium text-base`}
        buttonContainerStyle={tw`mt-4 h-12 `}
        onPress={() => {
          router.push(
            "/user_role_sections/placingAdminOrderService/adminPlacingOrder",
          );
        }}
      />
    </ScrollView>
  );
};

export default ProviderDetailsInfoAdmin;
