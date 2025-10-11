import tw from "@/src/lib/tailwind";
import React from "react";
import { FlatList, Text, View } from "react-native";

const MyService = () => {
  return (
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 `}
      style={tw`flex-1 bg-bgBaseColor`}
      renderItem={() => (
        <View>
          <Text>MyService</Text>
        </View>
      )}
    />
  );
};

export default MyService;
