import { IconDeleteRed, IconEditPenGreen, IconPlus } from "@/assets/icons";
import { ImgServiceImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const MyService = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 `}
      style={tw`flex-1 bg-bgBaseColor`}
      ListHeaderComponent={() => (
        <View>
          <BackTitleButton title="My services" onPress={() => router.back()} />
          <View style={tw`flex-row items-center justify-between mt-3`}>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>
              3 packages
            </Text>
            <TouchableOpacity
              onPress={() => {
                // router.push("/serviceProvider/providerStaffs/addNewStaffs");
              }}
              activeOpacity={0.7}
              style={tw` bg-primaryBtn flex-row items-center justify-center gap-1 rounded-lg py-2 px-3`}
            >
              <Text style={tw`font-LufgaMedium text-base text-white`}>Add</Text>
              <SvgXml xml={IconPlus} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      renderItem={() => (
        <View>
          <View style={tw`relative`}>
            <Image
              style={tw`w-full h-40 rounded-3xl mt-2`}
              contentFit="cover"
              source={ImgServiceImage}
            />

            <View
              style={tw`absolute top-3 right-2 flex-row items-center gap-2`}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={tw`w-10 h-10 rounded-lg bg-white justify-center items-center shadow`}
              >
                <SvgXml xml={IconEditPenGreen} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={tw`w-10 h-10 rounded-lg bg-white justify-center items-center shadow`}
              >
                <SvgXml xml={IconDeleteRed} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default MyService;
