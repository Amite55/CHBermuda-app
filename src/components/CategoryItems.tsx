import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../lib/tailwind";

const CategoryItems = ({ items }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (items.item.type === "respite_care_service") {
          router.push({
            pathname:
              "/user_role_sections/respiteCarePlaning/respiteCareAllPlan",
            params: {
              title: items?.item?.name,
              category: items?.item?.type,
              id: items?.item?.id,
            },
          });
        } else if (items?.item?.type === "admin_service") {
          router.push({
            pathname:
              "/user_role_sections/categoryPlaning/adminProviderService",
            params: {
              title: items?.item?.name,
              category: items?.item.type,
              id: items?.item?.id,
            },
          });
        } else {
          router.push({
            pathname:
              "/user_role_sections/categoryPlaning/serviceProviderService",
            params: {
              title: items?.item?.name,
              category: items?.item?.type,
              id: items?.item?.id,
            },
          });
        }
      }}
      activeOpacity={0.9}
    >
      <View
        style={tw`bg-white h-20 w-20 rounded-full items-center justify-center`}
      >
        <Image
          contentFit="contain"
          style={tw`w-10 h-10`}
          source={items?.item?.icon}
        />
      </View>
      <Text style={tw`font-LufgaRegular text-sm text-regularText pt-1`}>
        {items?.item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItems;
