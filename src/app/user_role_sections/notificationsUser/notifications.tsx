import { IconCrossWhite, IconRightCornerArrowWhite } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/image";
import { NotificationData } from "@/src/components/AllData";
import MenuCard from "@/src/components/MenuCard";
import NotificationCard from "@/src/components/NotificationCard";
import ProviderCard from "@/src/components/ProviderCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Notifications = () => {
  const placeBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [notificationStatus, setNotificationStatus] = React.useState("");

  const handlePlaceModalOpen = useCallback(async () => {
    placeBottomSheetModalRef.current?.present();
  }, []);
  const handlePlaceModalClose = useCallback(() => {
    placeBottomSheetModalRef.current?.dismiss();
  }, []);
  return (
    <View style={tw`flex-1 bg-bgBaseColor`}>
      <FlatList
        data={NotificationData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 flex-grow `}
        ListHeaderComponent={() => {
          return (
            <BackTitleButton
              title="Notifications"
              onPress={() => router.back()}
            />
          );
        }}
        renderItem={(item) => (
          <NotificationCard
            onPress={() => {
              item?.item?.status === "delivered"
                ? router.push({
                    pathname:
                      "/user_role_sections/notificationsUser/deliveryRequest",
                    params: { status: notificationStatus },
                  })
                : handlePlaceModalOpen();
              setNotificationStatus(item.item.status);
            }}
            title={item.item.title}
            description={item.item.description}
            time={item.item.time}
            icon={item.item.icon}
          />
        )}
      />

      {/* =============================== place order details modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={placeBottomSheetModalRef}
          snapPoints={["80%"]}
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
                Order placed
              </Text>
              <TouchableOpacity onPress={() => handlePlaceModalClose()}>
                <SvgXml xml={IconCrossWhite} />
              </TouchableOpacity>
            </View>

            {/* = ----------------- plan content ---------------- */}
            <View
              style={tw`rounded-3xl bg-white px-4 py-6 flex-grow justify-between`}
            >
              <View>
                <Text style={tw`font-LufgaSemiBold text-base text-black`}>
                  Service
                </Text>
                <MenuCard
                  titleText="Crystal Comfort Plan"
                  subTitleText="Number of order in this month: 2"
                  image={ImgProfileImg}
                  containerStyle={tw` bg-bgBaseColor`}
                />
                {/* = ----------------- provider content ---------------- */}
                <Text style={tw`font-LufgaSemiBold text-base text-black pt-6`}>
                  Provider
                </Text>
                <ProviderCard
                  containerStyle={tw`bg-bgBaseColor`}
                  image={ImgProfileImg}
                  title="John Doe"
                  subTitle="Crystal Comfort Plan"
                  ratings={4.5}
                  reviews={10}
                  totalOrder={12}
                />
              </View>

              {/* = ----------------- button content ---------------- */}
              <PrimaryButton
                onPress={() => {
                  handlePlaceModalClose();
                  router.push({
                    pathname:
                      "/user_role_sections/notificationsUser/orderDetailsStatus",
                    params: { status: notificationStatus },
                  });
                }}
                buttonText="See full details"
                buttonTextStyle={tw`text-sm`}
                rightIcon={IconRightCornerArrowWhite}
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Notifications;
