import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { ToastProvider } from "../context/ToastContext";
import store from "../redux/store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F5FF" }}>
            <Provider store={store}>
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
            </Provider>
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
