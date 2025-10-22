import ProviderTabsBar from "@/src/components/ProviderTabs";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <ProviderTabsBar {...props} />}
    >
      <Tabs.Screen name="providerHome" options={{ title: "Home" }} />
      <Tabs.Screen name="providerOrder" options={{ title: "Order" }} />
      {/* <Tabs.Screen name="providerChat" options={{ title: "Chat" }} /> */}
      <Tabs.Screen name="providerAccount" options={{ title: "Account" }} />
    </Tabs>
  );
};

export default _layout;
