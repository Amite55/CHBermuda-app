import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="staffs" />
      <Stack.Screen name="addNewStaffs" />
      <Stack.Screen name="editStaffProfile" />
      <Stack.Screen name="providedServiceFromStaff" />
    </Stack>
  );
};

export default _layout;
