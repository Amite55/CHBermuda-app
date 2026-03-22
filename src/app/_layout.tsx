import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
import store from "../redux/store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F5FF" }}>
            <Provider store={store}>
              <AuthProvider>
                <StripeProvider
                  publishableKey={
                    process.env.STRIPE_PUBLISHABLE_KEY ||
                    "pk_test_51QKAtBKOpUtqOuW1x5VdNqH3vG7CZZl1P6V3VuV1qsRUmPLNk26i34AXeu2zCO3QurFJAOZ9zfb0EkWeCVhqBYgH008X41cXr6"
                  }
                >
                  <StatusBar />
                  <ToastProvider>
                    <Stack
                      screenOptions={{
                        headerShown: false,
                        statusBarAnimation: "fade",
                        statusBarStyle: "dark",
                        statusBarHidden: false,
                      }}
                    >
                      <Stack.Screen name="index" />
                      <Stack.Screen name="chooseRole" />
                      <Stack.Screen name="user_role_sections" />
                      <Stack.Screen name="common" />
                      <Stack.Screen name="auth" />
                      <Stack.Screen name="serviceProvider" />
                      <Stack.Screen name="admin_provider" />
                    </Stack>
                  </ToastProvider>
                </StripeProvider>
              </AuthProvider>
            </Provider>
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
