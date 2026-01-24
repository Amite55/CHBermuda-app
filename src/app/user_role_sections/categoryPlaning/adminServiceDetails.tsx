import { IconGetterThen } from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetAdminPackageDetailsQuery } from "@/src/redux/Api/userHomeSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AdminServiceDetails = () => {
  const { category, id, title } = useLocalSearchParams();
  // ============== api end point ==================
  const { data: adminServiceDetails, isLoading: isAdminServiceDetailsLoading } =
    useGetAdminPackageDetailsQuery(id);

  // ================ if loading state
  if (isAdminServiceDetailsLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={1} />;
  }
  return (
    <ScrollView
      contentContainerStyle={tw` pb-2 px-5 bg-bgBaseColor  flex-grow justify-between`}
      style={tw`flex-1 bg-bgBaseColor`}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={tw`gap-2`}>
        <BackTitleButton
          title={category ? title.toString() : "Services"}
          onPress={() => router.back()}
        />
        <Image
          source={adminServiceDetails?.data?.icon}
          style={tw`w-full h-40 rounded-3xl mt-2`}
          contentFit="cover"
        />
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={tw`font-LufgaMedium text-base text-black`}
        >
          {adminServiceDetails?.data?.title}
        </Text>
        <Text style={tw`font-LufgaMedium text-base text-black`}>
          ${adminServiceDetails?.data?.price}{" "}
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            /{adminServiceDetails?.data?.type}
          </Text>
        </Text>
        {/* ------------------ plan description ---------------- */}
        <Text style={tw`font-LufgaRegular text-sm text-subText `}>
          {adminServiceDetails?.data?.description}
        </Text>

        {/* Included Services: */}
        <Text style={tw`font-LufgaMedium text-base text-black -mb-3 mt-2`}>
          Included Services:
        </Text>
        <View style={tw`gap-1 mb-4`}>
          {adminServiceDetails?.data?.included_services?.map((line, index) => (
            <View key={index} style={tw`flex-row items-center gap-2 mt-2`}>
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

        {/* =    all provider info    in this service   */}
        {adminServiceDetails?.data?.providers?.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              router.push({
                pathname: "/user_role_sections/providers/provider",
                params: { id: id },
              });
            }}
            style={tw`flex-row justify-between items-center `}
          >
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              {adminServiceDetails?.data?.providers?.length} providers
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <View style={tw`flex-row items-center `}>
                {adminServiceDetails?.data?.providers?.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      style={tw`w-10 h-10 rounded-full  -ml-5`}
                      source={item?.avatar}
                      contentFit="contain"
                      placeholder={ImgPlaceholderProfile}
                    />
                  );
                })}
              </View>
              <SvgXml xml={IconGetterThen} />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <PrimaryButton
        buttonText="Subscribe"
        buttonTextStyle={tw`font-LufgaMedium text-base`}
        buttonContainerStyle={tw`mt-2 h-12`}
        // onPress={() => {
        //   router.push("/user_role_sections/cart");
        // }}
      />
    </ScrollView>
  );
};

export default AdminServiceDetails;
