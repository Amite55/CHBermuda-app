import { Stack } from "expo-router";
import React from "react";

const ServiceProviderLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="serviceProviderTabs" />
      <Stack.Screen name="providerStaffs" />
      <Stack.Screen name="serviceHistory" />
      <Stack.Screen name="messagingProviderService" />
    </Stack>
  );
};

export default ServiceProviderLayout;
