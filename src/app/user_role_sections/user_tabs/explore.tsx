import { IconCartWhite } from "@/assets/icons";
import { ImgG } from "@/assets/image";
import { CategoryData, ServicesData } from "@/src/components/AllData";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const Explore = () => {
  const RenderHeader = () => {
    return (
      <ImageBackground style={[tw` w-full h-36 `]} source={ImgG}>
        {/* ------------------- user header part ---------------- */}
        <UserInfoHeader containerStyle={tw`px-5`} />
        <Text
          style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
        >
          Explore
        </Text>
      </ImageBackground>
    );
  };
  // =-======================= footer part ======================

  const RenderFooter = () => {
    return (
      <View>
        <Text
          style={tw`font-LufgaMedium text-xl text-center text-regularText pt-4`}
        >
          Personalized Add-On Bundles
        </Text>

        {/* Essential Comfort Bundle */}
        <View style={tw` items-center gap-4 py-8`}>
          {ServicesData.map((item, index) => {
            return (
              <View key={index} style={tw`bg-white w-[95%] rounded-3xl p-4`}>
                <View style={tw`flex-grow justify-between`}>
                  {/* Header */}
                  <View>
                    <View style={tw`flex-row justify-between items-center`}>
                      <View style={tw`flex-row items-center gap-2`}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={tw`h-14 w-14 rounded-full bg-stone-200 items-center justify-center`}
                        >
                          <Image
                            style={tw`w-10 h-10`}
                            source={item.image}
                            contentFit="contain"
                          />
                        </TouchableOpacity>
                        <View>
                          <Text style={tw`font-LufgaMedium text-xs text-black`}>
                            {item.title}
                          </Text>
                          <Text
                            style={tw`font-LufgaMedium text-sm text-subText`}
                          >
                            {item.providers} Providers
                          </Text>
                        </View>
                      </View>
                      <View style={tw`flex-row items-center `}>
                        <Text style={tw`font-LufgaMedium text-lg text-black`}>
                          ${item.price}
                        </Text>
                        <Text
                          style={tw`font-LufgaMedium text-base text-subText`}
                        >
                          /month
                        </Text>
                      </View>
                    </View>

                    {/* Description */}
                    <Text
                      numberOfLines={2}
                      style={tw`font-LufgaMedium text-base text-black  py-5`}
                    >
                      {item.description}
                    </Text>

                    {/* Included */}
                    <Text style={tw`font-LufgaRegular text-base text-subText`}>
                      Included
                    </Text>
                    <View style={tw`gap-2 mb-4`}>
                      {item?.included?.map((line, index) => (
                        <View
                          key={index}
                          style={tw`flex-row items-center gap-2 mt-2`}
                        >
                          <View style={tw`w-2 h-2 rounded-full bg-black`} />
                          <Text
                            numberOfLines={2}
                            style={tw`font-LufgaRegular text-sm text-black flex-1`}
                          >
                            {line}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Button at bottom */}
                  <PrimaryButton
                    onPress={() => {
                      router.push("/user_role_sections/cart");
                    }}
                    buttonTextStyle={tw`text-lg font-LufgaMedium`}
                    buttonContainerStyle={tw`mt-4 h-10`}
                    leftIcon={IconCartWhite}
                    buttonText="Add to Cart"
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={CategoryData}
      numColumns={3} // 3 items per row
      keyExtractor={(items) => items.id.toString()}
      contentContainerStyle={tw` pb-6 bg-bgBaseColor`}
      columnWrapperStyle={tw`justify-between mb-6 px-5`}
      ListHeaderComponentStyle={tw``}
      ListFooterComponentStyle={tw``}
      ListHeaderComponent={RenderHeader}
      ListFooterComponent={RenderFooter}
      renderItem={(items) => {
        return (
          <TouchableOpacity
            onPress={() => {
              items.item.provider === "Admin"
                ? router.push({
                    pathname:
                      "/user_role_sections/categoryPlaning/adminProviderService",
                    params: { category: items.item.name },
                  })
                : router.push({
                    pathname:
                      "/user_role_sections/categoryPlaning/serviceProviderService",
                    params: { category: items.item.name },
                  });
            }}
            activeOpacity={0.7}
          >
            <View
              style={tw`bg-white h-20 w-20 rounded-full items-center justify-center`}
            >
              <Image
                contentFit="contain"
                style={tw`w-10 h-10`}
                source={items.item.image}
              />
            </View>
            <Text style={tw`font-LufgaRegular text-sm text-regularText pt-1`}>
              {items.item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Explore;
