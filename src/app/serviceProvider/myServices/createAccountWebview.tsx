import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useCreateOnboardingLinkMutation,
  useOnboardingVerificationMutation,
} from "@/src/redux/Api/stripeSlices";
import WebViewSkeleton from "@/src/Skeletion/WebViewSkeleton";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

const CreateAccountWebview = () => {
  const [onboardingUrl, setOnboardingUrl] = React.useState("");

  // =============== hooks =================
  const toast = useToastHelpers();
  // ================ api end point =================
  const [createOnboardingLink, { isLoading: isCreatingOnboardingLinkLoading }] =
    useCreateOnboardingLinkMutation();
  const [
    onboardingVerification,
    { isLoading: isOnboardingVerificationLoading },
  ] = useOnboardingVerificationMutation();

  // ====================== handle create connect account ======================
  const handleCreateConnectAccount = async () => {
    try {
      const onboardingResponse = await createOnboardingLink({}).unwrap();
      const url = onboardingResponse?.data?.onboarding_url;
      if (url) {
        setOnboardingUrl(url);
      }
    } catch (error: any) {
      console.log(error, "Create Connect Account not success ->>");
      toast.showError(
        "Create Connect Account not success Please try again",
        3000,
      );
    }
  };

  //   ================== initial render =================
  useEffect(() => {
    handleCreateConnectAccount();
  }, []);

  //   ============== loading state ================
  if (isCreatingOnboardingLinkLoading) {
    return <WebViewSkeleton />;
  }
  return (
    <View style={tw`flex-1 bg-bgBaseColor px-4`}>
      <BackTitleButton
        title="Create Connect Account"
        onPress={() => router.back()}
      />
      <WebView
        containerStyle={tw`mt-4 rounded-lg`}
        source={{
          uri: onboardingUrl,
        }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator size="large" color="#000" style={tw`mt-10`} />
        )}
        onNavigationStateChange={async (navState) => {
          const url = navState.url;
          if (url.includes("/stripe/onboarding/callback")) {
            const urlParams = new URL(url);
            const status = urlParams.searchParams.get("status");

            console.log("Status:", status);
            if (status === "success") {
              try {
                toast.success("Your account created successfully", 3000);
                router.replace(
                  "/serviceProvider/serviceProviderTabs/providerHome",
                );
              } catch (e) {
                console.log(e, "verification failed");
                toast.showError("Verification failed", 3000);
              }
            }
            // ============ when status is error =========== to navigate back =========
            if (status === "error") {
              toast.showError(
                "Stripe onboarding failed. Please try again.",
                3000,
              );
              router.back();
            }
          }
        }}
        onError={(e) => {
          console.log("WebView error:", e.nativeEvent);
          toast.showError("Not Created Your Account", 3000);
          router.back();
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default CreateAccountWebview;
