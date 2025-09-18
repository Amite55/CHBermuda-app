import {
  IconExploreActive,
  IconExploreInactive,
  IconHomeActive,
  IconHomeInactive,
  IconOrderActive,
  IconOrderInactive,
  IconProfileActive,
  IconProfileInactive,
} from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const _layout = () => {
  function MyTabBar({ state, descriptors, navigation }) {
    const { buildHref } = useLinkBuilder();

    return (
      <View
        style={[
          tw`absolute bottom-4 justify-center items-center w-full flex-1  px-4`,
        ]}
      >
        <View
          style={tw`flex-row bg-white h-20 items-center  rounded-full px-2`}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            // Get the icon based on route name
            const getIcon = () => {
              switch (route.name) {
                case "user_home":
                  return isFocused ? IconHomeActive : IconHomeInactive;
                case "explore":
                  return isFocused ? IconExploreActive : IconExploreInactive;
                case "order":
                  return isFocused ? IconOrderActive : IconOrderInactive;
                case "user_profile":
                  return isFocused ? IconProfileActive : IconProfileInactive;
                default:
                  return IconHomeActive;
              }
            };

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <PlatformPressable
                key={route.name}
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  tw`flex-1 items-center justify-center relative border`,
                  isFocused && tw`bg-primaryBtn rounded-full h-12 px-2`,
                ]}
              >
                <View style={[tw`flex-row gap-2 items-center`]}>
                  <View
                    style={tw`bg-slate-100 rounded-full h-10 w-10 items-center justify-center`}
                  >
                    <SvgXml
                      xml={getIcon()}
                      width={24}
                      height={24}
                      style={[tw`mb-1`]}
                    />
                  </View>
                  {isFocused ? (
                    <Text style={tw`text-white text-xs font-semibold`}>
                      {label}
                    </Text>
                  ) : null}
                </View>
              </PlatformPressable>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="user_home" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="order" options={{ title: "Order" }} />
      <Tabs.Screen name="user_profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default _layout;
