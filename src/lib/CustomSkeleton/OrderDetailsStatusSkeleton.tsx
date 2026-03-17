import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import SkeletonBox from "./SkeletonBox";
import SkeletonCircle from "./SkeletonCircle";
import SkeletonTextMultiLine from "./SkeletonTextMultiLine";

const OrderDetailsStatusSkeleton = () => {
  return (
    <ScrollView
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-5 px-5`}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <SkeletonBox height={26} width={160} />

      {/* ================= Service ================= */}
      <View style={tw`mt-4`}>
        <SkeletonBox height={18} width={100} />

        <View style={tw`bg-white rounded-2xl p-3 mt-3`}>
          <View style={tw`flex-row items-center gap-3`}>
            <SkeletonCircle size={50} />
            <View style={tw`flex-1`}>
              <SkeletonBox height={16} width="70%" />
              <SkeletonBox height={14} width="50%" style={{ marginTop: 6 }} />
            </View>
          </View>
        </View>
      </View>

      {/* ================= Provider ================= */}
      <View style={tw`mt-6`}>
        <SkeletonBox height={18} width={100} />

        <View style={tw`bg-white rounded-2xl p-3 mt-3`}>
          <View style={tw`flex-row items-center gap-3`}>
            <SkeletonCircle size={50} />

            <View style={tw`flex-1`}>
              <SkeletonBox height={16} width="60%" />
              <SkeletonBox height={14} width="40%" style={{ marginTop: 6 }} />
              <SkeletonBox height={14} width="30%" style={{ marginTop: 6 }} />
            </View>
          </View>
        </View>
      </View>

      {/* ================= Billing Info ================= */}
      <View style={tw`mt-6`}>
        <SkeletonBox height={18} width={140} />

        <View style={tw`bg-white rounded-2xl p-4 mt-3`}>
          <SkeletonTextMultiLine lines={3} />
        </View>
      </View>

      {/* ================= Scheduled Time ================= */}
      <View style={tw`mt-6`}>
        <SkeletonBox height={18} width={140} />

        <View style={tw`bg-white rounded-2xl p-3 mt-3`}>
          <SkeletonBox height={18} width={120} />
          <SkeletonBox height={14} width={160} style={{ marginTop: 6 }} />
        </View>
      </View>

      {/* ================= Assigned Staff ================= */}
      <View style={tw`mt-6`}>
        <SkeletonBox height={18} width={140} />

        <View style={tw`bg-white rounded-2xl p-3 mt-3`}>
          <View style={tw`flex-row items-center gap-3`}>
            <SkeletonCircle size={50} />
            <View style={tw`flex-1`}>
              <SkeletonBox height={16} width="50%" />
              <SkeletonBox height={14} width="40%" style={{ marginTop: 6 }} />
            </View>

            <SkeletonCircle size={30} />
          </View>
        </View>
      </View>

      {/* ================= Delivered Section ================= */}
      <View style={tw`mt-6`}>
        {/* Image list */}
        <FlatList
          data={Array.from({ length: 4 })}
          horizontal
          keyExtractor={(_, i) => i.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-3`}
          renderItem={() => (
            <SkeletonBox height={112} width={112} radius={12} />
          )}
        />

        {/* Message title */}
        <SkeletonBox height={18} width={80} style={{ marginTop: 16 }} />

        {/* Message box */}
        <View style={tw`bg-white rounded-2xl p-3 mt-3`}>
          <SkeletonTextMultiLine lines={4} />
        </View>

        {/* Buttons */}
        <View style={tw`flex-row gap-2 mt-4`}>
          <SkeletonBox height={40} width="50%" radius={8} />
          <SkeletonBox height={40} width="50%" radius={8} />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsStatusSkeleton;
