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
      <Stack.Screen name="adminProviderService" />
      <Stack.Screen name="serviceProviderService" />
      <Stack.Screen name="adminServiceDetails" />
    </Stack>
  );
};

export default _layout;
