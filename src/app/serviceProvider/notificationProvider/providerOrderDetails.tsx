import {
  IconCalendar,
  IconCrossWhite,
  IconProfileInactive,
  IconServiceName,
  IconSuccessIcon,
} from "@/assets/icons";
import { ImgProfileImg, ImgServiceImage } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import ProviderCard from "@/src/components/ProviderCard";
import { useRoleHooks } from "@/src/hooks/useRoleHooks";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SvgXml } from "react-native-svg";
// import { AppleMaps, GoogleMaps } from 'expo-maps';
const ProviderOrder = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { status } = useLocalSearchParams();
  const role = useRoleHooks();
  console.log(role, "role");
  console.log(status);

  const handleEditModalOpen = useCallback(async () => {
    editBottomSheetModalRef.current?.present();
  }, []);
  const handleEditModalClose = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
  }, []);

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
        <View style={tw`flex-row items-center gap-3 py-4`}>
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

        <View style={tw`my-4`}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={tw`h-60 w-full`}
            initialRegion={{
              latitude: 23.8103, // Dhaka center
              longitude: 90.4125,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
          >
            <Marker
              coordinate={{ latitude: 23.8103, longitude: 90.4125 }}
              title={"Dhaka"}
              description={"Capital of Bangladesh"}
            />
          </MapView>
        </View>

        {/* Check status  */}
        {status === "new_order" && (
          <View style={tw`pt-3  items-center flex-row gap-2 justify-between `}>
            <PrimaryButton
              buttonText="Decline"
              buttonContainerStyle={tw`bg-red-500 w-[48%]`}
              buttonTextStyle={tw`text-white text-base font-LufgaMedium`}
            />
            <PrimaryButton
              onPress={() => {
                role === "provider"
                  ? router.push(
                      "/serviceProvider/notificationProvider/serviceAssign"
                    )
                  : setIsModalVisible(true);
              }}
              buttonText={role === "provider" ? "Accept & Assign" : "Assign"}
              buttonContainerStyle={tw`bg-green-500 w-[48%]`}
              buttonTextStyle={tw`text-white text-base font-LufgaMedium`}
            />
          </View>
        )}
        {status === "pending" && (
          <View>
            <View
              style={tw`flex-row justify-between items-center gap-3 pt-3 pb-3`}
            >
              <Text style={tw`font-LufgaMedium text-black text-base`}>
                Assigned stuff
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push(
                    "/serviceProvider/notificationProvider/serviceAssign"
                  );
                }}
                style={tw`p-1.5 border border-subText rounded-xl`}
              >
                <Text style={tw`font-LufgaMedium text-black text-sm `}>
                  Change stuff
                </Text>
              </TouchableOpacity>
            </View>
            <MenuCard
              titleText="Mr. Lopez"
              subTitleText="Location goes here."
              image={ImgProfileImg}
              containerStyle={tw` bg-white`}
            />
            <PrimaryButton
              onPress={() => {
                router.push(
                  "/serviceProvider/notificationProvider/deliveryRequestSent"
                );
              }}
              buttonText="Send delivery request"
              buttonContainerStyle={tw`bg-transparent border border-gray-300 mt-5`}
              buttonTextStyle={tw`text-black text-base font-LufgaMedium`}
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
            <ProviderCard
              onPress={() => {
                handleEditModalOpen();
              }}
              image={ImgProfileImg}
              title="Mr. Lopez"
              // subTitle="Cleaner"
              ratings={4}
              // reviews={4}
              totalOrder={10}
              containerStyle={tw`bg-white`}
              disabled
            />
          </View>
        )}

        {status === "canceled" && (
          <View style={tw`gap-3`}>
            <Text style={tw`text-red-500 text-center font-LufgaMedium `}>
              Delivery request canceled
            </Text>
            <PrimaryButton
              onPress={() => {
                router.push(
                  "/serviceProvider/notificationProvider/deliveryRequestSent"
                );
              }}
              buttonText="Deliver again"
              buttonContainerStyle={tw`bg-transparent border border-gray-300`}
              buttonTextStyle={tw`text-black text-base font-LufgaMedium`}
            />
          </View>
        )}
      </ScrollView>

      {/*  ---------------------------  Modal --------------------------- */}

      <Modal
        animationType="fade"
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
              Order accepted
            </Text>
            <View style={tw`w-full`}>
              <PrimaryButton
                buttonText="Done"
                buttonTextStyle={tw`text-lg font-LufgaMedium`}
                onPress={() => {
                  setIsModalVisible(false);
                  // router.push("/user_role_sections/user_tabs/user_home");
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
          snapPoints={["50%"]}
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
                Review
              </Text>
              <TouchableOpacity onPress={() => handleEditModalClose()}>
                <SvgXml xml={IconCrossWhite} />
              </TouchableOpacity>
            </View>

            <View style={tw`px-5 mt-4 flex-1`}>
              <ProviderCard
                onPress={() => {
                  handleEditModalOpen();
                }}
                image={ImgProfileImg}
                title="Mr. Lopez"
                // subTitle="Cleaner"
                ratings={4}
                // reviews={4}
                totalOrder={10}
                containerStyle={tw`bg-white`}
                disabled
              />
              <Text style={tw`font-LufgaMedium text-base text-black`}>
                Review
              </Text>
              <Text style={tw`font-LufgaRegular text-sm text-black mt-2`}>
                Lorem ipsum dolor sit amet consectetur. Morbi volutpat urna
                justo odio enim mattis non velit vulputate. Porttitor a auctor
                sit eu. Laoreet nunc et nec dolor. Pharetra aliquet eu neque
                justo eget eget. Pharetra facilisis semper tempus fermentum.
                Maecenas urna sodales dapibus consectetur mi convallis. Lectus
                sit nam vel nunc congue nunc amet eros purus.
              </Text>
            </View>

            {/* ============================ submit button ============================ */}
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default ProviderOrder;
