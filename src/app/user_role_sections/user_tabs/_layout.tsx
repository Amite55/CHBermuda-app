import { UserTabsBar } from "@/src/components/UserTabs";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <UserTabsBar {...props} />}
    >
      <Tabs.Screen name="user_home" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="order" options={{ title: "Order" }} />
      <Tabs.Screen name="user_profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default _layout;
