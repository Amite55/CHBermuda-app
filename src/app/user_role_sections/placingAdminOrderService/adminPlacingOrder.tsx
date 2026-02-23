import {
  IconLocationPrimary,
  IconRatingStar,
  IconRightArrow,
} from "@/assets/icons";
import { ImgBennerImage, ImgServiceImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const AdminPlacingOrder = () => {
  const booking = useSelector((state: any) => state.booking);

  console.log(
    booking,
    "this is booking from placing order page------------------",
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 bg-bgBaseColor`}
          contentContainerStyle={tw`pb-6 px-5 flex-grow justify-between`}
        >
          <View>
            <BackTitleButton
              title="Placing order admin"
              onPress={() => router.back()}
            />
            {/* ------------- service name ------------ */}
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Service
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled
              style={tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl`}
            >
              <Image
                style={tw`w-16 h-16 rounded-full`}
                source={ImgServiceImage}
                contentFit="contain"
              />
              <View>
                <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                  Elizabeth Olson
                </Text>

                <Text style={tw`font-LufgaRegular text-sm text-black`}>
                  Cristal comfort plan
                </Text>

                <View style={tw`flex-row gap-2 mt-1`}>
                  <Text style={tw`font-LufgaMedium text-xs text-subText pt-1`}>
                    Used: 1
                  </Text>
                  <Text style={tw`font-LufgaMedium text-xs text-subText pt-1`}>
                    Remaining: 2
                  </Text>
                  <Text
                    style={tw`font-LufgaSemiBold text-xs text-subText pt-1`}
                  >
                    Total: 3
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* ------------- provider name ------------ */}
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Provider
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl`}
            >
              <Image
                style={tw`w-16 h-16 rounded-full`}
                source={ImgBennerImage}
                contentFit="contain"
              />
              <View>
                <View style={tw`flex-row items-center gap-2`}>
                  <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                    Elizabeth Olson
                  </Text>
                  <Text
                    style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
                  >
                    12 order
                  </Text>
                </View>

                <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                  Cristal comfort plan
                </Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <SvgXml xml={IconRatingStar} />
                  <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                    4.0
                  </Text>
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    (8 reviews)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* ------------- provider name ------------ */}
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Billing information
            </Text>
            {/* input form */}

            {/*  ``````````````` name input ````````````` */}
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Full Name
            </Text>
            <View
              style={tw`w-full h-12  px-4 rounded-full border border-borderColor gap-3 `}
            >
              <TextInput
                defaultValue="John Doe"
                placeholder="Enter your Full Name"
                placeholderTextColor="#535353"
                style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
              />
            </View>

            {/*  ``````````````` Email input ````````````` */}
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Email
            </Text>
            <View
              style={tw`w-full h-12  px-4 rounded-full border border-borderColor gap-3 `}
            >
              <TextInput
                defaultValue="Jexample@gmail.com"
                placeholder="Enter your Email"
                placeholderTextColor="#535353"
                style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
              />
            </View>

            {/*  ``````````````` Location input ````````````` */}
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Location
            </Text>
            <View
              style={tw`w-full h-12  px-4 rounded-full border border-borderColor gap-3 `}
            >
              <TextInput
                defaultValue="New York, USA"
                placeholder="Enter your Location "
                placeholderTextColor="#535353"
                style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
              />
            </View>

            {/* ============================ enter your current location ============================ */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`mt-4 flex-row items-center gap-2 justify-center `}
            >
              <SvgXml xml={IconLocationPrimary} />
              <Text style={tw`font-LufgaMedium text-lg text-primaryBtn`}>
                Use my current location
              </Text>
            </TouchableOpacity>
          </View>

          {/* ==================== submit button ==================== */}

          <PrimaryButton
            onPress={() => {
              router.push(
                "/user_role_sections/placingAdminOrderService/adminOrderTimePlacing",
              );
            }}
            buttonText="Next"
            buttonContainerStyle={tw`mt-6 `}
            buttonTextStyle={tw`text-lg font-LufgaMedium`}
            rightIcon={IconRightArrow}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AdminPlacingOrder;
