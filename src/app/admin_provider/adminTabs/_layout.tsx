import AdminTabs from "@/src/components/AdminTabs";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AdminTabs {...props} />}
    >
      <Tabs.Screen name="adminHome" options={{ title: "Home" }} />
      <Tabs.Screen name="adminOrder" options={{ title: "Order" }} />
      <Tabs.Screen name="adminChat" options={{ title: "Chat" }} />
      <Tabs.Screen name="adminAccount" options={{ title: "Account" }} />
    </Tabs>
  );
};

export default _layout;
