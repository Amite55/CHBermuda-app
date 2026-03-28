import {
  IconCrossRed,
  IconCrossWhite,
  IconPendingStatus,
  IconRightCornerArrowWhite,
  IconSuccess,
  IconTellPhone,
} from "@/assets/icons";
import BookingDetailsBilingInfo from "@/src/components/BookingDetailsBilingInfo";
import MenuCard from "@/src/components/MenuCard";
import ProviderCard from "@/src/components/ProviderCard";
import LogoutModal from "@/src/context/LogoutModal";
import BackTitleButton from "@/src/lib/BackTitleButton";
import OrderDetailsStatusSkeleton from "@/src/lib/CustomSkeleton/OrderDetailsStatusSkeleton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useAddRatingsMutation } from "@/src/redux/Api/ratingsSlices";
import { useGetThirdPartyProviderDetailsQuery } from "@/src/redux/Api/userHomeSlices";
import {
  useAcceptDeliveryRequestMutation,
  useCancelBookingMutation,
  useDeclineDeliveryRequestMutation,
  useGetAdminProviderDetailsQuery,
  useGetBookingDetailsQuery,
  useGetDeliveryRequestDetailsQuery,
} from "@/src/redux/Api/userRole/orderSlices";
import { callPadLinkingFunction } from "@/src/utils/callPadLinkingFunction";
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
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";

