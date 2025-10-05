import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "fade",
        statusBarHidden: false,
      }}
    >
      <Stack.Screen name="user_tabs" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="paymentSystem" />
      <Stack.Screen name="notificationsUser" />
      <Stack.Screen name="categoryPlaning" />
      <Stack.Screen name="providers" />
      <Stack.Screen name="placingAdminOrderService" />
    </Stack>
  );
};

export default _layout;
