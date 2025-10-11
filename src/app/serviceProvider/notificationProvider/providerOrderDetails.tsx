import {
  IconCalendar,
  IconProfileInactive,
  IconServiceName,
} from "@/assets/icons";
import { ImgProfileImg, ImgServiceImage } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
// import { GoogleMaps } from "expo-maps";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ProviderOrder = () => {
  const { status } = useLocalSearchParams();
  console.log(status, "status");
  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-bgBaseColor `}
        contentContainerStyle={tw`pb-5 px-5`}
      >
        <BackTitleButton title="Order Details" onPress={() => router.back()} />

        <View style={tw`flex-row items-center gap-3 pt-3`}>
          <SvgXml xml={IconServiceName} />
          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            Service name
          </Text>
        </View>
        <MenuCard
          titleText="Light cleaning"
          subTitleText="Today, at 06:00 PM"
          image={ImgServiceImage}
          containerStyle={tw` bg-white`}
        />
        <View style={tw`flex-row items-center gap-3 pt-3`}>
          <SvgXml xml={IconProfileInactive} />
          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            User details
          </Text>
        </View>
        <MenuCard
          titleText="Light cleaning"
          subTitleText="Today, at 06:00 PM"
          image={ImgProfileImg}
          containerStyle={tw` bg-white`}
        />
        {/* --------------------------- Schedule details --------------------------- */}
        <View style={tw`flex-row items-center gap-3 pt-3`}>
          <SvgXml xml={IconCalendar} />
          <View>
            <Text style={tw`font-LufgaMedium text-black text-base`}>
              Scheduled for
            </Text>
            <Text style={tw`font-LufgaRegular text-sm text-black`}>
              15 Sep, 2025 at 10:00 AM - 12:00 PM
            </Text>
          </View>
        </View>
        {/* --------------------------- User Location  --------------------------- */}
        <View>{/* <GoogleMaps.View style={tw`w-full h-40`} /> */}</View>
      </ScrollView>
    </>
  );
};

export default ProviderOrder;
