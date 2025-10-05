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
      <Stack.Screen name="adminPlacingOrder" />
      <Stack.Screen name="adminOrderTimePlacing" />
      <Stack.Screen name="confirmDetailsAdminOrders" />
    </Stack>
  );
};

export default _layout;
