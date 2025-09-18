import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F5FF" }}>
          <StatusBar />
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
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
