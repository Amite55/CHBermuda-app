import {
  IconCrossWhite,
  IconEditPen,
  IconOrderPlaceWhite,
  IconRatingStar,
} from "@/assets/icons";
import { ImgPlaceholderProfile, ImgSplashLogo } from "@/assets/image";
import BookingSuccessModal from "@/src/context/BookingSuccessModal";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useCreatePaymentIntentMutation } from "@/src/redux/Api/paymentSlices";
import {
  useBookingSubscriptionMutation,
  useBookingSuccessRespiteCareMutation,
  useBookingSuccessThirdPartyMutation,
} from "@/src/redux/Api/userRole/orderSlices";
import {
  resetBooking,
  updateBooking,
} from "@/src/redux/appStore/bookingSlices";
import { UserInfoFormType } from "@/src/redux/CommonTypes/BookingTypes";
import { buildBookingPayload } from "@/src/utils/buildAddonsPayload";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { userValidationSchema } from "@/src/validationSchema/userValidationSchema";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useStripe } from "@stripe/stripe-react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
// ================= user form type =================

const ConfirmDetailsAdminOrders = () => {
  const editBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const booking = useSelector((state: any) => state.booking);
  const dispatch = useDispatch();
  const toast = useToastHelpers();

  // =================== api end point ==================
  const [createPaymentIntent, { isLoading: isCreatingPaymentIntentLoading }] =
    useCreatePaymentIntentMutation();
  const [
    bookingSuccessRespiteCare,
    { isLoading: isBookingSuccessRespiteCareLoading },
  ] = useBookingSuccessRespiteCareMutation();
  const [
    bookingSuccessThirdParty,
    { isLoading: isBookingSuccessThirdPartyLoading },
  ] = useBookingSuccessThirdPartyMutation();
  const [bookingSubscription, { isLoading: isBookingSubscriptionLoading }] =
    useBookingSubscriptionMutation();

  const bookingData = buildBookingPayload(booking);

  const handlePlaceOrder = async () => {
    const type = booking?.booking_type;
    const hasSubscription = !!booking?.subscriptionId;

    if (type === "respite_care") {
      // -------- this booking always payment --------
      await handleStripePayment("respite_care");
    } else if (type === "thirdparty_booking" && !hasSubscription) {
      // ============ have't subscription to payment ===========
      await handleStripePayment("thirdparty_booking");
    } else if (
      (type === "thirdparty_booking" && hasSubscription) ||
      type === "admin_booking"
    ) {
      // if have subscription to payment =============
      await handleSubscriptionBooking();
    }
  };

  // ================ booking data handler =================
  const handleStripePayment = async (
    bookingType: "respite_care" | "thirdparty_booking",
  ) => {
    try {
      const amount =
        bookingType === "respite_care"
          ? Number(booking?.amount)
          : Number(booking?.packageInfo?.price);

      const responseIntent = await createPaymentIntent({
        amount,
        currency: "USD",
      }).unwrap();
      if (!responseIntent?.data?.client_secret) {
        toast.warning("Something went wrong please try again", 3000);
        return;
      }
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        paymentIntentClientSecret: responseIntent.data.client_secret,
      });
      if (initError) {
        toast.showError(initError?.message || "Payment init failed");
        return;
      }

      // ==================== call payment modal ===================
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        toast.showError(paymentError?.message || "Payment failed");
        return;
      }
      const intentId = responseIntent?.data?.id;
      // ── Payment success → booking type wise API call ──----------------
      await handleAfterPaymentSuccess(bookingType, intentId);
    } catch (error) {
      console.error("Stripe payment failed:", error);
    }
  };

  // ================= when if open the stripe payment sheet to call this this function ================
  const handleAfterPaymentSuccess = async (
    bookingType: "respite_care" | "thirdparty_booking",
    intentId: string,
  ) => {
    try {
      let response;
      // ============= call api for respite care and third party ===========
      if (bookingType === "respite_care") {
        response = await bookingSuccessRespiteCare({
          ...bookingData,
          payment_intent_id: intentId,
        }).unwrap();
      } else {
        response = await bookingSuccessThirdParty({
          ...bookingData,
          payment_intent_id: intentId,
        }).unwrap();
      }
      // ========= if this booking success then show success message ===========
      if (response) {
        setIsModalVisible(true);
      }
    } catch (error: any) {
      console.log(error, "Payment not success in your subscription------>");
    }
  };
  // =========== subscriptions booking handler ===========
  const handleSubscriptionBooking = async () => {
    try {
      const response = await bookingSubscription(bookingData).unwrap();

      if (response) {
        // toast.success(response?.message || "Booking successful!", 3000);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Subscription booking failed:", error);
    }
  };

  // ===================== set redux store for user form data =======================
  const handleStateBookingData = (userInfo: UserInfoFormType) => {
    try {
      dispatch(
        updateBooking({
          userInfo: {
            name: userInfo.fullName,
            email: userInfo.email,
            location: userInfo.location,
          },
        }),
      );
      editBottomSheetModalRef.current?.dismiss();
    } catch (error) {
      console.log(error, "redux not stored------->");
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw` px-5 flex-grow justify-between`}
    >
      <View>
        <BackTitleButton title="Placing order" onPress={() => router.back()} />
        {/* ------------- service name ------------ */}
        <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
          Services
        </Text>
        {/* ============= if respite care and admin service - service card ============== */}
        {booking?.booking_type === "respite_care" && (
          <View
            style={tw`flex-1 flex-row items-center gap-2 px-4 py-3 bg-white  rounded-xl`}
          >
            <Image
              style={tw`w-16 h-16 rounded-full`}
              source={booking?.respiteCarePackageDetails?.respiteCareImage}
              contentFit="cover"
              placeholder={ImgSplashLogo}
            />
            <View style={tw`flex-1 `}>
              <View style={tw` flex-1 flex-row  items-center gap-2`}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={tw`font-LufgaMedium text-base text-regularText flex-1`}
                >
                  {booking?.respiteCarePackageDetails?.name}
                </Text>
                <Text
                  style={tw`  font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
                >
                  {booking?.respiteCarePackageDetails?.addons?.length || 0}{" "}
                  addons
                </Text>
              </View>

              <View style={tw`flex-row items-center gap-1`}>
                <Text
                  style={tw`font-LufgaRegular text-sm items-center text-black`}
                >
                  Total price :{" "}
                </Text>
                <Text style={tw`font-LufgaBold text-base`}>
                  ${Number(booking?.amount || 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}
        {/* ------------------- if third party provider exist =================== */}
        {(booking?.booking_type === "thirdparty_booking" ||
          booking?.booking_type === "admin_booking") && (
          <View
            style={tw` flex-row items-center gap-2 px-4 py-3 bg-white  rounded-xl`}
          >
            <Image
              style={tw`w-16 h-16 rounded-full`}
              source={booking?.packageInfo?.servicePackageImage}
              contentFit="cover"
              placeholder={ImgSplashLogo}
            />
            <View style={tw`flex-1 `}>
              <View style={tw` flex-1 flex-row  items-center  gap-2`}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={tw`font-LufgaMedium text-base text-regularText flex-1`}
                >
                  {booking?.packageInfo?.title}
                </Text>
              </View>

              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                  Duration: {booking?.packageInfo?.duration} hours
                </Text>
                <Text
                  style={tw`font-LufgaMedium text-sm items-center text-black pl-2`}
                >
                  Price :
                </Text>
                <Text style={tw`font-LufgaBold text-base`}>
                  ${Number(booking?.packageInfo?.price || 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ------------- provider name ------------ */}
        {(booking?.booking_type === "thirdparty_booking" ||
          booking?.booking_type === "admin_booking") && (
          <View>
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Provider
            </Text>
            <View
              style={tw` flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl`}
            >
              <Image
                style={tw`w-16 h-16 rounded-full`}
                source={booking?.providerInfo?.providerImage}
                contentFit="contain"
                placeholder={ImgPlaceholderProfile}
              />
              <View style={tw`flex-1`}>
                <View style={tw`flex-1 flex-row items-center gap-2`}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={tw`flex-1 font-LufgaMedium text-base text-regularText`}
                  >
                    {booking?.providerInfo?.providerName}
                  </Text>
                  <Text
                    style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
                  >
                    {booking?.providerInfo?.totalOrders || 0} order
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <SvgXml xml={IconRatingStar} />
                  <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                    {booking?.providerInfo?.rating || 0} rating
                  </Text>
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    ({booking?.providerInfo?.review || 0} reviews)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {/* ------------- provider name  end ------------ */}

        <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
          Billing information
        </Text>
        <View style={tw`px-5 py-4 bg-white  rounded-xl mt-1`}>
          {/* name */}
          <View style={tw`flex-row items-center justify-between `}>
            <View>
              <Text style={tw`font-LufgaMedium text-lg text-black`}>Name</Text>
              <Text style={tw`font-LufgaRegular text-base text-subText`}>
                {booking?.userInfo?.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => editBottomSheetModalRef.current?.present()}
              activeOpacity={0.7}
            >
              <SvgXml xml={IconEditPen} />
            </TouchableOpacity>
          </View>
          {/* email */}
          <View>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>Email</Text>
            <Text style={tw`font-LufgaRegular text-base text-subText`}>
              {booking?.userInfo?.email}
            </Text>
          </View>
          {/* location */}

          <View>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>
              Location
            </Text>
            <Text style={tw`font-LufgaRegular text-base text-subText`}>
              {booking?.userInfo?.location}
            </Text>
          </View>
        </View>

        {/* ================================= selected date     ============================= */}
        <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
          Scheduled time
        </Text>
        <View style={tw`px-5 py-4 bg-white  rounded-xl mt-1`}>
          <Text style={tw`font-LufgaMedium text-lg text-black`}>
            {booking?.date}
          </Text>
          {booking?.booking_type === "respite_care" ||
          booking?.booking_type === "admin_booking" ? null : (
            <Text style={tw`font-LufgaRegular text-base text-subText`}>
              {booking?.time}
            </Text>
          )}
        </View>
      </View>

      {/* ==================== submit button ==================== */}
      <PrimaryButton
        onPress={() => {
          handlePlaceOrder();
          // console.log(bookingData, "thios is boooki8n sdfkasdjfl;kasjl;kfjsad");
        }}
        buttonText={
          booking?.booking_type === "admin_booking" ||
          (booking?.booking_type === "thirdparty_booking" &&
            booking?.subscriptionId)
            ? "Place Order"
            : "Booking"
        }
        loading={
          isCreatingPaymentIntentLoading ||
          isBookingSuccessRespiteCareLoading ||
          isBookingSuccessThirdPartyLoading ||
          isBookingSubscriptionLoading
        }
        buttonContainerStyle={tw`mt-6 `}
        buttonTextStyle={tw`text-lg font-LufgaMedium`}
        leftIcon={IconOrderPlaceWhite}
      />

      {/* ============================ logout modal =========================== */}
      <BookingSuccessModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onPress={() => {
          setIsModalVisible(false);
          dispatch(resetBooking());
          router.replace("/user_role_sections/user_tabs/user_home");
        }}
      />

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
          <Formik
            initialValues={{
              fullName: booking?.userInfo?.name || "",
              email: booking?.userInfo?.email || "",
              location: booking?.userInfo?.location || "",
            }}
            onSubmit={(values) => handleStateBookingData(values)}
            validationSchema={userValidationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <BottomSheetScrollView
                contentContainerStyle={tw`flex-1  bg-white`}
              >
                {/* ----------------- header title part ---------------- */}
                <View
                  style={tw`flex-row items-center justify-between bg-primaryBtn py-2 px-4 rounded-t-2xl`}
                >
                  <View />
                  <Text style={tw`font-LufgaMedium text-sm text-white`}>
                    Feedback
                  </Text>
                  <TouchableOpacity
                    onPress={() => editBottomSheetModalRef.current?.dismiss()}
                  >
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
                      value={values.fullName}
                      onChangeText={handleChange("fullName")}
                      onBlur={handleBlur("fullName")}
                      defaultValue="John Doe"
                      placeholder="Enter your Full Name"
                      placeholderTextColor="#535353"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.fullName && touched.fullName && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.fullName}
                    </Text>
                  )}

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
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="Enter your Email"
                      placeholderTextColor="#535353"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.email}
                    </Text>
                  )}

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
                      value={values.location}
                      onChangeText={handleChange("location")}
                      onBlur={handleBlur("location")}
                      placeholder="Enter your Location "
                      placeholderTextColor="#535353"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.location && touched.location && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.location}
                    </Text>
                  )}
                </View>

                {/* ============================ submit button ============================ */}
                <PrimaryButton
                  onPress={handleSubmit}
                  buttonText="Save changes"
                  buttonContainerStyle={tw`my-4 mx-5`}
                  buttonTextStyle={tw`text-lg font-LufgaMedium`}
                  leftIcon={IconOrderPlaceWhite}
                />
              </BottomSheetScrollView>
            )}
          </Formik>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ScrollView>
  );
};

export default ConfirmDetailsAdminOrders;
