import {
  IconCalendar,
  IconCrossWhite,
  IconProfileInactive,
  IconRatingStar,
  IconServiceName,
  IconSuccessIcon,
} from "@/assets/icons";
import { ImgPlaceholderProfile, ImgProfileImg } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import ProviderCard from "@/src/components/ProviderCard";
import LogoutModal from "@/src/context/LogoutModal";
import { useCheckLocation } from "@/src/hooks/useCheckLocation";
import { useGetProviderTypes, useRoleHooks } from "@/src/hooks/useRoleHooks";
import BackTitleButton from "@/src/lib/BackTitleButton";
import OrderDetailsStatusSkeleton from "@/src/lib/CustomSkeleton/OrderDetailsStatusSkeleton";
import { helpers } from "@/src/lib/helper/helpers";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useAcceptBookingMutation,
  useDeclineBookingMutation,
} from "@/src/redux/Api/providers/orders";
import { useGetBookingDetailsQuery } from "@/src/redux/Api/userRole/orderSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SvgXml } from "react-native-svg";
// import { AppleMaps, GoogleMaps } from 'expo-maps';
const ProviderOrder = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { status, booking_id } = useLocalSearchParams();
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [myCoords, setMyCoords] = useState<{
    lat: number;
    long: number;
  } | null>(null);
  const [trackedCoords, setTrackedCoords] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  // ============= hooks =============
  const toast = useToastHelpers();
  const role = useRoleHooks();
  const providerType = useGetProviderTypes();
  const { location, loading, error, getLocation } = useCheckLocation();

  // =============== get location ==================
  const handleGetLocation = async () => {
    const loc = await getLocation();
    setMyCoords({ lat: loc.latitude, long: loc.longitude });
  };

  // ================ api end point ================
  const { data: bookingDetails, isLoading: isBookingDetailsLoading } =
    useGetBookingDetailsQuery(booking_id as string);
  const [declineBooking, { isLoading: isDeclineLoading }] =
    useDeclineBookingMutation();
  const [acceptBooking, { isLoading: isAcceptLoading }] =
    useAcceptBookingMutation();

  useEffect(() => {
    handleGetLocation();
  }, []);

  useEffect(() => {
    if (
      bookingDetails?.data?.user?.latitude &&
      bookingDetails?.data?.user?.longitude
    ) {
      setTrackedCoords({
        lat: parseFloat(bookingDetails.data.user.latitude),
        long: parseFloat(bookingDetails.data.user.longitude),
      });
    }
  }, [bookingDetails]);

  // =============== accept order =================
  const handleAcceptOrder = async (booking_id: string) => {
    try {
      const res = await acceptBooking(booking_id).unwrap();
      if (res) {
        if (role === "PROVIDER" && providerType === "THIRDPARTY") {
          router.push({
            pathname: "/serviceProvider/notificationProvider/serviceAssign",
            params: { booking_id: booking_id },
          });
          toast.success("Accepted successfully", 3000);
        } else {
          setIsModalVisible(true);
        }
      }
    } catch (error: any) {
      console.log(error, " Accept failed!");
      toast.showError(error.message || "Accept failed!", 3000);
    }
  };

  // ================== handle decline ==================
  const handleDeclineOrder = async () => {
    try {
      await declineBooking(booking_id).unwrap();
      router.back();
    } catch (error: any) {
      console.log(error, "Your Decline Request Not success!");
    } finally {
      setIsDeclineModalVisible(false);
    }
  };

  if (isBookingDetailsLoading || loading) {
    return <OrderDetailsStatusSkeleton />;
  }

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-bgBaseColor `}
        contentContainerStyle={tw`pb-5 px-5`}
      >
        <BackTitleButton
          title={status as string}
          onPress={() => router.back()}
        />

        <View style={tw`flex-row items-center gap-3 pt-3`}>
          <SvgXml xml={IconServiceName} />
          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            Service name
          </Text>
        </View>
        <MenuCard
          titleText={bookingDetails?.data?.package?.title}
          subTitleText={helpers.formatDateTime(
            bookingDetails?.data?.created_at,
          )}
          image={bookingDetails?.data?.package?.icon}
          containerStyle={tw`bg-white`}
        />
        <View style={tw`flex-row items-center gap-3 pt-3`}>
          <SvgXml xml={IconProfileInactive} />
          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            User details
          </Text>
        </View>
        <MenuCard
          titleText={bookingDetails?.data?.billing?.name}
          subTitleText={bookingDetails?.data?.billing?.location}
          image={bookingDetails?.data?.user?.avatar}
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
              {bookingDetails?.data?.schedule_date} at{" "}
              {bookingDetails?.data?.schedule_time_from || ""} -{" "}
              {bookingDetails?.data?.schedule_time_to || "N/A"}
            </Text>
          </View>
        </View>
        {/* --------------------------- User Location  --------------------------- */}

        <View style={tw`my-4`}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={tw`h-60 w-full`}
            initialRegion={{
              latitude: 23.8103,
              longitude: 90.4125,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
          >
            {/* Your location — blue */}
            {myCoords && (
              <Marker
                coordinate={{
                  latitude: myCoords.lat,
                  longitude: myCoords.long,
                }}
                title="Your Location"
                description="Your current location"
                pinColor="blue"
              />
            )}

            {/* Tracked user — red */}
            {trackedCoords?.lat && trackedCoords?.long && (
              <Marker
                coordinate={{
                  latitude: trackedCoords.lat,
                  longitude: trackedCoords.long,
                }}
                title="Tracked User"
                pinColor="red"
              />
            )}
          </MapView>

          {loading && (
            <View
              style={tw`absolute inset-0 items-center justify-center bg-black/20`}
            >
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>

        {/* Check status  */}
        {(status === "new" || status === "new_booking") && (
          <View
            style={tw`pt-3  items-center mt-3 flex-row gap-2 justify-between `}
          >
            <PrimaryButton
              buttonText="Decline"
              buttonContainerStyle={tw`bg-red-500 h-10 w-[48%]`}
              buttonTextStyle={tw`text-white text-base font-LufgaMedium`}
              onPress={() => setIsDeclineModalVisible(true)}
            />
            <PrimaryButton
              onPress={() => {
                handleAcceptOrder(booking_id as string);
              }}
              buttonText={
                role === "PROVIDER" && providerType === "THIRDPARTY"
                  ? "Accept & Assign "
                  : "Accept"
              }
              buttonContainerStyle={tw`bg-green-500 h-10 w-[48%]`}
              buttonTextStyle={tw`text-white text-base font-LufgaMedium`}
              disabled={isAcceptLoading}
              loading={isAcceptLoading}
            />
          </View>
        )}
        {status === "pending" && (
          <View>
            {providerType === "THIRDPARTY" && (
              <View
                style={tw`flex-row justify-between items-center gap-3 pt-3 pb-3`}
              >
                <Text style={tw`font-LufgaMedium text-black text-base`}>
                  Assigned stuff
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname:
                        "/serviceProvider/notificationProvider/serviceAssign",
                      params: { booking_id: booking_id },
                    });
                  }}
                  style={tw`p-1.5 border border-subText rounded-xl`}
                >
                  <Text style={tw`font-LufgaMedium text-black text-sm `}>
                    Change stuff
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {bookingDetails?.data?.staff && (
              <MenuCard
                titleText={bookingDetails?.data?.staff?.name}
                subTitleText={bookingDetails?.data?.staff?.location}
                image={bookingDetails?.data?.staff?.image}
                containerStyle={tw`bg-white`}
              />
            )}
            <PrimaryButton
              onPress={() => {
                router.push({
                  pathname:
                    "/serviceProvider/notificationProvider/deliveryRequestSent",
                  params: { booking_id: booking_id },
                });
              }}
              buttonText="Send delivery request"
              buttonContainerStyle={tw`bg-transparent border border-gray-300 mt-5`}
              buttonTextStyle={tw`text-black text-base font-LufgaMedium`}
            />
          </View>
        )}

        {(status === "accepted_delivery_request" || status === "completed") && (
          <View
            style={tw`bg-gray-100 rounded-2xl px-4 py-4 flex-row justify-between items-center mt-4`}
          >
            <View style={tw`flex-row gap-2 justify-center items-center`}>
              {bookingDetails?.data?.staff && (
                <Image
                  source={bookingDetails?.data?.staff?.image}
                  style={tw`w-16 h-16 rounded-full`}
                  contentFit="cover"
                  placeholder={ImgPlaceholderProfile}
                />
              )}
              {/* Left Side */}
              <View>
                <Text style={tw`text-black text-base font-semibold mb-1`}>
                  Review
                </Text>

                <View style={tw`flex-row items-center`}>
                  <SvgXml xml={IconRatingStar} />
                  <Text style={tw`ml-1 text-black text-base font-medium`}>
                    {bookingDetails?.data?.rating?.rating || 0}
                  </Text>
                </View>
              </View>
            </View>
            {/* Right Button */}
            <TouchableOpacity
              style={tw`border border-gray-300 px-4 py-2 rounded-lg`}
              onPress={() => editBottomSheetModalRef.current?.present()}
              activeOpacity={0.7}
            >
              <Text style={tw`text-blue-600 font-medium`}>See review</Text>
            </TouchableOpacity>
          </View>
        )}

        {status === "decline_delivery_request" && (
          <View style={tw`gap-3`}>
            <Text style={tw`text-red-500 text-center font-LufgaMedium `}>
              Delivery request canceled
            </Text>
            <PrimaryButton
              onPress={() => {
                router.push({
                  pathname:
                    "/serviceProvider/notificationProvider/deliveryRequestSent",
                  params: { booking_id: booking_id },
                });
              }}
              buttonText="Deliver again"
              buttonContainerStyle={tw`bg-transparent border border-gray-300`}
              buttonTextStyle={tw`text-black text-base font-LufgaMedium`}
            />
          </View>
        )}
      </ScrollView>

      {/*  ---------------------------  accept Modal --------------------------- */}
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
                  router.push("/user_role_sections/user_tabs/user_home");
                }}
                buttonContainerStyle={tw`w-full`}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* ======================== decline modal ======================== */}
      <LogoutModal
        modalVisible={isDeclineModalVisible}
        setModalVisible={setIsDeclineModalVisible}
        buttonTitle="Decline"
        modalTitle="Order Decline"
        loading={isDeclineLoading}
        disabled={isDeclineLoading}
        onPress={() => {
          handleDeclineOrder();
        }}
      />

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
              <TouchableOpacity
                onPress={() => editBottomSheetModalRef.current?.dismiss()}
              >
                <SvgXml xml={IconCrossWhite} />
              </TouchableOpacity>
            </View>

            <View style={tw`px-5 mt-4 flex-1`}>
              {bookingDetails?.data?.staff && (
                <ProviderCard
                  onPress={() => {
                    editBottomSheetModalRef.current?.present();
                  }}
                  image={ImgProfileImg}
                  title={bookingDetails?.data?.staff?.name}
                  subTitle={bookingDetails?.data?.staff?.email}
                  ratings={bookingDetails?.data?.rating?.rating || 0}
                  // reviews={4}
                  totalOrder={
                    bookingDetails?.data?.rating?.order_completed || 0
                  }
                  containerStyle={tw`bg-white`}
                  disabled
                />
              )}
              <Text style={tw`font-LufgaMedium text-base text-black`}>
                Review
              </Text>
              <Text style={tw`font-LufgaRegular text-sm text-black mt-2`}>
                {bookingDetails?.data?.rating?.review}
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