const OrderDetailsStatus = () => {
  const [rating, setRating] = useState(0);
  const { status, id, request_id } = useLocalSearchParams();
  const ratingBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [review, setReview] = useState("");
  const toast = useToastHelpers();

  //  ============ booking status label ===========
  const statusLabelMap = {
    booking_approved: "Booking Approved",
    booking_cancelled: "Booking Cancelled",
    new_booking: "New Booking",
    new_delivery_request: "New Delivery Request",
    decline_delivery_request: "Decline Delivery Request",
    accepted_delivery_request: "Accepted Delivery Request",
  };
  const label =
    statusLabelMap[status as keyof typeof statusLabelMap] || "Order Details";
  const isDeliveryRequest = status === "new_delivery_request";

  // ================== api end point ==================
  const { data: orderDetails, isLoading: isOrderDetailsLoading } =
    useGetBookingDetailsQuery(id);
  const { data: deliveryRequestDetails, isLoading: isDeliveryRequestLoading } =
    useGetDeliveryRequestDetailsQuery(request_id, {
      skip: !isDeliveryRequest,
    });
  const {
    data: thirdPartyProviderDetails,
    isLoading: isThirdPartyProviderDetailsLoading,
  } = useGetThirdPartyProviderDetailsQuery(orderDetails?.data?.provider?.id);
  const {
    data: adminProviderDetails,
    isLoading: isAdminProviderDetailsLoading,
  } = useGetAdminProviderDetailsQuery(orderDetails?.data?.provider?.id);
  const [cancelOrder, { isLoading: isCancelOrderLoading }] =
    useCancelBookingMutation();
  const [
    declineDeliveryRequest,
    { isLoading: isDeclineDeliveryRequestLoading },
  ] = useDeclineDeliveryRequestMutation();
  const [acceptDeliveryRequest, { isLoading: isAcceptDeliveryRequestLoading }] =
    useAcceptDeliveryRequestMutation();
  const [addRating, { isLoading: isAddRatingLoading }] =
    useAddRatingsMutation();

  // ================== get provider data ================
  let providerData;
  switch (orderDetails?.data?.booking_type) {
    case "thirdparty_booking":
      providerData = thirdPartyProviderDetails?.data?.provider;
      break;
    case "admin_booking":
      providerData = adminProviderDetails?.data?.provider;
      break;
  }

  // ================= decline delivery request function ================
  const handleDeclineDeliveryRequest = async () => {
    try {
      await declineDeliveryRequest(request_id).unwrap();
      toast.success("Delivery request declined successfully", 3000);
      router.replace("/user_role_sections/user_tabs/user_home");
    } catch (error: any) {
      console.log(error, "Your Decline Request Not success!");
      toast.showError("Your Decline Request Not success!", 3000);
    }
  };

  // =============== accept delivery request function ================
  const handleAcceptDeliveryRequest = async () => {
    try {
      await acceptDeliveryRequest(request_id).unwrap();
      ratingBottomSheetModalRef.current?.present();
    } catch (error: any) {
      console.log(error, "Your Request Not success!");
      toast.showError("Your Request Not success! please try again", 3000);
    }
  };

  //  ============review and rating function ===========
  const handleReviewAndRating = async () => {
    try {
      const data = {
        rating: rating,
        review: review,
        booking_id: id,
        provider_id: orderDetails?.data?.provider?.id,
      };
      await addRating(data).unwrap();
      toast.success("Your review and rating successfully", 3000);
      ratingBottomSheetModalRef.current?.dismiss();
      router.push("/user_role_sections/user_tabs/user_home");
    } catch (error: any) {
      console.log(error, "Not summit your request !");
    }
  };
  // =========== cancel order function ===========
  const handleCancelOrder = () => {
    try {
      cancelOrder(id).unwrap();
      setIsCancelModalVisible(false);
      toast.success("Your order cancel successfully", 3000);
      router.replace("/user_role_sections/user_tabs/user_home");
    } catch (error: any) {
      console.log(error, "Your order cancel failed------>");
      toast.showError(
        error?.message || error || "Your order cancel failed",
        3000,
      );
    }
  };

  // ==================  loading skeleton ==================
  if (
    isAdminProviderDetailsLoading ||
    isOrderDetailsLoading ||
    isThirdPartyProviderDetailsLoading ||
    (isDeliveryRequest && isDeliveryRequestLoading)
  ) {
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
        <BackTitleButton title={label} onPress={() => router.back()} />

        {/* ============== Order Details Status ============== */}
        <View>
          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            Service
          </Text>
          {status === "completed" ? (
            <MenuCard
              titleText={orderDetails?.data?.package?.title}
              subTitleText="Order Completed"
              subTitleStyle={tw`border px-4 py-1.5 text-center rounded-xl border-green-500 text-green-500`}
              image={orderDetails?.data?.package?.icon}
              containerStyle={tw` bg-white`}
            />
          ) : (
            <MenuCard
              titleText={orderDetails?.data?.package?.title}
              subTitleText={`Number of order in this month: ${orderDetails?.data?.order_in_this_month || 0}`}
              image={orderDetails?.data?.package?.icon}
              containerStyle={tw` bg-white`}
            />
          )}
          {/* = ----------------- provider content ---------------- */}
          <View style={tw`flex-row items-center justify-between pt-6 pb-3`}>
            <Text style={tw`font-LufgaSemiBold text-base text-black`}>
              Provider
            </Text>
          </View>

          <ProviderCard
            containerStyle={tw`bg-white`}
            image={providerData?.avatar}
            title={providerData?.name}
            subTitle={orderDetails?.data?.package?.title}
            ratings={providerData?.avg_rating || 0}
            reviews={providerData?.total_reviews || 0}
            totalOrder={providerData?.completed_orders || 0}
          />

          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            Billing information
          </Text>

          {/* ==================== user info details ================== */}
          <BookingDetailsBilingInfo
            email={orderDetails?.data?.billing?.email}
            location={orderDetails?.data?.billing?.location}
            name={orderDetails?.data?.billing?.name}
          />

          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            Scheduled time
          </Text>
          {/* ==================== Scheduled time ================== */}
          <View style={tw` bg-white p-3 rounded-2xl`}>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>
              {orderDetails?.data?.schedule_date}
            </Text>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              {orderDetails?.data?.schedule_time_from} -{" "}
              {orderDetails?.data?.schedule_time_to}
            </Text>
          </View>
          {/* ================== delivery request ================ */}
          {isDeliveryRequest && (
            <View>
              <Text style={tw`font-LufgaSemiBold text-base text-black pt-4`}>
                Photo
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={deliveryRequestDetails?.data?.files}
                contentContainerStyle={tw`py-3 gap-4 pr-2`}
                renderItem={({ item }) => {
                  return (
                    <Image source={item} style={tw`w-28 h-28 rounded-xl`} />
                  );
                }}
              />
              <Text style={tw`font-LufgaSemiBold text-base text-black py-2`}>
                Message
              </Text>
              <View style={tw`py-4 bg-white rounded-xl min-h-36`}>
                <Text style={tw`font-LufgaRegular text-sm text-black px-3`}>
                  {deliveryRequestDetails?.data?.message}
                </Text>
              </View>
              {/* =- status way botton =     */}
              <View style={tw`flex-row justify-center gap-2 mt-8`}>
                <PrimaryButton
                  buttonText="Decline"
                  buttonTextStyle={tw`text-sm`}
                  disabled={isDeclineDeliveryRequestLoading}
                  loading={isDeclineDeliveryRequestLoading}
                  buttonContainerStyle={tw`h-10 bg-red-700 flex-1`}
                  onPress={() => {
                    handleDeclineDeliveryRequest();
                  }}
                />
                <PrimaryButton
                  buttonText="Accept"
                  buttonTextStyle={tw`text-sm`}
                  buttonContainerStyle={tw`h-10 bg-green-700 flex-1`}
                  onPress={() => {
                    handleAcceptDeliveryRequest();
                  }}
                  disabled={isAcceptDeliveryRequestLoading}
                  loading={isAcceptDeliveryRequestLoading}
                />
              </View>
            </View>
          )}

          {/* ========================== status ways details ================ */}
          {status === "new_booking" && (
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
                onPress={() => {
                  setIsCancelModalVisible(true);
                }}
              />
            </View>
          )}

          {/* ====================== ongoing or complete status details ================ */}
          {orderDetails?.data?.booking_type === "thirdparty_booking" &&
            (status === "booking_approved" || status === "completed") && (
              <View>
                <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
                  Assigned stuff
                </Text>
                <MenuCard
                  titleText={orderDetails?.data?.staff?.name}
                  subTitleText={orderDetails?.data?.staff?.phone}
                  image={orderDetails?.data?.staff?.image}
                  containerStyle={tw` bg-white`}
                  endIcon={status === "booking_approved" && IconTellPhone}
                  endIconOnPress={() => {
                    callPadLinkingFunction(orderDetails?.data?.staff?.phone);
                  }}
                />
              </View>
            )}

          {/* ================= cancel status details ================ */}
          {status === "booking_canceled" && (
            <TouchableOpacity
              disabled
              style={tw`flex-row justify-center items-center gap-2 py-3`}
            >
              <Text style={tw`font-LufgaRegular text-lg text-red-600`}>
                Your Booking Cancel!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {/* =============================== place order details modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ratingBottomSheetModalRef}
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
                Feedback
              </Text>
              <TouchableOpacity
                onPress={() => ratingBottomSheetModalRef.current?.dismiss()}
              >
                <SvgXml xml={IconCrossWhite} />
              </TouchableOpacity>
            </View>

            {/* = ----------------- plan content ---------------- */}
            <View
              style={tw`rounded-3xl bg-white px-4 py-4 flex-grow justify-between`}
            >
              <View style={tw`justify-center items-center gap-2`}>
                <SvgXml xml={IconSuccess} />
                <Text style={tw`font-LufgaMedium text-black text-lg `}>
                  Delivery request accepted
                </Text>

                {/* ------------- rating section ------------- */}
                <Text style={tw`font-LufgaRegular text-black text-base mt-4`}>
                  Share your experience with John Doe
                </Text>
                {!!rating && (
                  <Text
                    style={tw`font-LufgaSemiBold text-black text-lg border border-black rounded-full px-4 py-1`}
                  >
                    {rating === 1
                      ? "Poor"
                      : rating === 2
                        ? "Good"
                        : rating === 3
                          ? "Better"
                          : rating === 4
                            ? "Best"
                            : "Excellent"}
                  </Text>
                )}
                {/* ---------------------- input user rating ---------------- */}
                <StarRating
                  starSize={30}
                  color="#F9A21E"
                  rating={rating}
                  onChange={(val) => setRating(Math.round(val))}
                />

                {/* ------------------ user feedback description ---------------- */}
                <BottomSheetTextInput
                  multiline
                  placeholder="Write a review"
                  placeholderTextColor={"#535353"}
                  textAlignVertical="top"
                  style={tw`font-LufgaRegular text-black text-base mt-4 bg-bgBaseColor w-full rounded-2xl p-3 h-28`}
                  numberOfLines={8}
                  onChangeText={(text) => setReview(text)}
                />
              </View>

              {/* = ----------------- button content ---------------- */}
              <PrimaryButton
                onPress={() => {
                  handleReviewAndRating();
                }}
                buttonText="Done"
                buttonTextStyle={tw`text-sm`}
                rightIcon={IconRightCornerArrowWhite}
                loading={isAddRatingLoading}
                disabled={isAddRatingLoading}
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      {/* ================== order cancel modal ================ */}
      <LogoutModal
        modalVisible={isCancelModalVisible}
        setModalVisible={setIsCancelModalVisible}
        buttonTitle="Delete"
        modalTitle="Are You Sure? Cancel your order?"
        loading={isCancelOrderLoading}
        disabled={isCancelOrderLoading}
        onPress={() => {
          handleCancelOrder();
        }}
      />
    </>
  );
};

export default OrderDetailsStatus;
