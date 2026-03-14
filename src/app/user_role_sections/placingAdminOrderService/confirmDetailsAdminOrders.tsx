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
import { useBookingSuccessRespiteCareMutation } from "@/src/redux/Api/userRole/orderSlices";
import {
  resetBooking,
  updateBooking,
} from "@/src/redux/appStore/bookingSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
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
import React, { useCallback, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// ================= user form type =================
interface userInfoType {
  fullName: string;
  email: string;
  location: string;
}

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

  const result = booking?.respiteCarePackageDetails?.addons.reduce(
    (acc, value, index) => {
      acc[`add_ons_id[${index + 1}]`] = value;
      return acc;
    },
    {},
  );

  console.log(booking, "this is array object ad ons");

  // ============== get booking data from store =============
  const bookingData = {
    name: booking?.userInfo?.name,
    email: booking?.userInfo?.email,
    location: booking?.userInfo?.location,
    booking_type: booking?.booking_type,
    date: booking?.date,
    // when user booking type respite care
    ...(booking?.booking_type === "respite_care" && {
      ...(booking?.subscriptionId ? {} : { amount: booking?.amount }),
      ...(booking?.respiteCarePackageDetails?.addons?.length > 0 && result),
    }),
    ...(booking?.booking_type === "respite_care" && {
      respite_care_id: booking?.respiteCarePackageDetails?.respiteCareId,
    }),
    // === when user booking type third party  service ==========
    ...((booking?.booking_type === "thirdparty_booking" ||
      booking?.booking_type === "admin_booking") && {
      provider_id: booking?.providerInfo?.providerId,
      package_id: booking?.packageInfo?.id,
      package_time_id: booking?.package_time_id,
      booking_type: booking?.booking_type,
      // if booking type plan service ======
      ...(booking?.booking_type === "thirdparty_booking" &&
      !booking?.subscription_id
        ? { amount: booking?.packageInfo?.price }
        : { subscription_id: booking?.subscriptionId }),
      subscription_id: booking?.adminSubscriptionId,
    }),

    // ===== when user booking type admin service plan ======
    ...(booking?.booking_type === "admin_booking" && {
      subscription_id: booking?.adminSubscriptionId,
    }),
  };

  // ================ booking data handler =================
  const handleBookingSuccessData = async () => {
    try {
      const intentData = {
        amount: 12,
        currency: "USD",
      };
      const responseIntent = await createPaymentIntent(intentData).unwrap();
      if (!responseIntent?.data?.client_secret) {
        toast.warning("Something went wrong please try again", 3000);
        return;
      }

      // ==================== call payment modal ===================
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        paymentIntentClientSecret: responseIntent?.data?.client_secret,
      });
      if (initError) {
        // handle error----------
        toast.showError(
          initError?.message ||
            initError ||
            "Something went wrong please try again",
        );
      } else {
        checkout("admin_package");
      }
    } catch (error: any) {
      console.log(error, "Booking don't success please try again--->");
    }
  };

  // ================= when if open the stripe payment sheet to call this this function ================
  const checkout = async (subscriptionData) => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        toast.showError(
          error?.message || error || "Something went wrong please try again",
        );
      } else {
        const response =
          await bookingSuccessRespiteCare(subscriptionData).unwrap();
        if (response) {
          toast.success(
            response?.message || "Active plans retrieved successfully",
            3000,
          );
        }
      }
    } catch (error: any) {
      console.log(error, "Payment not success in your subscription------>");
    }
  };

  // ===================== set redux store for user form data =======================
  const handleStateBookingData = (userInfo: userInfoType) => {
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
      handleEditModalClose();
    } catch (error) {
      console.log(error, "redux not stored------->");
    }
  };

  // ==================== Validation Schema ====================
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      )
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
  });

  // ====================== modal open and close function =======================
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
          // handleBookingSuccessData();
          console.log(bookingData, "thios is boooki8n sdfkasdjfl;kasjl;kfjsad");
        }}
        buttonText={
          booking?.booking_type === "admin_booking" ||
          (booking?.booking_type === "thirdparty_booking" &&
            booking?.subscriptionId)
            ? "Place Order"
            : "Booking"
        }
        loading={isCreatingPaymentIntentLoading}
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
            validationSchema={validationSchema}
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
