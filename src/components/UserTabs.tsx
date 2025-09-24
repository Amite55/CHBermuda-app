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
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

export function UserTabsBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarButtonProps) {
  const { buildHref } = useLinkBuilder();

  const tabPositionX = useSharedValue(0);
  const tabWidth = useSharedValue(60); // default width for icon-only

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
      width: tabWidth.value,
    };
  });

  return (
    <View
      style={[
        tw`absolute bottom-2 justify-center items-center w-full flex-1  px-4 z-10`,
      ]}
    >
      <View style={tw`flex-row bg-white h-16 items-center  rounded-full px-1`}>
        {/* <Animated.View
          style={[tw`absolute h-12  bg-primaryBtn rounded-full`, animatedStyle]}
        /> */}
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
            // tabPositionX.value = withSpring(index * 80);
            // tabWidth.value = withSpring(isFocused ? 60 : 120);
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
              //   style={tw`flex-1 items-center justify-center`}
              style={[
                tw`flex-1 items-center justify-center relative `,
                isFocused && tw`bg-primaryBtn rounded-full h-10 px-2 `,
              ]}
            >
              <View style={[tw`flex-row gap-1 items-center`]}>
                <View
                  style={tw`bg-slate-100 rounded-full h-8 w-8 items-center justify-center`}
                >
                  <SvgXml
                    xml={getIcon()}
                    width={20}
                    height={20}
                    style={[tw`mb-1`]}
                  />
                </View>
                {isFocused && (
                  <Text style={tw`text-white text-xs font-semibold`}>
                    {label}
                  </Text>
                )}
              </View>
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
}
