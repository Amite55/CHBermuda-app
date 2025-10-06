import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "fade",
      }}
    >
      <Stack.Screen name="providerOrderDateTimePlacing" />
      <Stack.Screen name="confirmDetailsProviderPlacingOrder" />
    </Stack>
  );
};

export default _layout;
