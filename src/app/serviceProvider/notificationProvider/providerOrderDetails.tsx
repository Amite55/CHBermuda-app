import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const ProviderOrder = () => {
  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-bgBaseColor `}
        contentContainerStyle={tw`pb-5 px-5`}
      >
        <BackTitleButton title={status} onPress={() => router.back()} />

        <View>
          <Text>ProviderOrder</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default ProviderOrder;
