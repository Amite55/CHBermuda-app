import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, View } from "react-native";
import SkeletonBox from "../lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "../lib/CustomSkeleton/SkeletonCircle";

const StaffsSkeleton = () => {
  return (
    <FlatList
      data={Array.from({ length: 6 })}
      keyExtractor={(_, i) => i.toString()}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-5 px-5`}
      /* ================= HEADER ================= */
      ListHeaderComponent={() => (
        <View>
          {/* Top bar */}
          <View style={tw`relative`}>
            <SkeletonBox height={26} width={150} />

            {/* Add button */}
            <SkeletonBox
              height={36}
              width={80}
              radius={8}
              style={{ position: "absolute", right: 0, top: 0 }}
            />
          </View>

          {/* Total employees card */}
          <View
            style={tw`justify-center items-center gap-3 bg-white p-5 rounded-2xl mt-3`}
          >
            <SkeletonBox height={50} width={60} />
            <SkeletonBox height={14} width={120} />
            <SkeletonBox height={18} width={60} />
          </View>

          {/* Available / Unavailable */}
          <View style={tw`flex-row justify-between mt-3`}>
            {[1, 2].map((i) => (
              <View
                key={i}
                style={tw`w-[48%] gap-2 p-5 rounded-2xl bg-white items-center`}
              >
                <SkeletonBox height={16} width={100} />
                <SkeletonBox height={20} width={50} />
              </View>
            ))}
          </View>

          {/* Section title */}
          <SkeletonBox
            height={20}
            width={120}
            style={{ marginTop: 16, marginBottom: 12 }}
          />
        </View>
      )}
      /* ================= LIST ITEMS ================= */
      renderItem={() => (
        <View style={tw`mb-4 bg-white rounded-2xl p-3`}>
          <View style={tw`flex-row items-center gap-3`}>
            {/* Avatar */}
            <SkeletonCircle size={80} />

            {/* Content */}
            <View style={tw`flex-1`}>
              <SkeletonBox height={16} width="60%" />
              <SkeletonBox height={14} width="70%" style={{ marginTop: 6 }} />
            </View>

            {/* Arrow icon */}
            <SkeletonCircle size={24} />
          </View>
        </View>
      )}
    />
  );
};

export default StaffsSkeleton;
