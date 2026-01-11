import {
  IconAdminServiceIcon,
  IconProvider,
  IconRightTopConnerArrow,
  IconUser,
} from "@/assets/icons";
import { ImgChooseRoleBG, ImgChooseRoleBottomBG } from "@/assets/image";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
const ChooseRole = () => {
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleSetRole = async (role: string) => {
    await AsyncStorage.setItem("role", JSON.stringify(role));
    if (role === "USER") {
      router.replace(`/auth/singIn`);
    }
  };

  // ================ Bottom Sheet ================
  const handleProviderTypeModalOpen = useCallback(async () => {
    BottomSheetModalRef.current?.present();
  }, []);
  const handleProviderTypeModalClose = useCallback(() => {
    BottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-bgBaseColor`}
      >
        <Image style={tw`w-full h-80`} source={ImgChooseRoleBG} />
        <View
          style={tw`px-5 gap-6 py-4
        `}
        >
          <Text
            style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
          >
            Compassionate In-Home Care for Your Loved Ones
          </Text>
          <Text
            style={tw`font-LufgaRegular text-base text-regularText text-center`}
          >
            At Caring Hearts Bermuda, we believe that every individual deserves
            compassionate, personalized care that allows them to live with
            dignity, independence, and comfort in the place they call home.
          </Text>
        </View>

        <ImageBackground style={tw`w-full h-96`} source={ImgChooseRoleBottomBG}>
          <View style={tw`px-5 gap-4 justify-center flex-1`}>
            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              delayPressOut={0}
              delayLongPress={1000}
              onPress={() => {
                handleSetRole("USER");
              }}
              style={tw`flex-row items-center justify-between bg-slate-200 p-4 rounded-3xl border border-white bg-opacity-50`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <SvgXml xml={IconUser} />
                <Text style={tw`font-LufgaMedium text-lg text-regularText`}>
                  User
                </Text>
              </View>

              <SvgXml xml={IconRightTopConnerArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              delayPressOut={0}
              delayLongPress={1000}
              onPress={() => {
                handleSetRole("PROVIDER");
                handleProviderTypeModalOpen();
              }}
              style={tw`flex-row items-center justify-between bg-slate-200 p-4 rounded-3xl border border-white bg-opacity-50`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <SvgXml xml={IconProvider} />
                <Text style={tw`font-LufgaMedium text-lg text-regularText`}>
                  providers
                </Text>
              </View>

              <SvgXml xml={IconRightTopConnerArrow} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
      {/* ================== bottom sheet for provider type ================= */}
      <BottomSheetModal
        ref={BottomSheetModalRef}
        enableDynamicSizing={false}
        snapPoints={["40%"]}
        containerStyle={tw` bg-gray-500 bg-opacity-20`}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={tw`  px-4`}>
          <View style={tw`gap-4 `}>
            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              delayPressOut={0}
              delayLongPress={1000}
              onPress={async () => {
                await AsyncStorage.setItem("providerTypes", "ADMIN_PROVIDER");
                handleProviderTypeModalClose();
                router.push("/auth/singIn");
              }}
              style={tw`flex-row items-center justify-between bg-slate-200 p-4 rounded-3xl border border-white bg-opacity-50`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <SvgXml xml={IconAdminServiceIcon} />
                <Text style={tw`font-LufgaMedium text-lg text-regularText`}>
                  Admin provider
                </Text>
              </View>

              <SvgXml xml={IconRightTopConnerArrow} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              delayPressIn={0}
              delayPressOut={0}
              delayLongPress={1000}
              onPress={async () => {
                await AsyncStorage.setItem("providerTypes", "SERVICE_PROVIDER");
                handleProviderTypeModalClose();
                router.push("/auth/singIn");
              }}
              style={tw`flex-row items-center justify-between bg-slate-200 p-4 rounded-3xl border border-white bg-opacity-50`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <SvgXml xml={IconProvider} />
                <Text style={tw`font-LufgaMedium text-lg text-regularText`}>
                  Service Provider
                </Text>
              </View>

              <SvgXml xml={IconRightTopConnerArrow} />
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default ChooseRole;
