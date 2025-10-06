import {
  IconCrossWhite,
  IconEditPen,
  IconLocationPrimary,
  IconOrderPlaceWhite,
  IconRatingStar,
  IconRightArrow,
} from "@/assets/icons";
import { ImgBennerImage, ImgServiceImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const confirmDetailsProviderPlacingOrder = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleEditModalOpen = useCallback(async () => {
    editBottomSheetModalRef.current?.present();
  }, []);
  const handleEditModalClose = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
  }, []);
  return (
    <BottomSheetModalProvider>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-bgBaseColor`}
        contentContainerStyle={tw`pb-3 px-5 flex-grow justify-between`}
      >
        <View>
          <BackTitleButton
            title="Placing order"
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

              <View style={tw`flex-row items-center gap-3 `}>
                <Text style={tw`font-LufgaMedium text-xs text-subText pt-1`}>
                  Duration: 1 hours
                </Text>
                <Text style={tw`font-LufgaSemiBold text-sm text-black pt-1`}>
                  price: $351.00
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ------------- provider name ------------ */}
          <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
            Provider
          </Text>
          {/* =--------------------------- provider info --------------------------- */}
          <View style={tw`bg-white  rounded-xl mt-2  py-2 `}>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled
              style={tw`flex-row items-center gap-4 px-5 py-4 `}
            >
              <View style={tw`relative`}>
                <Image
                  style={tw`w-16 h-16 rounded-full`}
                  source={ImgBennerImage}
                  contentFit="contain"
                />
                <View
                  style={tw`w-2 h-2 bg-green-600 rounded-full absolute top-0 right-0`}
                />
              </View>
              <View>
                <View style={tw`flex-row items-center gap-2`}>
                  <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                    Light cleaning
                  </Text>
                  <Text
                    style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
                  >
                    12 order
                  </Text>
                </View>

                <View style={tw`flex-row items-center gap-2 mt-1`}>
                  <Text style={tw`font-LufgaMedium text-sm text-subText`}>
                    Light cleaning
                  </Text>
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    $49.00
                  </Text>
                </View>
                {/* ================== profile total review ================ */}
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
              {/* ================== date and time =============== */}
            </TouchableOpacity>
            <View
              style={tw`bg-slate-100 py-3 items-center rounded-xl gap-1 mx-2`}
            >
              <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                Mon, Aug 27, 2025
              </Text>
              <Text style={tw`font-LufgaRegular text-sm text-black`}>
                02:00 PM - 11:00 PM
              </Text>
            </View>
          </View>
          {/* ------------- provider name ------------ */}
          <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
            Billing information
          </Text>
          <View style={tw`px-5 py-4 bg-white  rounded-xl mt-1`}>
            {/* name */}
            <View style={tw`flex-row items-center justify-between `}>
              <View>
                <Text style={tw`font-LufgaMedium text-lg text-black`}>
                  Name
                </Text>
                <Text style={tw`font-LufgaRegular text-base text-subText`}>
                  Mr. Lopez
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleEditModalOpen()}
                activeOpacity={0.7}
              >
                <SvgXml xml={IconEditPen} />
              </TouchableOpacity>
            </View>
            {/* email */}
            <View>
              <Text style={tw`font-LufgaMedium text-lg text-black`}>Email</Text>
              <Text style={tw`font-LufgaRegular text-base text-subText`}>
                example@gmail.com
              </Text>
            </View>
            {/* location */}

            <View>
              <Text style={tw`font-LufgaMedium text-lg text-black`}>
                Location
              </Text>
              <Text style={tw`font-LufgaRegular text-base text-subText`}>
                Dhaka, Bangladesh
              </Text>
            </View>
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
            router.push("/user_role_sections/paymentSystem");
          }}
          buttonText="Next"
          rightIcon={IconRightArrow}
          buttonContainerStyle={tw`mt-6 `}
          buttonTextStyle={tw`text-lg font-LufgaMedium`}
        />
      </ScrollView>
      {/* -0---------------------------- order address edit modal --------------------------- */}

      <BottomSheetModal
        ref={editBottomSheetModalRef}
        snapPoints={["70%", "90%"]}
        containerStyle={tw`bg-gray-500 bg-opacity-20`}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetScrollView
          contentContainerStyle={tw`bg-white pb-5`}
          showsVerticalScrollIndicator={false}
        >
          {/* ---------- header ---------- */}
          <View
            style={tw`flex-row items-center justify-between bg-primaryBtn py-2 px-4 rounded-t-2xl`}
          >
            <View />
            <Text style={tw`font-LufgaMedium text-sm text-white`}>
              Edit Info
            </Text>
            <TouchableOpacity onPress={() => handleEditModalClose()}>
              <SvgXml xml={IconCrossWhite} />
            </TouchableOpacity>
          </View>

          {/* ---------- input form ---------- */}
          <View style={tw`px-5 mt-4`}>
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Full Name
            </Text>
            <View
              style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
            >
              <BottomSheetTextInput
                defaultValue="John Doe"
                placeholder="Enter your Full Name"
                placeholderTextColor="#535353"
                style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
              />
            </View>

            <Text style={tw`font-LufgaMedium text-base text-regularText mt-4`}>
              Email
            </Text>
            <View
              style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
            >
              <BottomSheetTextInput
                defaultValue="example@gmail.com"
                placeholder="Enter your Email"
                placeholderTextColor="#535353"
                style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
              />
            </View>

            <Text style={tw`font-LufgaMedium text-base text-regularText mt-4`}>
              Location
            </Text>
            <View
              style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
            >
              <BottomSheetTextInput
                defaultValue="Dhaka, Bangladesh"
                placeholder="Enter your Location"
                placeholderTextColor="#535353"
                style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
              />
            </View>
          </View>

          {/* ---------- submit button ---------- */}
          <PrimaryButton
            onPress={() => handleEditModalClose()}
            buttonText="Save changes"
            buttonContainerStyle={tw`my-5 mx-5`}
            buttonTextStyle={tw`text-base font-LufgaMedium`}
            leftIcon={IconOrderPlaceWhite}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default confirmDetailsProviderPlacingOrder;
