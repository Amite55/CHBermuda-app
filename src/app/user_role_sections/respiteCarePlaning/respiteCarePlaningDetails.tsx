import {
  IconBlueTick,
  IconDuration,
  IconPlusBlack,
  IconRightCornerArrowWhite,
} from "@/assets/icons";
import { ImgRespiteCarePlan } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const RespiteCarePlaningDetails = () => {
  const [selectedAddons, setSelectedAddons] = React.useState<string>("");
  return (
    <ScrollView
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={[tw` px-5 flex-grow justify-between`]}
    >
      <View style={tw`pb-2`}>
        <BackTitleButton
          title={"Respite Services"}
          onPress={() => router.back()}
        />
        <Image
          contentFit="cover"
          style={tw`w-full h-40 rounded-3xl mt-3`}
          source={ImgRespiteCarePlan}
        />
        <View style={tw`flex-row justify-between items-center mt-4`}>
          <View style={tw`flex-row items-center gap-1 `}>
            <SvgXml xml={IconDuration} />
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              Duration: N/A
            </Text>
          </View>
          <Text style={tw`font-LufgaMedium text-xl text-black`}>
            $227
            <Text style={tw`font-LufgaRegular text-sm text-gray-500`}>
              / weekly
            </Text>
          </Text>
        </View>
        {/* ------------------ plan description ---------------- */}
        <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
          Lorem ipsum dolor sit amet consectetur. Dignissim vulputate elementum
          vitae magna id. Eu vulputate scelerisque tincidunt mi. Faucibus
          lobortis sed quis convallis massa nulla est eget ultricies. Quis
          fringilla sollicitudin posuere luctus et urna molestie et senectus.
          Eget purus odio in vestibulum tellus condimentum blandit fermentum.
        </Text>

        {/* --------------- available addons ------------- */}
        <Text style={tw`font-LufgaMedium text-xl text-black pt-3`}>
          Available add-ons
        </Text>

        {/* ------------- addons list ------------ */}
        <View style={tw`gap-3 mt-3`}>
          <TouchableOpacity
            onPress={() => {
              setSelectedAddons("Morning transition");
            }}
            activeOpacity={0.8}
            style={tw`flex-row items-center gap-2 bg-white rounded-xl py-2 px-3`}
          >
            <SvgXml
              xml={
                selectedAddons === "Morning transition"
                  ? IconBlueTick
                  : IconPlusBlack
              }
            />
            <Text style={tw`font-LufgaRegular text-black text-base`}>
              Morning transition
            </Text>
            <View style={tw`w-1.5 h-1.5 rounded-full bg-slate-400 `} />
            <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
              $15.00
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedAddons("Couples care");
            }}
            activeOpacity={0.8}
            style={tw`flex-row items-center gap-2 bg-white rounded-xl py-2 px-3`}
          >
            <SvgXml
              xml={
                selectedAddons === "Couples care" ? IconBlueTick : IconPlusBlack
              }
            />
            <Text style={tw`font-LufgaRegular text-black text-base`}>
              Couples care
            </Text>
            <View style={tw`w-1.5 h-1.5 rounded-full bg-slate-400 `} />
            <Text style={tw`font-LufgaMedium text-base text-black `}>
              $15.00
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {!selectedAddons && (
        <PrimaryButton
          buttonText="Book now"
          buttonTextStyle={tw`font-LufgaMedium text-base`}
          rightIcon={IconRightCornerArrowWhite}
          buttonContainerStyle={tw`mt-2 h-10 `}
          onPress={() => {
            router.push(
              "/user_role_sections/placingAdminOrderService/adminPlacingOrder"
            );
          }}
        />
      )}

      {/* =================== you have an selected addon ================= */}

      {selectedAddons && (
        <View
          style={[
            tw`absolute bottom-0 flex-1 left-0 right-0 bg-white p-3 shadow flex-row justify-between items-center`,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          ]}
        >
          <View>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>$ 275</Text>
            <View style={tw`flex-row items-center gap-2 `}>
              <Text style={tw`font-LufgaMedium text-base text-gray-500 `}>
                + $15.00
              </Text>
              {/* <View style={tw`w-1.5 h-1.5 rounded-full bg-slate-400 `} /> */}
              <Text style={tw`font-LufgaMedium text-base text-gray-500 `}>
                1 add-on
              </Text>
            </View>
          </View>
          {/* <PrimaryButton */}
          <PrimaryButton
            buttonText="Book now"
            buttonTextStyle={tw`font-LufgaMedium text-base`}
            // rightIcon={IconRightCornerArrowWhite}
            buttonContainerStyle={tw`w-32 rounded-md h-10 `}
            onPress={() => {
              router.push(
                "/user_role_sections/placingAdminOrderService/adminPlacingOrder"
              );
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default RespiteCarePlaningDetails;
