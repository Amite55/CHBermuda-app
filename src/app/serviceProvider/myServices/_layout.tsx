import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="myService" />
    </Stack>
  );
};

export default _layout;
