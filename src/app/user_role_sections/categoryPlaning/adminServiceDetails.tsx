import { IconCartWhite, IconGetterThen } from "@/assets/icons";
import { ImgProfileImg, ImgServiceImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AdminServiceDetails = () => {
  const { category } = useLocalSearchParams();
  return (
    <ScrollView
      contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor  flex-grow justify-between`}
      style={tw`flex-1 bg-bgBaseColor`}
    >
      <View style={tw`gap-3`}>
        <BackTitleButton
          title={category ? category.toString() : "Services"}
          onPress={() => router.back()}
        />

        <Image
          source={ImgServiceImage}
          style={tw`w-full h-40 rounded-3xl mt-2`}
          contentFit="cover"
        />

        <Text style={tw`font-LufgaMedium text-base text-black`}>
          $1,799{" "}
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            /weekly
          </Text>
        </Text>
        {/* ------------------ plan description ---------------- */}
        <Text style={tw`font-LufgaRegular text-sm text-subText `}>
          Ideal for independent seniors who value peace of mind and a gentle
          helping hand. The Crystal Comfort Plan is thoughtfully designed for
          seniors who live independently but benefit from occasional support.
          This plan provides a perfect balance of light assistance, meaningful
          companionship, and essential services—helping you or your loved one
          feel supported without compromising independence.
        </Text>

        {/* Included Services: */}
        <Text style={tw`font-LufgaMedium text-base text-black`}>
          Included Services:
        </Text>
        <View style={tw`gap-1 mb-4`}>
          {[1, 2, 3, 4, 5].map((line, index) => (
            <View key={index} style={tw`flex-row items-center gap-2 mt-2`}>
              <View style={tw`w-2 h-2 rounded-full bg-black`} />
              <Text
                numberOfLines={2}
                style={tw`font-LufgaRegular text-sm text-black flex-1`}
              >
                Wellness check-ins to ensure overall well-being
              </Text>
            </View>
          ))}
        </View>

        {/* =    all provider info      */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.push("/user_role_sections/providers/provider");
          }}
          style={tw`flex-row justify-between items-center `}
        >
          <Text style={tw`font-LufgaMedium text-base text-black`}>
            10 providers
          </Text>

          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`flex-row items-center `}>
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <Image
                    key={index}
                    style={tw`w-10 h-10 rounded-full  -ml-5`}
                    source={ImgProfileImg}
                    contentFit="contain"
                  />
                );
              })}
            </View>
            <SvgXml xml={IconGetterThen} />
          </View>
        </TouchableOpacity>
      </View>

      <PrimaryButton
        buttonText="Add to cart"
        buttonTextStyle={tw`font-LufgaMedium text-base`}
        buttonContainerStyle={tw`mt-2 h-10 `}
        leftIcon={IconCartWhite}
        onPress={() => {
          router.push("/user_role_sections/cart");
        }}
      />
    </ScrollView>
  );
};

export default AdminServiceDetails;
