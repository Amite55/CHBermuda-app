import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, View } from "react-native";
import SkeletonBox from "../lib/CustomSkeleton/SkeletonBox";
import SkeletonTextMultiLine from "../lib/CustomSkeleton/SkeletonTextMultiLine";

interface Props {
  CARD_COUNT?: number;
}

/* ---------------- Header Skeleton ---------------- */
const HeaderSkeleton = () => {
  return (
    <View>
      {/* Back title */}
      <SkeletonBox height={24} width={160} />

      {/* Banner image */}
      <View style={tw`mt-4`}>
        <SkeletonBox height={160} width="100%" radius={24} />
      </View>

      {/* Title */}
      <View style={tw`mt-4`}>
        <SkeletonBox height={20} width={120} />
      </View>

      {/* Duration */}
      <View style={tw`mt-2`}>
        <SkeletonBox height={16} width={180} />
      </View>

      {/* Description */}
      <View style={tw`mt-3`}>
        <SkeletonTextMultiLine lines={3} />
      </View>

      {/* Button */}
      <View style={tw`mt-3`}>
        <SkeletonBox height={40} width="100%" radius={12} />
      </View>
    </View>
  );
};

/* ---------------- Card Skeleton ---------------- */
const PlanCardSkeleton = () => {
  return (
    <View style={tw`py-3`}>
      {/* Image */}
      <SkeletonBox height={160} width="100%" radius={24} />

      {/* Title */}
      <View style={tw`mt-3`}>
        <SkeletonBox height={18} width={180} />
      </View>

      {/* Duration + Price */}
      <View style={tw`flex-row justify-between mt-2`}>
        <SkeletonBox height={16} width={170} />
        <SkeletonBox height={18} width={70} />
      </View>

      {/* Description */}
      <View style={tw`mt-3`}>
        <SkeletonTextMultiLine lines={2} />
      </View>

      {/* Button */}
      <View style={tw`mt-3`}>
        <SkeletonBox height={40} width="100%" radius={12} />
      </View>
    </View>
  );
};

/* ---------------- Main Skeleton ---------------- */
const ServicePackageListSkeleton = ({ CARD_COUNT = 5 }: Props) => {
  return (
    <FlatList
      data={Array.from({ length: CARD_COUNT })}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={tw`px-5 pb-4 gap-5 bg-bgBaseColor`}
      ListHeaderComponent={<HeaderSkeleton />}
      renderItem={() => <PlanCardSkeleton />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ServicePackageListSkeleton;
