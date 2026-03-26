import { Stack } from "expo-router";
import React from "react";

const AdminProvider = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="adminTabs" />
      <Stack.Screen name="orderProvided" />
    </Stack>
  );
};

export default AdminProvider;
