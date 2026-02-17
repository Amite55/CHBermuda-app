import { ImgAbout } from "@/assets/image";
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
import RenderHtml from "react-native-render-html";

const BoutAboutUs = () => {
  const { width } = useWindowDimensions();

  // ================= api end  point ==================
  const { data, isLoading } = useGetPagesQuery("About Us");
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor `}
      contentContainerStyle={tw`pb-5 px-5`}
    >
      <BackTitleButton title={"About Us"} onPress={() => router.back()} />

      <Image
        contentFit="contain"
        style={tw`w-full h-48 my-4`}
        source={ImgAbout}
      />
      {/*  Render backend HTML here */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <RenderHtml contentWidth={width} source={{ html: data?.data?.text }} />
      )}
    </ScrollView>
  );
};

export default BoutAboutUs;
