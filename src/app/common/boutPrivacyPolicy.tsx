import { ImgPrivacyPolicy } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetPagesQuery } from "@/src/redux/Api/userRole/accountSlices";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";

const BoutPrivacyPolicy = () => {
  const { width } = useWindowDimensions();

  // ================= api end  point ==================
  const { data, isLoading } = useGetPagesQuery("Privacy Policy");
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor `}
      contentContainerStyle={tw`pb-5 px-5`}
    >
      <BackTitleButton title={"Privacy policy"} onPress={() => router.back()} />

      <Image
        contentFit="contain"
        style={tw`w-full h-48 my-4`}
        source={ImgPrivacyPolicy}
      />

      {/*  Render backend HTML here */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <RenderHTML contentWidth={width} source={{ html: data?.data?.text }} />
      )}
    </ScrollView>
  );
};

export default BoutPrivacyPolicy;
