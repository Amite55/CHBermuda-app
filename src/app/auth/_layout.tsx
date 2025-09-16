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
    </Stack>
  );
};

export default _layout;
