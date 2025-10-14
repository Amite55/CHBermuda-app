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
      <Stack.Screen name="adminNotification" />
    </Stack>
  );
};

export default AdminProvider;
