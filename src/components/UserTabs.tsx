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
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

const UserTabsBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { buildHref } = useLinkBuilder();

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(PlatformPressable);

  return (
    <View
      style={tw` absolute bottom-3 shadow flex-row justify-between bg-white py-4 px-2 w-[90%] items-center self-center  rounded-full `}
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
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify()
              .mass(0.5)
              .stiffness(100)
              .damping(20)}
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              tw`flex-row items-center justify-center h-10 pl-1 pr-2 rounded-full `,
              isFocused ? tw`bg-primaryBtn  ` : tw`bg-transparent`,
            ]}
          >
            <View style={[tw`flex-row gap-2 items-center`]}>
              <View
                style={tw`bg-slate-100 rounded-full h-8 w-8 items-center justify-center`}
              >
                <SvgXml
                  xml={getIcon()}
                  width={20}
                  height={20}
                  // style={[tw`mb-1`]}
                />
              </View>
              {isFocused && (
                <Animated.Text
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                  style={tw`text-white text-sm font-semibold mr-2`}
                >
                  {label}
                </Animated.Text>
              )}
            </View>
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

export default UserTabsBar;
