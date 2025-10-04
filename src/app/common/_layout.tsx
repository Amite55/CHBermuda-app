import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    // <Stack
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    // >
    //   <Stack.Screen name="boutAboutUs" />
    //   <Stack.Screen name="boutPrivacyPolicy" />
    // </Stack>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default _layout;
