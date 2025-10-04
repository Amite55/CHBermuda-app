import { ImgServiceImage } from "@/assets/image";
import ServicePlanCard from "@/src/components/ServicePlanCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

const AdminProviderService = () => {
  const { category } = useLocalSearchParams();
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor gap-5`}
      style={tw`flex-1 bg-bgBaseColor`}
      ListHeaderComponent={() => {
        return (
          <BackTitleButton
            title={category ? category.toString() : "Services"}
            onPress={() => router.back()}
          />
        );
      }}
      renderItem={() => {
        return (
          <ServicePlanCard
            image={ImgServiceImage}
            planName="Crystal Comfort Plan"
            price={1799}
            providers={10}
            description="Ideal for independent seniors who value peace of mind and a gentle helping hand. The Crystal Comfort Plan is thoughtfully designed for seniors who live independently but benefit from occasional support. This plan provides a perfect balance of light assistance, meaningful companionship, and essential services—helping you or your loved one feel supported without compromising independence."
            plan="monthly"
            onPress={() => {
              router.push({
                pathname:
                  "/user_role_sections/categoryPlaning/adminServiceDetails",
                params: {
                  category: category ? category.toString() : "Services",
                },
              });
            }}
          />
        );
      }}
    />
  );
};

export default AdminProviderService;
