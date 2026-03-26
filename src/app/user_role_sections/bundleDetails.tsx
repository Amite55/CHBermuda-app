import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useCreatePaymentIntentMutation,
  useSubscriptionSuccessAdminPackageORBundleMutation,
} from "@/src/redux/Api/paymentSlices";
import { useGetAddonBundlesDetailsQuery } from "@/src/redux/Api/userHomeSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { useStripe } from "@stripe/stripe-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AddonService {
  id: number;
  addon_id: number;
  service_id: number;
  package_id: number | null;
  quantity: number | null;
  service: {
    id: number;
    name: string;
    icon: string;
    type: string;
  };
  package: {
    id: number;
    title: string;
    icon: string;
    price: string;
    type: string;
    weekly_visits: number | null;
    monthly_visits: number | null;
  } | null;
}

interface BundleData {
  id: number;
  title: string;
  description: string;
  included_services: string[];
  price: string;
  total_purchased: number;
  most_popular: number;
  addon_services: AddonService[];
}

// ─── Check icon ───────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <View style={tw`w-5 h-5 rounded-full bg-primary items-center justify-center`}>
    <Text style={tw`text-white text-xs font-bold`}>✓</Text>
  </View>
);

// ─── Addon Service Card ───────────────────────────────────────────────────────
const AddonServiceCard = ({ item }: { item: AddonService }) => {
  return (
    <View
      style={tw`flex-row items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-100`}
    >
      {/* Service icon */}
      <View
        style={tw`w-10 h-10 rounded-xl bg-indigo-50 items-center justify-center overflow-hidden`}
      >
        {item.service?.icon ? (
          <Image
            source={{ uri: item.service.icon }}
            style={tw`w-6 h-6`}
            resizeMode="contain"
          />
        ) : (
          <Text style={tw`text-primary text-base`}>⚙</Text>
        )}
      </View>

      {/* Info */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-textColor font-LufgaMedium text-sm`}>
          {item.service?.name ?? "Service"}
        </Text>
        {item.package ? (
          <Text
            style={tw`text-subText font-LufgaRegular text-xs mt-0.5`}
            numberOfLines={1}
          >
            {item.package.title}
          </Text>
        ) : item.quantity ? (
          <Text style={tw`text-subText font-LufgaRegular text-xs mt-0.5`}>
            Qty: {item.quantity}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const BundleDetails = () => {
  const { id } = useLocalSearchParams();
  const toast = useToastHelpers();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // ============== api endpoint ================
  const { data: bundleDetails, isLoading: isBundleDetailsLoading } =
    useGetAddonBundlesDetailsQuery(id);
  const [createPaymentIntent, { isLoading: isCreatingPaymentIntentLoading }] =
    useCreatePaymentIntentMutation();
  const [confirmSubscribeBundle, { isLoading: isConfirmSubscriptionLoading }] =
    useSubscriptionSuccessAdminPackageORBundleMutation();
  // ============= variables ================
  const bundle: BundleData | undefined = bundleDetails?.data;

  // ====================== send stripe payment modal request and payment ======================
  const handleSubscribeBundles = async (price: string, id: number) => {
    console.log(id, price);
    try {
      const intentData = {
        amount: Number(price),
        currency: "USD",
      };
      const responseIntent = await createPaymentIntent(intentData).unwrap();
      if (!responseIntent?.data?.client_secret) {
        toast.warning("Something went wrong please try again", 3000);
        return;
      }
      const bundleData = {
        subscription_type: "bundle",
        addon_id: id,
        payment_intent_id: responseIntent?.data?.client_secret,
        amount: Number(price),
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
        checkout(bundleData);
      }
    } catch (error: any) {
      console.log(error, "Payment intent not created ----->");
    }
  };
  // ================= when if open the stripe payment sheet to call this this function ================
  const checkout = async (bundleData: any) => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        toast.showError(
          error?.message || error || "Something went wrong please try again",
        );
      } else {
        const response = await confirmSubscribeBundle(bundleData).unwrap();
        if (response) {
          toast.success(
            response?.message || "Active plans retrieved successfully",
            3000,
          );
          router.back();
        }
      }
    } catch (error: any) {
      console.log(error, "Payment not success in your subscription------>");
      toast.showError(
        error?.message || error || "Something went wrong please try again",
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={tw`px-4 bg-bgBaseColor pb-10 gap-4`}
      style={tw`bg-bgBaseColor flex-1`}
      showsVerticalScrollIndicator={false}
    >
      <BackTitleButton title="Bundle Details" onPress={() => router.back()} />

      {isBundleDetailsLoading ? (
        <View style={tw`flex-1 items-center justify-center py-20`}>
          <ActivityIndicator size="large" color="#1D4ED8" />
        </View>
      ) : !bundle ? (
        <View style={tw`items-center py-20`}>
          <Text style={tw`text-subText font-LufgaRegular text-sm`}>
            No details found
          </Text>
        </View>
      ) : (
        <>
          {/* ─── Info Card ────────────────────────────────────────────── */}
          <View
            style={tw`bg-white rounded-2xl px-4 py-5 border border-gray-100 gap-3`}
          >
            {/* Title & price */}
            <View style={tw`flex-row items-start justify-between gap-2`}>
              <Text
                style={tw`text-textColor font-LufgaSemiBold text-lg flex-1`}
                numberOfLines={2}
              >
                {bundle.title}
              </Text>
              <View style={tw`bg-indigo-50 px-3 py-1 rounded-full`}>
                <Text style={tw`text-primary font-LufgaSemiBold text-sm`}>
                  ${parseFloat(bundle.price).toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Description */}
            <Text style={tw`text-subText font-LufgaRegular text-sm leading-5`}>
              {bundle.description}
            </Text>

            {/* Divider */}
            <View style={tw`border-t border-gray-100`} />

            {/* Included services */}
            <Text style={tw`text-textColor font-LufgaMedium text-sm`}>
              What's included
            </Text>
            <View style={tw`gap-2`}>
              {bundle.included_services.map((service, index) => (
                <View key={index} style={tw`flex-row items-center gap-2`}>
                  <CheckIcon />
                  <Text
                    style={tw`text-subText font-LufgaRegular text-sm flex-1`}
                  >
                    {service}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* ─── Addon Services ───────────────────────────────────────── */}
          {bundle.addon_services?.length > 0 && (
            <View style={tw`gap-3`}>
              <Text style={tw`text-textColor font-LufgaSemiBold text-base`}>
                Add-ons
              </Text>
              {bundle.addon_services.map((addon) => (
                <AddonServiceCard key={addon.id} item={addon} />
              ))}
            </View>
          )}

          {/* ─── Subscribe Button ─────────────────────────────────────── */}

          <PrimaryButton
            buttonText={`Subscribe - ${parseFloat(bundle.price).toFixed(2)}`}
            buttonTextStyle={tw`text-base`}
            onPress={() => handleSubscribeBundles(bundle.price, bundle.id)}
            loading={
              isCreatingPaymentIntentLoading || isConfirmSubscriptionLoading
            }
          />
        </>
      )}
    </ScrollView>
  );
};

export default BundleDetails;
