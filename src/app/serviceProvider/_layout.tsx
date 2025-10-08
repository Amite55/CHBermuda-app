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
    </Stack>
  );
};

export default ServiceProviderLayout;
