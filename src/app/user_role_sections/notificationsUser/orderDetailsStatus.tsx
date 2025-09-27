import {
  IconCartWhite,
  IconCrossRed,
  IconMessage,
  IconPendingStatus,
  IconTellPhone,
} from "@/assets/icons";
import { ImgProfileImg } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import ProviderCard from "@/src/components/ProviderCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const OrderDetailsStatus = () => {
  const { status } = useLocalSearchParams();
  console.log(status, "status ==============");
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor px-5`}
    >
      <BackTitleButton title={status} onPress={() => router.back()} />

      {/* ============== Order Details Status ============== */}

      <View>
        <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
          Service
        </Text>
        <MenuCard
          titleText="Crystal Comfort Plan"
          subTitleText="Number of order in this month: 2"
          image={ImgProfileImg}
          containerStyle={tw` bg-white`}
        />
        {/* = ----------------- provider content ---------------- */}
        <View style={tw`flex-row items-center justify-between pt-6 pb-3`}>
          <Text style={tw`font-LufgaSemiBold text-base text-black`}>
            Provider
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`w-10 h-10 bg-slate-300 rounded-xl items-center justify-center`}
          >
            <SvgXml xml={IconMessage} />
          </TouchableOpacity>
        </View>
        <ProviderCard
          containerStyle={tw`bg-white`}
          image={ImgProfileImg}
          title="John Doe"
          subTitle="Crystal Comfort Plan"
          ratings={4.5}
          reviews={10}
          totalOrder={12}
        />

        <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
          Billing information
        </Text>

        {/* ==================== user info details ================== */}
        <View style={tw` bg-white p-3 rounded-2xl`}>
          <View>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>Name</Text>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              Mr. Lopez
            </Text>
          </View>
          <View>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>Email</Text>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              example@gmail.com
            </Text>
          </View>
          <View>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>
              Location
            </Text>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              Dhaka, Bangladesh
            </Text>
          </View>
        </View>

        <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
          Scheduled time
        </Text>
        {/* ==================== Scheduled time ================== */}
        <View style={tw` bg-white p-3 rounded-2xl`}>
          <Text style={tw`font-LufgaMedium text-lg text-black`}>
            Mon, Aug 27, 2025
          </Text>
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            02:00 PM - 11:00 PM
          </Text>
        </View>

        {/* ========================== status ways details ================ */}

        {status === "pending" && (
          <View>
            <View style={tw`justify-between items-center py-6`}>
              <SvgXml xml={IconPendingStatus} />
              <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                No response form provider yet
              </Text>
            </View>
            <PrimaryButton
              buttonText="Cancel order"
              buttonTextStyle={tw`text-sm text-red-500`}
              buttonContainerStyle={tw`bg-transparent border border-red-500`}
              leftIcon={IconCrossRed}
              onPress={() => {}}
            />
          </View>
        )}

        {/* ====================== ongoing or complete status details ================ */}
        {status === "approved" && (
          <View>
            <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
              Assigned stuff
            </Text>
            <MenuCard
              titleText="John Doe"
              subTitleText="+12345678965"
              image={ImgProfileImg}
              containerStyle={tw` bg-white`}
              endIcon={IconTellPhone}
              endIconOnPress={() => {}}
            />
          </View>
        )}
        {/* ================= cancel status details ================ */}
        {status === "canceled" && (
          <PrimaryButton
            buttonText="Place order"
            buttonTextStyle={tw`text-sm`}
            buttonContainerStyle={tw`h-10 mt-4 mb-2`}
            leftIcon={IconCartWhite}
            onPress={() => {}}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default OrderDetailsStatus;
