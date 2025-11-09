import { IconDuration, IconRightCornerArrowWhite } from "@/assets/icons";
import { ImgRespiteCarePlan } from "@/assets/image";
import { RespiteCareData } from "@/src/components/AllData";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const RespiteCareAllPlan = () => {
  const { category } = useLocalSearchParams();

  const RenderItem = ({ item }) => {
    return (
      <View style={tw`py-3`}>
        <Image
          contentFit="cover"
          style={tw`w-full h-40 rounded-3xl`}
          source={item?.image}
        />
        <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
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
        <PrimaryButton
          buttonText="See details"
          buttonTextStyle={tw`font-LufgaMedium text-base`}
          rightIcon={IconRightCornerArrowWhite}
          buttonContainerStyle={tw`mt-2 h-10 `}
          onPress={() => {
            router.push(
              "/user_role_sections/respiteCarePlaning/respiteCarePlaningDetails"
            );
          }}
        />
      </View>
    );
  };

  // ===================== const footer content ======================
  const RenderFooterContent = () => {
    return (
      <View style={tw`py-3`}>
        <Image
          contentFit="cover"
          style={tw`w-full h-40 rounded-3xl`}
          source={ImgRespiteCarePlan}
        />
        <Text style={tw`font-LufgaMedium text-xl text-black pt-3`}>Custom</Text>

        <View style={tw`flex-row justify-between items-center `}>
          <View style={tw`flex-row items-center gap-1 `}>
            <SvgXml xml={IconDuration} />
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              Duration: N/A
            </Text>
          </View>
          {/* <Text style={tw`font-LufgaMedium text-xl text-black`}>
            ${item?.price}
            <Text style={tw`font-LufgaRegular text-sm text-gray-500`}>
              / weekly
            </Text>
          </Text> */}
        </View>
        {/* ------------------ plan description ---------------- */}
        <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
          Lorem ipsum dolor sit amet consectetur. Dignissim vulputate elementum
          vitae magna id. Eu vulputate scelerisque tincidunt mi. Faucibus
          lobortis sed quis convallis massa nulla est eget ultricies. Quis
          fringilla sollicitudin posuere luctus et urna molestie et senectus.
          Eget purus odio in vestibulum tellus condimentum blandit fermentum.
        </Text>
        <PrimaryButton
          buttonText="See details"
          buttonTextStyle={tw`font-LufgaMedium text-base`}
          rightIcon={IconRightCornerArrowWhite}
          buttonContainerStyle={tw`mt-2 h-10 `}
          onPress={() => {
            router.push(
              "/user_role_sections/respiteCarePlaning/customRespiteCare"
            );
          }}
        />
      </View>
    );
  };

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
      ListFooterComponent={<RenderFooterContent />}
      renderItem={({ item }) => {
        return <RenderItem item={item} />;
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RespiteCareAllPlan;
