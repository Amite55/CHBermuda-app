import { IconDuration } from "@/assets/icons";
import { RespiteCareData } from "@/src/components/AllData";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const RespiteCareAllPlan = () => {
  const { category } = useLocalSearchParams();
  return (
    <FlatList
      data={RespiteCareData}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor gap-5`}
      style={tw`flex-1 bg-bgBaseColor`}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title={category ? category.toString() : "Services"}
            onPress={() => router.back()}
          />
        );
      }}
      ListFooterComponent={
        <View>
          <Text>tmi ami se</Text>
        </View>
      }
      renderItem={({ item }) => {
        return (
          <View>
            <Image contentFit="cover" source={item?.image} />
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              {item?.title}
            </Text>

            <View style={tw`flex-row justify-between items-center `}>
              <View style={tw`flex-row items-center gap-1 `}>
                <SvgXml xml={IconDuration} />
                <Text style={tw`font-LufgaMedium text-base text-black`}>
                  Duration: {item?.duration} hours
                </Text>
              </View>
              <Text style={tw`font-LufgaMedium text-xl text-black`}>
                ${item?.price}
                <Text style={tw`font-LufgaRegular text-sm text-gray-500`}>
                  / weekly
                </Text>
              </Text>
            </View>
            {/* ------------------ plan description ---------------- */}
            <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
              {item?.description}
            </Text>
          </View>
        );
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RespiteCareAllPlan;
