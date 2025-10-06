import {
  IconCrossWhite,
  IconEditPen,
  IconLocationPrimary,
  IconOrderPlaceWhite,
  IconRatingStar,
  IconSuccessIcon,
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
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const ConfirmDetailsAdminOrders = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditModalOpen = useCallback(async () => {
    editBottomSheetModalRef.current?.present();
  }, []);
  const handleEditModalClose = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
  }, []);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-3 px-5 flex-grow justify-between`}
    >
      <View>
        <BackTitleButton title="Placing order" onPress={() => router.back()} />
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

            <View style={tw`flex-row items-center gap-2 mt-1`}>
              <Text style={tw`font-LufgaMedium text-xs text-subText pt-1`}>
                Used: 1
              </Text>
              <Text style={tw`font-LufgaMedium text-xs text-subText pt-1`}>
                Remaining: 2
              </Text>
              <Text style={tw`font-LufgaSemiBold text-xs text-subText pt-1`}>
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
          disabled
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
        <View style={tw`px-5 py-4 bg-white  rounded-xl mt-1`}>
          {/* name */}
          <View style={tw`flex-row items-center justify-between `}>
            <View>
              <Text style={tw`font-LufgaMedium text-lg text-black`}>Name</Text>
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

        {/* ================================= selected date     ============================= */}
        <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
          Scheduled time
        </Text>
        <View style={tw`px-5 py-4 bg-white  rounded-xl mt-1`}>
          <Text style={tw`font-LufgaMedium text-lg text-black`}>
            Mon, Aug 27, 2025
          </Text>
          <Text style={tw`font-LufgaRegular text-base text-subText`}>
            02:00 PM - 11:00 PM
          </Text>
        </View>
      </View>

      {/* ==================== submit button ==================== */}
      <PrimaryButton
        onPress={() => {
          setIsModalVisible(true);
        }}
        buttonText="Place order"
        buttonContainerStyle={tw`mt-6 `}
        buttonTextStyle={tw`text-lg font-LufgaMedium`}
        leftIcon={IconOrderPlaceWhite}
      />

      {/* ============================ logout modal =========================== */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={tw`flex-1 justify-center bg-black bg-opacity-50 px-5`}>
          <View
            style={[
              tw`bg-white  justify-center items-center rounded-2xl p-6 h-88 gap-2`,
            ]}
          >
            <SvgXml xml={IconSuccessIcon} />
            <Text style={tw`font-LufgaBold text-xl text-[#172B4D]`}>
              Order placed
            </Text>
            <Text
              style={tw`text-center font-LufgaRegular  text-sm text-black my-2`}
            >
              Your order has been placed. Please be patient until it’s accepted
              from provider side.
            </Text>
            <View style={tw`w-full`}>
              <PrimaryButton
                buttonText="Go to home"
                buttonTextStyle={tw`text-lg font-LufgaMedium`}
                onPress={() => {
                  setIsModalVisible(false);
                  router.push("/user_role_sections/user_tabs/user_home");
                }}
                buttonContainerStyle={tw`w-full`}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* -0---------------------------- order address edit modal --------------------------- */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={editBottomSheetModalRef}
          snapPoints={["100%"]}
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
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-white`}>
            {/* ----------------- header title part ---------------- */}
            <View
              style={tw`flex-row items-center justify-between bg-primaryBtn py-2 px-4 rounded-t-2xl`}
            >
              <View />
              <Text style={tw`font-LufgaMedium text-sm text-white`}>
                Feedback
              </Text>
              <TouchableOpacity onPress={() => handleEditModalClose()}>
                <SvgXml xml={IconCrossWhite} />
              </TouchableOpacity>
            </View>

            <View style={tw`px-5 mt-4 flex-1`}>
              {/* ----------------- input form ---------------- */}
              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-2`}
              >
                Billing information
              </Text>
              {/* input form */}

              {/*  ``````````````` name input ````````````` */}
              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-2`}
              >
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
              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-2`}
              >
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
              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-2`}
              >
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

            {/* ============================ submit button ============================ */}
            <PrimaryButton
              onPress={() => handleEditModalClose()}
              buttonText="Save changes"
              buttonContainerStyle={tw`my-4 mx-5`}
              buttonTextStyle={tw`text-lg font-LufgaMedium`}
              leftIcon={IconOrderPlaceWhite}
            />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ScrollView>
  );
};

export default ConfirmDetailsAdminOrders;
