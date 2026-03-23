import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, View } from "react-native";
import SkeletonBox from "../lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "../lib/CustomSkeleton/SkeletonCircle";
import SkeletonTextMultiLine from "../lib/CustomSkeleton/SkeletonTextMultiLine";

const MyServiceSkeleton = () => {
  return (
    <FlatList
      data={Array.from({ length: 4 })}
      keyExtractor={(_, i) => i.toString()}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`px-5 pb-4`}
      showsVerticalScrollIndicator={false}
      /* ================= HEADER ================= */
      ListHeaderComponent={() => (
        <View>
          {/* Top bar */}
          <View style={tw`flex-row items-center justify-between`}>
            <SkeletonBox height={26} width={160} />

            {/* Button (Add / Create Account) */}
            <SkeletonBox height={32} width={120} radius={8} />
          </View>
        </View>
      )}
      /* ================= CARD ================= */
      renderItem={() => (
        <View style={tw`bg-white rounded-3xl p-4 mt-4`}>
          {/* Image */}
          <View style={tw`relative`}>
            <SkeletonBox height={160} width="100%" radius={24} />

            {/* Edit + Delete buttons */}
            <View style={tw`absolute top-3 right-2 flex-row gap-2`}>
              <SkeletonCircle size={36} />
              <SkeletonCircle size={36} />
            </View>
          </View>

          {/* Title + Price */}
          <View style={tw`flex-row justify-between items-center mt-3`}>
            <SkeletonBox height={18} width="60%" />
            <SkeletonBox height={16} width={60} />
          </View>

          {/* Duration + description */}
          <View style={tw`mt-2`}>
            <SkeletonBox height={14} width="50%" />
            <SkeletonTextMultiLine lines={2} />
          </View>

          {/* Included services title */}
          <SkeletonBox height={18} width={160} style={{ marginTop: 12 }} />

          {/* Included services list */}
          <View style={tw`mt-2 gap-2`}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={tw`flex-row items-center gap-2`}>
                <SkeletonCircle size={6} />
                <SkeletonBox height={14} width="80%" />
              </View>
            ))}
          </View>
        </View>
      )}
    />
  );
};

export default MyServiceSkeleton;
