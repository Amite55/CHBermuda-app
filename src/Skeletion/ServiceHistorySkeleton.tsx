import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, View } from "react-native";
import SkeletonBox from "../lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "../lib/CustomSkeleton/SkeletonCircle";

const ServiceHistorySkeleton = () => {
  return (
    <FlatList
      data={Array.from({ length: 6 })}
      keyExtractor={(_, i) => i.toString()}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`px-5 pb-3 gap-3`}
      showsVerticalScrollIndicator={false}
      /* ================= HEADER ================= */
      ListHeaderComponent={() => <SkeletonBox height={26} width={180} />}
      /* ================= LIST ITEM ================= */
      renderItem={() => (
        <View
          style={tw`flex-row items-center gap-4 px-3 py-4 bg-white rounded-xl`}
        >
          {/* Avatar */}
          <SkeletonCircle size={64} />

          {/* Content */}
          <View style={tw`flex-1`}>
            {/* Title */}
            <SkeletonBox height={16} width="70%" />

            {/* Name */}
            <SkeletonBox height={14} width="50%" style={{ marginTop: 6 }} />

            {/* Date + Status */}
            <View style={tw`flex-row justify-between items-center mt-2`}>
              <SkeletonBox height={12} width="40%" />

              {/* Status badge */}
              <SkeletonBox height={20} width={70} radius={6} />
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default ServiceHistorySkeleton;
