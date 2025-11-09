import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="respiteCareAllPlan" />
      <Stack.Screen name="customRespiteCare" />
      <Stack.Screen name="respiteCarePlaningDetails" />
    </Stack>
  );
};

export default _layout;
