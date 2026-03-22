import tw from "@/src/lib/tailwind";
import React from "react";
import { View } from "react-native";
import SkeletonBox from "../lib/CustomSkeleton/SkeletonBox";
import SkeletonCircle from "../lib/CustomSkeleton/SkeletonCircle";

const WebViewSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-bgBaseColor`}>
      {/* ================= Header ================= */}
      <View style={tw`flex-row items-center gap-3 px-5 py-3`}>
        {/* Back button */}
        <SkeletonCircle size={32} />

        {/* Title */}
        <SkeletonBox height={18} width={150} />
      </View>

      {/* ================= Web Content ================= */}
      <View style={tw`flex-1 px-5`}>
        {/* Fake web blocks */}
        <SkeletonBox height={180} width="100%" radius={16} />

        <View style={tw`mt-4`}>
          <SkeletonBox height={18} width="60%" />
          <SkeletonBox height={14} width="100%" style={{ marginTop: 8 }} />
          <SkeletonBox height={14} width="95%" style={{ marginTop: 6 }} />
          <SkeletonBox height={14} width="90%" style={{ marginTop: 6 }} />
        </View>

        <View style={tw`mt-6`}>
          <SkeletonBox height={120} width="100%" radius={12} />
        </View>

        <View style={tw`mt-4`}>
          <SkeletonBox height={14} width="100%" />
          <SkeletonBox height={14} width="92%" style={{ marginTop: 6 }} />
          <SkeletonBox height={14} width="85%" style={{ marginTop: 6 }} />
        </View>
      </View>
    </View>
  );
};

export default WebViewSkeleton;
