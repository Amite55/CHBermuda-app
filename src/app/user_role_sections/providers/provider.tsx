import {
  IconInterGative,
  IconRatingStar,
  IconRightCornerArrowWhite,
} from "@/assets/icons";
import { ImgBennerImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Provider = () => {
  const [isPlanPurchased, setIsPlanPurchased] = React.useState(true);
  return (
    <View style={tw`flex-1 bg-bgBaseColor px-5 `}>
      <BackTitleButton title="Providers" onPress={() => router.back()} />

      {/* ====================== if plan is not purchased ====================== */}

      {!isPlanPurchased && (
        <View
          style={tw`flex-row justify-center items-center gap-2 border p-2 rounded-lg border-red-700 bg-red-100 mt-8`}
        >
          <SvgXml xml={IconInterGative} />
          <Text style={tw`font-LufgaRegular text-base text-red-700`}>
            Purchase plan for book providers
          </Text>
        </View>
      )}

      {/* ====================== if plan is purchased ====================== */}
      {isPlanPurchased && (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`gap-4 pb-2 mt-3`}
          renderItem={(item) => {
            return (
              <View style={tw`bg-white rounded-2xl p-4`}>
                {/* ------------------ provider info ---------------- */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled
                  style={tw`flex-row items-center py-2 gap-4`}
                >
                  <View style={tw`relative`}>
                    <Image
                      style={tw`w-12 h-12 rounded-full`}
                      source={ImgBennerImage}
                      contentFit="contain"
                    />
                    <View
                      style={tw`absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full`}
                    />
                  </View>
                  <View>
                    <Text
                      style={tw`font-LufgaMedium text-base text-regularText`}
                    >
                      Elizabeth Olson
                    </Text>

                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      Joined 16th July, 2024
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={tw`gap-1 my-2`}>
                  <View style={tw`flex-row items-center gap-1`}>
                    <SvgXml xml={IconRatingStar} />
                    <Text
                      style={tw`font-LufgaRegular text-sm text-regularText`}
                    >
                      4.0
                    </Text>
                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      (8 reviews)
                    </Text>
                  </View>
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    12 orders completed
                  </Text>
                </View>

                <PrimaryButton
                  buttonText="See details"
                  buttonTextStyle={tw`font-LufgaRegular text-base`}
                  buttonContainerStyle={tw` h-10  `}
                  rightIcon={IconRightCornerArrowWhite}
                  onPress={() => {
                    router.push(
                      "/user_role_sections/providers/providerDetailsInfoAdmin"
                    );
                  }}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Provider;
