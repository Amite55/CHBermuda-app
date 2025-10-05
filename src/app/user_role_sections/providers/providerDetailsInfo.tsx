import { IconLocation, IconRatingStar } from "@/assets/icons";
import { ImgBennerImage, ImgProfileImg } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
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
import { SvgXml } from "react-native-svg";

const ProviderDetailsInfo = () => {
  return (
    <ScrollView
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor  `}
    >
      <BackTitleButton title="Provider details" onPress={() => router.back()} />
      {/* =--------------------------- provider info --------------------------- */}
      <TouchableOpacity
        activeOpacity={0.7}
        disabled
        style={tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl mt-2`}
      >
        <Image
          style={tw`w-16 h-16 rounded-full`}
          source={ImgBennerImage}
          contentFit="contain"
        />
        <View>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-LufgaMedium text-base text-regularText`}>
              Elizabeth Olson
            </Text>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
            >
              12 order
            </Text>
          </View>

          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            Joined 16th July, 2024
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
          <Text style={tw`font-LufgaRegular text-sm text-black`}>
            Provider location goes here
          </Text>
        </View>
      </View>

      {/* ------------------- provider rating and review ------------------ */}

      <View style={tw`flex-row items-center gap-1`}>
        <SvgXml xml={IconRatingStar} />
        <Text style={tw`font-LufgaRegular text-sm text-regularText`}>4.0</Text>
        <Text style={tw`font-LufgaRegular text-sm text-subText`}>
          (8 reviews)
        </Text>
      </View>

      <View style={tw`my-6 bg-white rounded-2xl p-4 gap-2`}>
        {/* --------------------- rating excellent --------------------- */}
        <View style={tw`gap-2 flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-1 `}>
            <SvgXml xml={IconRatingStar} />
            <Text style={tw`font-LufgaMedium text-base text-regularText pr-2`}>
              5.0
            </Text>
            <Progress.Bar
              progress={1}
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
            <Text style={tw`font-LufgaMedium text-base text-regularText pr-2`}>
              4.0
            </Text>
            <Progress.Bar
              progress={0.8}
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
            <Text style={tw`font-LufgaMedium text-base text-regularText pr-2`}>
              3.0
            </Text>
            <Progress.Bar
              progress={0.6}
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
            <Text style={tw`font-LufgaMedium text-base text-regularText pr-2`}>
              2.0
            </Text>
            <Progress.Bar
              progress={0.4}
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
            <Text style={tw`font-LufgaMedium text-base text-regularText pr-2`}>
              1.0
            </Text>
            <Progress.Bar
              progress={0.1}
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
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={tw`gap-4 pb-2 `}
        renderItem={() => {
          return (
            <View style={tw`bg-white rounded-2xl gap-4 w-80`}>
              <Text style={tw`font-LufgaRegular text-sm text-black p-4 `}>
                I've been consistently impressed with the quality of service
                provided by this website. They have exceeded my expectations and
                delivered exceptional results. Highly recommended!
              </Text>
              <View
                style={tw`flex-row items-center justify-between bg-slate-100 p-2 rounded-xl`}
              >
                <View>
                  <Text style={tw`font-LufgaMedium text-base text-black`}>
                    John D.
                  </Text>
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    Company CEO
                  </Text>
                </View>
                <Image
                  source={ImgProfileImg}
                  style={tw`w-12 h-12 rounded-full `}
                />
              </View>
            </View>
          );
        }}
      />
      {/* ------------------------ booking button ---------------- */}

      <PrimaryButton
        buttonText="Book now"
        buttonTextStyle={tw`font-LufgaMedium text-base`}
        buttonContainerStyle={tw`mt-4 h-12 `}
        onPress={() => {
          router.push(
            "/user_role_sections/placingAdminOrderService/adminPlacingOrder"
          );
        }}
      />
    </ScrollView>
  );
};

export default ProviderDetailsInfo;
