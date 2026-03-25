import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const ProvidedServiceFromStaff = () => {
  const { id } = useLocalSearchParams();
  console.log(id, "this is staffs id -------->");
  return (
    <View style={tw`px-4`}>
      <BackTitleButton title="Service provided" onPress={() => router.back()} />
      <Text>ProvidedServiceFromStaff</Text>
    </View>
  );
};

export default ProvidedServiceFromStaff;
