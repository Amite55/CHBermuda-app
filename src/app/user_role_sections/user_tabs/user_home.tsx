import { IconRightCornerArrowWhite } from "@/assets/icons";
import {
  ImgBennerBG,
  ImgBennerImage,
  ImgExploreBanner,
  ImgG,
  ImgProfileImg,
} from "@/assets/image";
import { CategoryData, ServicesData } from "@/src/components/AllData";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const User_home = () => {
  return (
    <ScrollView
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-56`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ImageBackground style={tw`relative w-full h-1/5 `} source={ImgG}>
        {/* ------------------- user header part ---------------- */}
        <UserInfoHeader
          containerStyle={tw`px-5`}
          userName="Rohit"
          userImage={ImgProfileImg}
          cartOnPress={() => {
            router.push("/user_role_sections/cart");
          }}
          notificationOnPress={() => {
            router.push("/user_role_sections/notificationsUser/notifications");
          }}
          profileOnPress={() => {
            router.push("/user_role_sections/user_tabs/user_profile");
          }}
        />
      </ImageBackground>
      {/* ------------------------ promo banner section just for demo  ---------------- */}
      <ImageBackground
        imageStyle={tw`w-full h-full rounded-xl`}
        style={tw` h-36   rounded-3xl absolute right-1 left-1 top-30 mx-3  `}
        source={ImgBennerBG}
      >
        <View style={tw`relative`}>
          <View style={tw`gap-1 my-4 ml-4 `}>
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              Purchase plan
            </Text>
            <Text
              numberOfLines={2}
              style={tw`font-LufgaRegular text-sm text-black`}
            >
              Get a plan and enjoy unlimited {"\n"} caring services.
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/user_role_sections/user_tabs/explore");
              }}
              activeOpacity={0.7}
              style={tw`w-32 h-8 mt-2 z-30 bg-primaryBtn rounded-lg justify-center items-center`}
            >
              <Text style={tw`font-LufgaRegular text-sm text-white`}>
                Buy now
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            style={tw`absolute right-4 -top-8 w-24 h-44 `}
            source={ImgBennerImage}
          />
        </View>
      </ImageBackground>

      <View style={tw`flex-1 `}>
        {/* --------------------------- category section      ---------------- */}
        <Text style={tw`font-LufgaMedium text-xl text-regularText pt-20 px-4`}>
          Service categories
        </Text>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`gap-5 mt-3  px-4 `}
            data={CategoryData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(items) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (items.item.provider === "Respite care") {
                      router.push({
                        pathname:
                          "/user_role_sections/respiteCarePlaning/respiteCareAllPlan",
                        params: { category: items.item.name },
                      });
                    } else if (items.item.provider === "Admin") {
                      router.push({
                        pathname:
                          "/user_role_sections/categoryPlaning/adminProviderService",
                        params: { category: items.item.name },
                      });
                    } else {
                      router.push({
                        pathname:
                          "/user_role_sections/categoryPlaning/serviceProviderService",
                        params: { category: items.item.name },
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
                      source={items.item.image}
                    />
                  </View>
                  <Text
                    style={tw`font-LufgaRegular text-sm text-regularText pt-1`}
                  >
                    {items.item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* --------------------------- Services section      ---------------- */}
        <Text
          style={tw`font-LufgaMedium text-xl text-regularText  text-center pt-6 pb-2 px-4`}
        >
          Services
        </Text>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`gap-5 mt-2 pl-4 mb-10`}
            data={ServicesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={tw`bg-white  w-80 rounded-3xl p-4`}>
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
                            <Text
                              style={tw`font-LufgaMedium text-lg text-black`}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={tw`font-LufgaMedium text-lg text-subText`}
                            >
                              {item.providers} Providers
                            </Text>
                          </View>
                        </View>
                        <Text style={tw`font-LufgaMedium text-2xl text-black`}>
                          ${item.price}
                        </Text>
                      </View>

                      {/* Description */}
                      <Text
                        numberOfLines={2}
                        style={tw`font-LufgaMedium text-lg text-black text-center py-5`}
                      >
                        {item.description}
                      </Text>

                      {/* Included */}
                      <Text
                        style={tw`font-LufgaRegular text-base text-subText`}
                      >
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
                        router.push(
                          "/user_role_sections/categoryPlaning/serviceProviderService"
                        );
                      }}
                      buttonTextStyle={tw`text-lg font-LufgaMedium`}
                      buttonContainerStyle={tw`mt-4 h-10`}
                      buttonText="See Details"
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>

        {/* ========================================== Services section      ---------------- */}
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`gap-5 mt-2 pl-4`}
            data={ServicesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(items) => {
              return (
                <ImageBackground
                  style={tw`w-80 rounded-2xl `}
                  source={ImgExploreBanner}
                  contentPosition={"center"}
                  imageStyle={tw`w-full h-full rounded-xl`}
                  contentFit="fill"
                >
                  <View style={tw`flex-grow justify-between p-4`}>
                    <View />
                    <View>
                      <Text
                        style={tw`font-LufgaRegular text-base text-white text-center py-5`}
                      >
                        We offer four types of care services. Choose a plan that
                        suits you best and enjoy the freedom of care.
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          router.push(
                            "/user_role_sections/categoryPlaning/adminProviderService"
                          );
                        }}
                        activeOpacity={0.8}
                        style={tw`flex-row justify-between  items-center p-3 border border-white rounded-full  bg-white bg-opacity-40 `}
                      >
                        <Text style={tw`font-LufgaMedium text-lg text-white`}>
                          Explore all services
                        </Text>
                        <SvgXml xml={IconRightCornerArrowWhite} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default User_home;
