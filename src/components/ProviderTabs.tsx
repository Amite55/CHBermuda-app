import {
  IconProviderTabsChatActive,
  IconProviderTabsChatInActive,
  IconProviderTabsHomeActive,
  IconProviderTabsHomeInActive,
  IconProviderTabsOrderActive,
  IconProviderTabsOrderInActive,
  IconProviderTabsProfileActive,
  IconProviderTabsProfileInActive,
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

const ProviderTabsBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { buildHref } = useLinkBuilder();
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(PlatformPressable);

  return (
    <View style={tw`flex-row bg-white py-2 items-center  `}>
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
            case "providerHome":
              return isFocused
                ? IconProviderTabsHomeActive
                : IconProviderTabsHomeInActive;
            case "providerOrder":
              return isFocused
                ? IconProviderTabsOrderActive
                : IconProviderTabsOrderInActive;
            case "providerChat":
              return isFocused
                ? IconProviderTabsChatActive
                : IconProviderTabsChatInActive;
            case "providerAccount":
              return isFocused
                ? IconProviderTabsProfileActive
                : IconProviderTabsProfileInActive;
            default:
              return IconProviderTabsHomeActive;
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
            //   style={tw`flex-1 items-center justify-center`}
            style={[tw`flex-1  items-center justify-center  `]}
          >
            <View style={[tw` gap-1 items-center `]}>
              <View
                style={tw`bg-slate-100 rounded-full h-10 w-10 items-center justify-center`}
              >
                <SvgXml xml={getIcon()} width={20} height={20} />
              </View>
              <Animated.Text
                layout={LinearTransition.springify()}
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={[
                  tw`text-black text-sm font-bold`,
                  isFocused ? tw`text-primaryBtn` : tw`text-subText`,
                ]}
              >
                {label}
              </Animated.Text>
            </View>
            {isFocused && (
              <Animated.View
                layout={LinearTransition.springify()
                  .mass(0.5)
                  .stiffness(100)
                  .damping(20)}
                style={[
                  tw` bg-primaryBtn h-1 w-14 justify-center items-center rounded-2xl`,
                ]}
              />
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProviderTabsBar;
