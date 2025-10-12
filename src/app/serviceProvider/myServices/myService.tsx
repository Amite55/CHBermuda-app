import {
  IconCrossRed,
  IconDeleteRed,
  IconEditPenGreen,
  IconPlus,
} from "@/assets/icons";
import { ImgServiceImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

import { SvgXml } from "react-native-svg";

const MyService = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 `}
        style={tw`flex-1 bg-bgBaseColor`}
        ListHeaderComponent={() => (
          <View>
            <BackTitleButton
              title="My services"
              onPress={() => router.back()}
            />
            <View style={tw`flex-row items-center justify-between mt-3`}>
              <Text style={tw`font-LufgaMedium text-lg text-black`}>
                5 packages
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/serviceProvider/myServices/addNewService");
                }}
                activeOpacity={0.7}
                style={tw` bg-primaryBtn flex-row items-center justify-center gap-1 rounded-lg py-2 px-3`}
              >
                <Text style={tw`font-LufgaMedium text-base text-white`}>
                  Add
                </Text>
                <SvgXml xml={IconPlus} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderItem={() => (
          <View style={tw`bg-white rounded-3xl p-4`}>
            {/* --------------- service image  --------------- */}
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
                  onPress={() => setIsModalVisible(true)}
                  activeOpacity={0.6}
                  style={tw`w-10 h-10 rounded-lg bg-white justify-center items-center shadow`}
                >
                  <SvgXml xml={IconDeleteRed} />
                </TouchableOpacity>
              </View>
            </View>

            {/* --------------- service details  --------------- */}
            <View style={tw`flex-row items-center justify-between py-3`}>
              <Text style={tw`font-LufgaMedium text-regularText text-xl`}>
                Light cleaning
              </Text>
              <Text style={tw`font-LufgaMedium text-regularText text-xl`}>
                $65
              </Text>
            </View>

            {/*  */}
            <View style={tw`gap-1`}>
              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-1 h-1 bg-black rounded-full`} />
                <Text
                  numberOfLines={2}
                  style={tw`font-LufgaRegular text-base text-subText`}
                >
                  Duration: 1 hour
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-1 h-1 bg-black rounded-full`} />
                <Text
                  numberOfLines={2}
                  style={tw`font-LufgaRegular text-base text-subText`}
                >
                  Best for: Ongoing upkeep between deep cleans
                </Text>
              </View>
            </View>
            {/*  */}
            <Text style={tw`font-LufgaMedium text-regularText text-xl py-2`}>
              Included Services:
            </Text>
            <View style={tw`gap-1`}>
              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-1 h-1 bg-black rounded-full`} />
                <Text
                  numberOfLines={2}
                  style={tw`font-LufgaRegular text-base text-subText`}
                >
                  Dusting and wiping of surfaces in living areas and bedrooms.
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-1 h-1 bg-black rounded-full`} />
                <Text
                  numberOfLines={2}
                  style={tw`font-LufgaRegular text-base text-subText`}
                >
                  Light kitchen wipe-down (counters, sink, stove exterior).
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-1 h-1 bg-black rounded-full`} />
                <Text
                  numberOfLines={2}
                  style={tw`font-LufgaRegular text-base text-subText`}
                >
                  Bathroom touch-up (toilet, sink, mirror).
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-1 h-1 bg-black rounded-full`} />
                <Text
                  numberOfLines={2}
                  style={tw`font-LufgaRegular text-base text-subText`}
                >
                  Sweeping or mopping high-traffic floors.
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <View style={tw`w-1 h-1 bg-black rounded-full`} />
                <Text
                  numberOfLines={2}
                  style={tw`font-LufgaRegular text-base text-subText`}
                >
                  Trash bin emptying and liner replacement.
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* ============================ logout modal =========================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 px-5`}
        >
          <View style={[tw`bg-white   rounded-2xl p-6 h-88`]}>
            <View style={tw`flex-row justify-between`}>
              <View />
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={tw`p-3 rounded-full justify-center items-center bg-gray-300 shadow-md`}
              >
                <SvgXml xml={IconCrossRed} />
              </TouchableOpacity>
            </View>
            <View style={tw`justify-center items-center pb-4 gap-1`}>
              <SvgXml width={35} height={35} xml={IconDeleteRed} />
              <Text style={tw`text-center font-LufgaSemiBold  text-lg `}>
                Are you sure to delete this package ?
              </Text>

              <Text
                style={tw`text-center font-LufgaMedium  text-sm text-regularText`}
              >
                After deleting, users won’t be able to find your service.
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsModalVisible(false)}
              style={tw` rounded-full bg-red-500 my-3`}
            >
              <Text
                style={tw`font-LufgaMedium text-lg text-center p-2 text-white`}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyService;
