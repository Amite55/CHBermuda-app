import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import SkeletonBox from "../lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "../lib/CustomSkeleton/SkeletonCircle";
import SkeletonTextMultiLine from "../lib/CustomSkeleton/SkeletonTextMultiLine";

const ProviderDetailsSkeleton = () => {
  return (
    <ScrollView
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`flex-grow justify-between px-5`}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {/* Header */}
        <SkeletonBox height={26} width={180} />

        {/* Provider card */}
        <View
          style={tw`flex-row items-center gap-4 px-5 py-4 bg-white rounded-xl mt-3`}
        >
          <SkeletonCircle size={64} />

          <View style={tw`gap-2`}>
            <SkeletonBox height={18} width={140} />
            <SkeletonBox height={14} width={100} />
          </View>
        </View>

        {/* Location */}
        <View style={tw`flex-row items-center gap-4 my-4`}>
          <SkeletonCircle size={18} />

          <View style={tw`flex-1`}>
            <SkeletonBox height={16} width={90} />
            <SkeletonBox height={14} width="70%" style={{ marginTop: 6 }} />
          </View>
        </View>

        {/* Rating */}
        <View style={tw`flex-row items-center gap-2`}>
          <SkeletonCircle size={16} />
          <SkeletonBox height={14} width={40} />
          <SkeletonBox height={14} width={90} />
        </View>

        {/* Rating breakdown */}
        <View style={tw`my-6 bg-white rounded-2xl p-4 gap-3`}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center gap-2`}>
                <SkeletonCircle size={14} />
                <SkeletonBox height={14} width={30} />
                <SkeletonBox height={10} width={140} radius={6} />
              </View>

              <SkeletonBox height={20} width={70} radius={20} />
            </View>
          ))}
        </View>

        {/* Reviews title */}
        <SkeletonBox height={18} width={90} />

        {/* Reviews list */}
        <FlatList
          data={Array.from({ length: 3 })}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-4 pb-2 mt-3`}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => (
            <View style={tw`bg-white rounded-2xl w-80`}>
              <View style={tw`p-4`}>
                {/* Review text multiline */}
                <SkeletonTextMultiLine lines={3} />
              </View>

              <View
                style={tw`flex-row items-center justify-between bg-slate-200 py-2 px-3 rounded-xl`}
              >
                <SkeletonBox height={16} width={120} />
                <SkeletonCircle size={48} />
              </View>
            </View>
          )}
        />
      </View>

      {/* Button */}
      <SkeletonBox
        height={48}
        width="100%"
        radius={12}
        style={{ marginTop: 16 }}
      />
    </ScrollView>
  );
};

export default ProviderDetailsSkeleton;
