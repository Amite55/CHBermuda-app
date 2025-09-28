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
      <Stack.Screen name="singIn" />
      <Stack.Screen name="singUp" />
      <Stack.Screen name="forgotPassword" />
      <Stack.Screen name="enterOTP" />
      <Stack.Screen name="resetPassword" />
      <Stack.Screen name="changePassward" />
    </Stack>
  );
};

export default _layout;
