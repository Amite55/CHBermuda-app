import { IconRightCornerArrowWhite } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";
import PrimaryButton from "../utils/PrimaryButton";

interface ServicePlanCardProps {
  image: any;
  planName: string;
  price: number;
  providers: number;
  description: string;
  plan?: string;
  onPress: () => void;
}

const ServicePlanCard = ({
  image = null,
  planName = "",
  price = 0,
  providers = 0,
  description = "",
  plan = "",
  onPress = () => {},
}: ServicePlanCardProps) => {
  return (
    <View>
      <Image
        source={image}
        style={tw`w-full h-40 rounded-3xl`}
        contentFit="cover"
      />
      {/* ------------------ plan name and price ---------------- */}
      <View style={tw`flex-row justify-between items-center pt-3`}>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={tw`font-LufgaMedium text-base text-black`}
        >
          {planName}
        </Text>
      </View>
      <Text style={tw`font-LufgaMedium text-base text-black self-end`}>
        ${price}
        <Text style={tw`font-LufgaRegular text-sm text-subText`}>/{plan}</Text>
      </Text>

      {/* ------------------ plan description ---------------- */}
      <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
        {description}
      </Text>
      {/* ---------------- if have an providers ---------------- */}
      {providers > 0 && (
        <View
          style={tw`pt-3 bg-sky-200 rounded-lg px-3 py-1  justify-center items-center mt-3`}
        >
          <Text style={tw`font-LufgaMedium text-base text-black`}>
            Providers:
            <Text style={tw`font-LufgaSemiBold text-lg text-black`}>
              {providers}
            </Text>
          </Text>
        </View>
      )}
      <PrimaryButton
        buttonText="See details"
        buttonTextStyle={tw`font-LufgaMedium text-base`}
        rightIcon={IconRightCornerArrowWhite}
        buttonContainerStyle={tw`mt-2 h-10 `}
        onPress={onPress}
      />
    </View>
  );
};

export default ServicePlanCard;
