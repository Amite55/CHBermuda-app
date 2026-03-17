import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, View } from "react-native";
import SkeletonBox from "./SkeletonBox";
import SkeletonCircle from "./SkeletonCircle";

const NotificationSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-bgBaseColor`}>
      <FlatList
        data={Array.from({ length: 8 })}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={tw`px-5 gap-3 pb-3 flex-grow`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <SkeletonBox height={26} width={180} />}
        renderItem={() => (
          <View style={tw`bg-white rounded-2xl p-4 flex-row gap-3`}>
            {/* Icon */}
            <SkeletonCircle size={40} />

            {/* Content */}
            <View style={tw`flex-1`}>
              {/* Title */}
              <SkeletonBox height={16} width="70%" />

              {/* Description */}
              <SkeletonBox height={14} width="90%" style={{ marginTop: 6 }} />

              {/* Time */}
              <SkeletonBox height={12} width="40%" style={{ marginTop: 6 }} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationSkeleton;
