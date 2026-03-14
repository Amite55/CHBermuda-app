import {
  IconGetterThen,
  IconSubscriptions,
  IconTickRoundWhite,
} from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useCreatePaymentIntentMutation,
  useSubscriptionSuccessAdminPackageORBundleMutation,
} from "@/src/redux/Api/paymentSlices";
import { useGetAdminPackageDetailsQuery } from "@/src/redux/Api/userHomeSlices";
import { useGetActivePlansQuery } from "@/src/redux/Api/userRole/accountSlices";
import { updateBooking } from "@/src/redux/appStore/bookingSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { useStripe } from "@stripe/stripe-react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch } from "react-redux";

interface IPaymentSubscriptionType {
  subscription_type: string;
  package_id: string;
  payment_intent_id: string;
  amount: number;
}

const AdminServiceDetails = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { category, id, title } = useLocalSearchParams();
  const toast = useToastHelpers();
  const dispatch = useDispatch();

  // ============== api end point ==================
  const { data: adminServiceDetails, isLoading: isAdminServiceDetailsLoading } =
    useGetAdminPackageDetailsQuery(id);
  const [createPaymentIntent, { isLoading: isCreatingPaymentIntentLoading }] =
    useCreatePaymentIntentMutation();
  const [confirmSubscription, { isLoading: isConfirmSubscriptionLoading }] =
    useSubscriptionSuccessAdminPackageORBundleMutation();
  const { data: activePlans, isLoading: isActivePlansLoading } =
    useGetActivePlansQuery({});

  const adminPackages = activePlans?.data?.filter(
    (item: any) => item?.subscription_type === "admin_package",
  );

  const findPurchasedPlan = adminPackages?.find((subscription: any) =>
    subscription?.subscription_items?.some(
      (subItem: any) =>
        String(subItem?.package?.id) === String(adminServiceDetails?.data?.id),
    ),
  );

  const findPlanId = findPurchasedPlan?.subscription_items?.find(
    (subItem: any) =>
      String(subItem?.package_id) === String(adminServiceDetails?.data?.id),
  );

  // =============== if user selected service then show service details in modal ================
  const handleSetReduxState = (packageId: string) => {
    try {
      if (packageId === adminServiceDetails?.data?.id) {
        dispatch(
          updateBooking({
            packageInfo: {
              duration: adminServiceDetails?.data?.duration,
              id: adminServiceDetails?.data?.id,
              price: adminServiceDetails?.data?.price,
              servicePackageImage: adminServiceDetails?.data?.icon,
              title: adminServiceDetails?.data?.title,
            },
            booking_type: "admin_booking",
            adminSubscriptionId: findPlanId?.subscription_id,
          }),
        );
        router.push({
          pathname: "/user_role_sections/providers/provider",
          params: { id: id },
        });
      } else {
        toast.warning("Please buy the plan and access the service", 4000);
      }
    } catch (error: any) {
      console.log(error, "Redux state not stored data ");
    }
  };

  // ====================== send stripe payment modal request and payment ======================
  const handleSubscription = async () => {
    try {
      const intentData = {
        amount: Number(adminServiceDetails?.data?.price),
        currency: "USD",
      };
      const responseIntent = await createPaymentIntent(intentData).unwrap();
      if (!responseIntent?.data?.client_secret) {
        toast.warning("Something went wrong please try again", 3000);
        return;
      }
      const subscriptionPaymentData = {
        subscription_type: "admin_package",
        package_id: adminServiceDetails?.data?.id,
        payment_intent_id: responseIntent?.data?.client_secret,
        amount: Number(adminServiceDetails?.data?.price),
      };
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
        checkout(subscriptionPaymentData);
      }
    } catch (error: any) {
      console.log(error, "Payment intent not created ----->");
    }
  };

  // ================= when if open the stripe payment sheet to call this this function ================
  const checkout = async (subscriptionData: IPaymentSubscriptionType) => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        toast.showError(
          error?.message || error || "Something went wrong please try again",
        );
      } else {
        const response = await confirmSubscription(subscriptionData).unwrap();
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

  // ================ if loading state
  if (isAdminServiceDetailsLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={1} />;
  }
  return (
    <ScrollView
      contentContainerStyle={tw` px-5 bg-bgBaseColor  flex-grow justify-between`}
      style={tw`flex-1 bg-bgBaseColor`}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={tw`gap-2`}>
        <BackTitleButton
          title={category ? title.toString() : "Services"}
          onPress={() => router.back()}
        />
        <Image
          source={adminServiceDetails?.data?.icon}
          style={tw`w-full h-40 rounded-3xl mt-2`}
          contentFit="cover"
        />
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={tw`font-LufgaMedium text-base text-black`}
        >
          {adminServiceDetails?.data?.title}
        </Text>
        <Text style={tw`font-LufgaMedium text-base text-black`}>
          ${adminServiceDetails?.data?.price}{" "}
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            /{adminServiceDetails?.data?.type}
          </Text>
        </Text>
        {/* ------------------ plan description ---------------- */}
        <Text style={tw`font-LufgaRegular text-sm text-subText `}>
          {adminServiceDetails?.data?.description}
        </Text>

        {/* Included Services: */}
        <Text style={tw`font-LufgaMedium text-base text-black -mb-3 mt-2`}>
          Included Services:
        </Text>
        <View style={tw`gap-1 mb-4`}>
          {adminServiceDetails?.data?.included_services?.map((line, index) => (
            <View key={index} style={tw`flex-row items-center gap-2 mt-2`}>
              <View style={tw`w-2 h-2 rounded-full bg-black`} />
              <Text
                numberOfLines={2}
                style={tw`font-LufgaRegular text-sm text-black flex-1`}
              >
                {line}
              </Text>
            </View>
          ))}
        </View>

        {/* =    all provider info    in this service   */}
        {adminServiceDetails?.data?.providers?.length > 0 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleSetReduxState(findPlanId?.package_id);
            }}
            style={tw`flex-row justify-between items-center `}
          >
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              {adminServiceDetails?.data?.providers?.length} providers
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <View style={tw`flex-row items-center `}>
                {adminServiceDetails?.data?.providers?.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      style={tw`w-10 h-10 rounded-full  -ml-5`}
                      source={item?.avatar}
                      contentFit="contain"
                      placeholder={ImgPlaceholderProfile}
                    />
                  );
                })}
              </View>
              <SvgXml xml={IconGetterThen} />
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={tw`text-center text-subText font-LufgaMedium`}>
            No provider found
          </Text>
        )}
      </View>

      <PrimaryButton
        buttonText={
          findPlanId?.package_id === adminServiceDetails?.data?.id
            ? "Purchased"
            : "Subscribe"
        }
        disabled={
          isCreatingPaymentIntentLoading ||
          isConfirmSubscriptionLoading ||
          findPlanId?.package_id === adminServiceDetails?.data?.id
        }
        loading={isCreatingPaymentIntentLoading || isConfirmSubscriptionLoading}
        buttonTextStyle={tw`font-LufgaMedium text-base`}
        leftIcon={
          findPlanId?.package_id === adminServiceDetails?.data?.id
            ? IconTickRoundWhite
            : IconSubscriptions
        }
        buttonContainerStyle={[
          tw`mt-2 h-12`,
          findPlanId?.package_id === adminServiceDetails?.data?.id &&
            tw`bg-green-500`,
        ]}
        onPress={() => {
          handleSubscription();
        }}
      />
    </ScrollView>
  );
};

export default AdminServiceDetails;
