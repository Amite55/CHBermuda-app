import tw from "@/src/lib/tailwind";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

const HomeSkeleton = () => {
  return (
    <View style={tw`flex-1 bg-bgBaseColor`}>
      {/* ---------- Header background ---------- */}
      <Skeleton height={180} width={width} colorMode="light" />

      {/* ---------- Promo banner ---------- */}
      <View style={tw`absolute top-28 left-4 right-4`}>
        <Skeleton
          height={140}
          width={width - 32}
          radius={24}
          colorMode="light"
        />
      </View>

      {/* ---------- Categories ---------- */}
      <View style={tw`mt-44 px-4`}>
        <Skeleton height={22} width={180} colorMode="light" />

        <View style={tw`flex-row gap-5 mt-4`}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={tw`items-center`}>
              <Skeleton
                height={80}
                width={80}
                radius="round"
                colorMode="light"
              />
              <Skeleton height={14} width={60} colorMode="light" />
            </View>
          ))}
        </View>
      </View>

      {/* ---------- Services ---------- */}
      <View style={tw`mt-8 px-4`}>
        <Skeleton height={22} width={120} colorMode="light" />

        <View style={tw`flex-row gap-5 mt-4`}>
          {[1, 2].map((i) => (
            <View key={i} style={tw`bg-white w-80 rounded-3xl p-4`}>
              {/* Header */}
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <Skeleton
                    height={56}
                    width={56}
                    radius="round"
                    colorMode="light"
                  />
                  <View>
                    <Skeleton height={18} width={120} colorMode="light" />
                    <Skeleton height={14} width={80} colorMode="light" />
                  </View>
                </View>
                <Skeleton height={24} width={50} colorMode="light" />
              </View>

              {/* Description */}
              <View style={tw`mt-4 gap-2`}>
                <Skeleton height={14} width="100%" colorMode="light" />
                <Skeleton height={14} width="90%" colorMode="light" />
                <Skeleton height={14} width="80%" colorMode="light" />
              </View>

              {/* Included */}
              <View style={tw`mt-4 gap-2`}>
                {[1, 2, 3].map((x) => (
                  <View key={x} style={tw`flex-row gap-2 items-center`}>
                    <Skeleton
                      height={8}
                      width={8}
                      radius="round"
                      colorMode="light"
                    />
                    <Skeleton height={14} width={200} colorMode="light" />
                  </View>
                ))}
              </View>

              {/* Button */}
              <Skeleton
                height={40}
                width="100%"
                radius={12}
                colorMode="light"
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HomeSkeleton;
