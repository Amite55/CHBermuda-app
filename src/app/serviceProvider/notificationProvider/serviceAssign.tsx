import { ImgProfileImg } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ServiceAssign = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 flex-grow `}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title="Assign provider"
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={() => {
        return (
          <View
            style={tw`flex-row items-center justify-between p-3 bg-white rounded-xl`}
          >
            <View style={tw`flex-row items-center gap-3`}>
              <Image
                style={tw`w-12 h-12 rounded-full`}
                source={ImgProfileImg}
              />
              <View>
                <Text style={tw`font-LufgaMedium text-base text-black`}>
                  Mr. Lopez
                </Text>
                <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                  1 day ago
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`p-1.5 border border-subText rounded-xl`}
            >
              <Text style={tw`font-LufgaMedium text-primaryBtn text-sm `}>
                Assign
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default ServiceAssign;
