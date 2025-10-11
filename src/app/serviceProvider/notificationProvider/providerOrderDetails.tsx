import {
  IconCalendar,
  IconProfileInactive,
  IconServiceName,
} from "@/assets/icons";
import { ImgProfileImg, ImgServiceImage } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import TextButton from "@/src/utils/TextButton";
import { GoogleMaps } from "expo-maps";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ProviderOrder = () => {
  const { status } = useLocalSearchParams();

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
          titleText="Mr. Lopez"
          subTitleText="Location goes here."
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

        <GoogleMaps.View
          style={tw`flex-1`}
          // cameraPosition={{
          //   coordinates:{
          //     latitude:22.38,
          //     longitude: 90.41
          //   },
          //   zoom: 30
          // }}
        />

        {/* Check status  */}
        {status === "new_order" && (
          <View style={tw`pt-3 items-center flex-row gap-2 justify-between `}>
            <TextButton
              buttonText="Decline"
              buttonContainerStyle={tw` bg-dangerBtn w-[49%] rounded-full`}
              buttonTextStyle={tw`text-lg`}
            />
            <TextButton
              buttonText="Accept"
              buttonContainerStyle={tw`bg-successBtn w-[49%] rounded-full`}
              buttonTextStyle={tw`text-lg`}
            />
          </View>
        )}
        {status === "approved" && (
          <View>
            <View style={tw`flex-row items-center gap-3 pt-3`}>
              <Text style={tw`font-LufgaMedium text-black text-base`}>
                Assigned stuff
              </Text>
            </View>
            <MenuCard
              titleText="Mr. Lopez"
              subTitleText="+123456789"
              image={ImgProfileImg}
              containerStyle={tw` bg-white`}
            />
          </View>
        )}
        {status === "canceled" && (
          <View style={tw`gap-3`}>
            <Text style={tw`text-red-500 text-center font-LufgaMedium`}>
              Delivery request canceled
            </Text>
            <PrimaryButton
              // onPress={() => router.push("/serviceProvider/notificationProvider")}
              buttonText="Go Back"
              buttonTextStyle={tw`text-lg text-black`}
              buttonContainerStyle={tw`bg-transparent rounded-full border border-subText`}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ProviderOrder;
