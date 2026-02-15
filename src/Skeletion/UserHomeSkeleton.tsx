import tw from "@/src/lib/tailwind";
import React from "react";
import { Dimensions, View } from "react-native";
import SkeletonBox from "../lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "../lib/CustomSkeleton/SkeletonCircle";
import SkeletonTextMultiLine from "../lib/CustomSkeleton/SkeletonTextMultiLine";

const { width } = Dimensions.get("window");

const UserHomeSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-bgBaseColor`}>
      {/* ---------- Header background ---------- */}
      <SkeletonBox height={180} width={width} />

      {/* ---------- Promo banner ---------- */}
      <View style={tw`absolute top-28 left-4 right-4`}>
        <SkeletonBox height={140} width={width - 32} radius={24} />
      </View>

      {/* ---------- Categories ---------- */}
      <View style={tw`mt-44 px-4`}>
        <SkeletonBox height={22} width={180} />

        <View style={tw`flex-row gap-5 mt-4`}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={tw`items-center`}>
              <SkeletonCircle size={80} />
              <SkeletonBox height={14} width={60} style={{ marginTop: 6 }} />
            </View>
          ))}
        </View>
      </View>

      {/* ---------- Services ---------- */}
      <View style={tw`mt-8 px-4`}>
        <SkeletonBox height={22} width={120} />

        <View style={tw`flex-row gap-5 mt-4`}>
          {[1, 2].map((i) => (
            <View key={i} style={tw`bg-white w-80 rounded-3xl p-4`}>
              {/* Header */}
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <SkeletonCircle size={56} />
                  <View>
                    <SkeletonBox height={18} width={120} />
                    <SkeletonBox
                      height={14}
                      width={80}
                      style={{ marginTop: 6 }}
                    />
                  </View>
                </View>
                <SkeletonBox height={24} width={50} />
              </View>

              {/* Description */}
              <View style={tw`mt-4`}>
                <SkeletonTextMultiLine lines={3} />
              </View>

              {/* Included */}
              <View style={tw`mt-4 gap-2`}>
                {[1, 2, 3].map((x) => (
                  <View key={x} style={tw`flex-row gap-2 items-center`}>
                    <SkeletonCircle size={8} />
                    <SkeletonBox height={14} width={200} />
                  </View>
                ))}
              </View>

              {/* Button */}
              <SkeletonBox
                height={40}
                width="100%"
                radius={12}
                style={{ marginTop: 16 }}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default UserHomeSkeleton;
