import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="notifications" />
      <Stack.Screen name="orderDetailsStatus" />
    </Stack>
  );
};

export default _layout;
