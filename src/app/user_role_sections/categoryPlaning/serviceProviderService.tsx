import { IconRatingStar, IconRightCornerArrowWhite } from "@/assets/icons";
import { ImgBennerImage, ImgServiceProviderPlan } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ServiceProviderService = () => {
  const { category } = useLocalSearchParams();
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor gap-5`}
      style={tw`flex-1 bg-bgBaseColor`}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title={category ? category.toString() : "Services"}
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={() => {
        return (
          <View>
            <Image
              source={ImgServiceProviderPlan}
              style={tw`w-full h-40 rounded-3xl`}
              contentFit="cover"
            />
            {/* ------------------ plan name and price ---------------- */}
            <View style={tw`flex-row justify-between items-center pt-3`}>
              <Text style={tw`font-LufgaMedium text-base text-black`}>
                Crystal Comfort Plan
              </Text>
              <Text style={tw`font-LufgaMedium text-base text-black`}>
                $1,799{" "}
                <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                  /weekly
                </Text>
              </Text>
            </View>

            {/* ------------------ provider info ---------------- */}

            <TouchableOpacity
              activeOpacity={0.7}
              disabled
              style={tw`flex-row items-center py-2`}
            >
              <Image
                style={tw`w-10 h-10 rounded-full`}
                source={ImgBennerImage}
                contentFit="contain"
              />
              <View>
                <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                  Elizabeth Olson
                </Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <SvgXml xml={IconRatingStar} />
                  <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                    4.0
                  </Text>
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    (8 reviews)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* ------------------ plan description ---------------- */}
            <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
              Ideal for independent seniors who value peace of mind and a gentle
              helping hand. The Crystal Comfort Plan is thoughtfully designed
            </Text>
            <PrimaryButton
              onPress={() => {
                router.push(
                  "/user_role_sections/providers/providerDetailsInfoProviders"
                );
              }}
              buttonText="See details"
              buttonTextStyle={tw`font-LufgaMedium text-base`}
              rightIcon={IconRightCornerArrowWhite}
              buttonContainerStyle={tw`mt-2 h-10 `}
            />
          </View>
        );
      }}
    />
  );
};

export default ServiceProviderService;
