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
      <Stack.Screen name="provider" />
      <Stack.Screen name="providerDetailsInfoAdmin" />
      <Stack.Screen name="providerDetailsInfoProviders" />
      <Stack.Screen name="thirdPartyProviders" />
    </Stack>
  );
};

export default _layout;
