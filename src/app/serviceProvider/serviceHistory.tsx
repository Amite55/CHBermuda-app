import { ImgProfileImg } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ServiceHistory = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3  `}
      style={tw`flex-1 bg-bgBaseColor`}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title="Service provided"
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={() => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl`,
            ]}
          >
            <Image style={tw`w-16 h-16 rounded-full`} source={ImgProfileImg} />
            <View style={tw`flex-1`}>
              <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                Crystal comfort plan
              </Text>
              <View>
                <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                  Username goes here
                </Text>
                <View style={tw` flex-row justify-between items-center`}>
                  <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                    01 Sep, 2025
                  </Text>

                  {
                    <Text
                      style={tw`font-LufgaRegular text-sm text-white bg-primaryBtn px-2 py-1 rounded-lg`}
                    >
                      Pending
                    </Text>
                  }
                  {/* rating */}
                  {/* <View style={tw`flex-row items-center gap-1`}>
                    <SvgXml xml={IconRatingStar} />
                    <Text
                      style={tw`font-LufgaRegular text-sm text-regularText`}
                    >
                      4.0
                    </Text>
                  </View> */}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ServiceHistory;
