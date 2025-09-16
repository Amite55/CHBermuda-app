import {
  IconProvider,
  IconRightTopConnerArrow,
  IconUser,
} from "@/assets/icons";
import { ImgChooseRoleBG, ImgChooseRoleBottomBG } from "@/assets/image";
import { Image, ImageBackground } from "expo-image";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
const ChooseRole = () => {
  return (
    <ScrollView style={tw`flex-1 bg-bgBaseColor`}>
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
            style={tw`flex-row items-center justify-between bg-slate-200 p-4 rounded-3xl border border-white`}
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
            style={tw`flex-row items-center justify-between bg-slate-200 p-4 rounded-3xl border border-white`}
          >
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconProvider} />
              <Text style={tw`font-LufgaMedium text-lg text-regularText`}>
                Service provider
              </Text>
            </View>

            <SvgXml xml={IconRightTopConnerArrow} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ChooseRole;
