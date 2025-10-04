import { ImgPrivacyPolicy } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text } from "react-native";

const BoutPrivacyPolicy = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor `}
      contentContainerStyle={tw`pb-5 px-5`}
    >
      <BackTitleButton title={"Privacy policy"} onPress={() => router.back()} />

      <Image
        contentFit="contain"
        style={tw`w-full h-48 my-4`}
        source={ImgPrivacyPolicy}
      />

      <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
        Lorem ipsum dolor sit amet consectetur. Blandit elementum eu nisi sed
        turpis pellentesque sagittis. Risus consequat orci risus risus tincidunt
        eget nunc aliquam. Et phasellus nisl donec eget erat tincidunt sem.
        Vitae et morbi amet tempus eleifend consectetur cursus quam enim.{" "}
      </Text>
      <Text style={tw`font-LufgaRegular text-sm text-regularText mt-4`}>
        Lorem ipsum dolor sit amet consectetur. Blandit elementum eu nisi sed
        turpis pellentesque sagittis. Risus consequat orci risus risus tincidunt
        eget nunc aliquam. Et phasellus nisl donec eget erat tincidunt sem.
        Vitae et morbi amet tempus eleifend consectetur cursus quam enim.{" "}
      </Text>
    </ScrollView>
  );
};

export default BoutPrivacyPolicy;
