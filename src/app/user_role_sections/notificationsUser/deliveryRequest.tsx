import { ImgProfileImg, ImgService } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import ProviderCard from "@/src/components/ProviderCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const DeliveryRequest = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor px-5`}
    >
      <BackTitleButton
        title="Delivery  request"
        onPress={() => router.back()}
      />

      {/* ============== Order Details Status ============== */}

      <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
        Service
      </Text>
      <MenuCard
        titleText="Crystal Comfort Plan"
        subTitleText="Number of order in this month: 2"
        image={ImgProfileImg}
        containerStyle={tw` bg-white`}
      />
      {/* = ----------------- provider content ---------------- */}

      <Text style={tw`font-LufgaSemiBold text-base text-black`}>Provider</Text>
      <ProviderCard
        containerStyle={tw`bg-white`}
        image={ImgProfileImg}
        title="John Doe"
        subTitle="Crystal Comfort Plan"
        ratings={4.5}
        reviews={10}
        totalOrder={12}
      />

      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={tw`gap-3 py-4 `}
        renderItem={() => (
          <Image source={ImgService} style={tw`w-28 h-28 rounded-xl`} />
        )}
      />

      <Text style={tw`font-LufgaSemiBold text-base text-black`}>Message</Text>

      <View style={tw` bg-white p-3 rounded-2xl`}>
        <Text style={tw`font-LufgaRegular text-sm text-black`}>
          Lorem ipsum dolor sit amet consectetur. Morbi volutpat urna justo odio
          enim mattis non velit vulputate. Porttitor a auctor sit eu. Laoreet
          nunc et nec dolor. Pharetra aliquet eu neque justo eget eget. Pharetra
          facilisis semper tempus fermentum. Maecenas urna sodales dapibus
          consectetur mi convallis. Lectus sit nam vel nunc congue nunc amet
          eros purus.
        </Text>
      </View>
    </ScrollView>
  );
};

export default DeliveryRequest;
