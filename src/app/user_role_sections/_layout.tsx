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
    </Stack>
  );
};

export default _layout;
