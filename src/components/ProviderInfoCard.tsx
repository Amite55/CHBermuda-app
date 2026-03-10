import { IconRatingStar, IconRightCornerArrowWhite } from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import PrimaryButton from "../utils/PrimaryButton";

interface IProviderInfoCardType {
  providerImg?: string;
  providerName?: string;
  providerJoinedDate?: string;
  providerAvgRating?: number;
  providerReviewCount?: number;
  providerServiceCount?: number;
  providerPackageCount?: number;
  onPress?: () => void;
}

const ProviderInfoCard = ({
  providerImg,
  providerName,
  providerJoinedDate,
  providerAvgRating,
  providerReviewCount,
  providerServiceCount,
  providerPackageCount,
  onPress,
}: IProviderInfoCardType) => {
  return (
    <View style={tw`bg-white rounded-2xl p-4`}>
      {/* ------------------ provider info ---------------- */}
      <TouchableOpacity
        activeOpacity={0.7}
        disabled
        style={tw`flex-row items-center py-2 gap-4`}
      >
        <Image
          style={tw`w-12 h-12 rounded-full`}
          source={providerImg}
          contentFit="contain"
          placeholder={ImgPlaceholderProfile}
        />

        <View>
          <Text style={tw`font-LufgaMedium text-base text-regularText`}>
            {providerName}
          </Text>

          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            Joined {providerJoinedDate}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={tw`gap-1 my-2`}>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconRatingStar} />
          <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
            {providerAvgRating || 0}
          </Text>
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            ({providerReviewCount || 0} reviews)
          </Text>
        </View>
        <Text style={tw`font-LufgaRegular text-sm text-subText`}>
          {providerPackageCount} orders completed
        </Text>
      </View>

      <PrimaryButton
        buttonText="See details"
        buttonTextStyle={tw`font-LufgaRegular text-base`}
        buttonContainerStyle={tw` h-10  `}
        rightIcon={IconRightCornerArrowWhite}
        onPress={() => {
          onPress?.();
          //   router.push({
          //     pathname: "/user_role_sections/providers/providerDetailsInfoAdmin",
          //     params: { id: item?.provider?.id },
          //   });
        }}
      />
    </View>
  );
};

export default ProviderInfoCard;
