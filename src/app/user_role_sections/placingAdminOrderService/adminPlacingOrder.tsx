import {
  IconLocationPrimary,
  IconRatingStar,
  IconRightArrow,
} from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { updateBooking } from "@/src/redux/appStore/bookingSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
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
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

// ================= user form type =================
interface userInfoType {
  fullName: string;
  email: string;
  location: string;
}

const AdminPlacingOrder = () => {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const booking = useSelector((state: any) => state.booking);
  const dispatch = useDispatch();

  // ============= hooks ==================
  const { profileData, isProfileLoading, profileRefetch, isProfileFetching } =
    useProfile();

  const handleStateBookingData = (userInfo: userInfoType) => {
    try {
      dispatch(
        updateBooking({
          userInfo: {
            name: userInfo.fullName,
            email: userInfo.email,
            location: userInfo.location,
            userImage: profileData?.data?.avatar || "",
          },
        }),
      );
      router.push(
        "/user_role_sections/placingAdminOrderService/adminOrderTimePlacing",
      );
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

  React.useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{
            fullName: profileData?.data?.name || "",
            email: profileData?.data?.email || "",
            location: profileData?.data?.address || "",
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
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={tw`flex-1 bg-bgBaseColor`}
              contentContainerStyle={[
                tw` px-5 flex-grow justify-between`,
                keyboardVisible ? tw`pb-10 pt-3` : tw`pb-2`,
              ]}
            >
              <View>
                <BackTitleButton
                  title="Placing order admin"
                  onPress={() => router.back()}
                />
                {/* ------------- service name ------------ */}
                {booking?.booking_type === "respite_care" && (
                  <View>
                    <Text
                      style={tw`font-LufgaMedium text-base text-regularText mt-2`}
                    >
                      Service
                    </Text>
                    {/* ============= service card ============== */}
                    <View
                      style={tw` flex-row items-center gap-2 px-4 py-3 bg-white  rounded-xl`}
                    >
                      <Image
                        style={tw`w-16 h-16 rounded-full`}
                        source={
                          booking?.respiteCarePackageDetails?.respiteCareImage
                        }
                        contentFit="cover"
                      />
                      <View style={tw`flex-1 `}>
                        <View style={tw` flex-1 flex-row  items-center  gap-2`}>
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
                            {booking?.respiteCarePackageDetails?.addons
                              ?.length || 0}{" "}
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
                  </View>
                )}
                {/* ------------- provider name ------------ */}
                <Text
                  style={tw`font-LufgaMedium text-base text-regularText mt-2`}
                >
                  Provider
                </Text>
                {/* =============== provider card info =============== */}
                <View
                  style={tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl`}
                >
                  <Image
                    style={tw`w-16 h-16 rounded-full`}
                    source={booking?.providerInfo?.providerImage}
                    contentFit="contain"
                    placeholder={ImgPlaceholderProfile}
                  />
                  <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={tw`flex-1 font-LufgaMedium text-base text-regularText`}
                      >
                        {booking?.providerInfo?.providerName}
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
                      <Text
                        style={tw`font-LufgaRegular text-sm text-regularText`}
                      >
                        4.0
                      </Text>
                      <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                        (8 reviews)
                      </Text>
                    </View>
                  </View>
                </View>
                {/* ------------- provider name ------------ */}
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
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
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
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    defaultValue="Jexample@gmail.com"
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
                    onChangeText={handleChange("location")}
                    onBlur={handleBlur("location")}
                    value={values.location}
                    defaultValue="New York, USA"
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
                  handleSubmit();
                }}
                buttonText="Next"
                buttonContainerStyle={tw`mt-6 `}
                buttonTextStyle={tw`text-lg font-LufgaMedium`}
                rightIcon={IconRightArrow}
              />
            </ScrollView>
          )}

          {/* -------------------   submit button   ------------------ */}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AdminPlacingOrder;
