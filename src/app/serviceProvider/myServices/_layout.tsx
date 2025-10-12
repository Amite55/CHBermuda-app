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
      <Stack.Screen name="addNewService" />
    </Stack>
  );
};

export default _layout;
