import {
  IconBlueTick,
  IconDuration,
  IconPlusBlack,
  IconRightCornerArrowWhite,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useGetRespiteCarePackageDetailsQuery } from "@/src/redux/Api/userHomeSlices";
import { updateBooking } from "@/src/redux/appStore/bookingSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch } from "react-redux";

const RespiteCarePlaningDetails = () => {
  const { respiteId } = useLocalSearchParams();
  const [addonPrice, setAddonPrice] = React.useState(0);
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([]);
  const dispatch = useDispatch();

  const stateBookingData = () => {
    dispatch(
      updateBooking({
        booking_type: "respite_care",
        amount: addonPrice
          ? addonPrice + Number(respiteDetails?.data?.respite_care?.price || 0)
          : respiteDetails?.data?.respite_care?.price,
        respiteCarePackageDetails: {
          respiteCareId: respiteDetails?.data?.respite_care?.id,
          name: respiteDetails?.data?.respite_care?.title,
          addons: selectedAddons,
          respiteCareImage: respiteDetails?.data?.respite_care?.image,
        },
      }),
    );
  };

  // ==================== api end point ====================
  const { data: respiteDetails, isLoading: isRespiteDateLoading } =
    useGetRespiteCarePackageDetailsQuery(respiteId);

  // ================ handle select addon ==================
  const handleSelectAddon = (addon: any) => {
    setSelectedAddons((prevTitles) => {
      const isSelected = prevTitles.includes(addon.id);
      // price state update -------------------->
      setAddonPrice((prevPrice) =>
        isSelected
          ? prevPrice - Number(addon?.price || 0)
          : prevPrice + Number(addon?.price || 0),
      );

      return isSelected
        ? prevTitles.filter((t) => t !== addon.id)
        : [...prevTitles, addon.id];
    });
  };

  if (isRespiteDateLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={0} />;
  }

  // const result = selectedAddons.reduce((acc, value, index) => {
  //   acc[`id[${index + 1}]`] = value;
  //   return acc;
  // }, {});

  const respiteDetailsData = {
    serviceImage: respiteDetails?.data?.respite_care?.image,
    serviceName: respiteDetails?.data?.respite_care?.title,
    respiteId: respiteId,
    ...(selectedAddons.length > 0 && { respiteAddons: selectedAddons }),
    ...(addonPrice > 0
      ? {
          price: Number(respiteDetails?.data?.respite_care?.price) + addonPrice,
        }
      : { price: respiteDetails?.data?.respite_care?.price }),
  };

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
          source={respiteDetails?.data?.respite_care?.image}
        />
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={tw`font-LufgaMedium text-base text-black pt-3`}
        >
          {respiteDetails?.data?.respite_care?.title}
        </Text>
        <View style={tw`flex-row justify-between items-center `}>
          <View style={tw`flex-row items-center gap-1 `}>
            <SvgXml xml={IconDuration} />
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              Duration: {respiteDetails?.data?.respite_care?.duration} hour
            </Text>
          </View>
          <Text style={tw`font-LufgaMedium text-xl text-black`}>
            $ {respiteDetails?.data?.respite_care?.price}
            <Text style={tw`font-LufgaRegular text-sm text-gray-500`}>
              / {respiteDetails?.data?.respite_care?.type}
            </Text>
          </Text>
        </View>
        {/* ------------------ plan description ---------------- */}
        <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
          {respiteDetails?.data?.respite_care?.description}
        </Text>

        {/* --------------- available addons ------------- */}
        {respiteDetails?.data?.available_addons?.length > 0 ? (
          <Text style={tw`font-LufgaMedium text-xl text-black pt-3`}>
            Available add-ons
          </Text>
        ) : (
          <Text
            style={tw`font-LufgaMedium text-subText text-lg text-center mt-5`}
          >
            Not addons available
          </Text>
        )}
        {/* ------------- addons list ------------ */}
        {respiteDetails?.data?.available_addons?.length > 0 &&
          respiteDetails?.data?.available_addons?.map((item) => (
            <View key={item?.id} style={tw`gap-3 mt-3`}>
              <TouchableOpacity
                onPress={() => {
                  handleSelectAddon(item);
                }}
                activeOpacity={0.8}
                style={tw`flex-row items-center gap-2 bg-white rounded-xl py-2 px-3`}
              >
                <SvgXml
                  xml={
                    selectedAddons.includes(item?.id)
                      ? IconBlueTick
                      : IconPlusBlack
                  }
                />
                <Text style={tw`font-LufgaRegular text-black text-base`}>
                  {item?.title}
                </Text>
                <View style={tw`w-1.5 h-1.5 rounded-full bg-slate-400 `} />
                <Text style={tw`font-LufgaMedium text-base text-black `}>
                  ${item?.price}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>

      {selectedAddons?.length === 0 && (
        <PrimaryButton
          buttonText="Book now"
          buttonTextStyle={tw`font-LufgaMedium text-base`}
          rightIcon={IconRightCornerArrowWhite}
          buttonContainerStyle={tw`mt-2 h-10 `}
          onPress={() => {
            stateBookingData();
            router.push(
              "/user_role_sections/placingAdminOrderService/adminPlacingOrder",
            );
          }}
        />
      )}

      {/* =================== you have an selected addon ================= */}
      {selectedAddons?.length > 0 && (
        <View
          style={[
            tw`absolute bottom-0 flex-1 left-0 right-0 bg-white px-5 py-3 shadow flex-row justify-between items-center`,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          ]}
        >
          <View>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>
              $ {respiteDetails?.data?.respite_care?.price}
            </Text>
            <View style={tw`flex-row items-center gap-2 `}>
              <Text style={tw`font-LufgaMedium text-base text-gray-500 `}>
                + ${addonPrice}
              </Text>
              {/* <View style={tw`w-1.5 h-1.5 rounded-full bg-slate-400 `} /> */}
              <Text style={tw`font-LufgaMedium text-base text-gray-500 `}>
                {selectedAddons?.length} add-on
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
              stateBookingData();
              router.push(
                "/user_role_sections/placingAdminOrderService/adminPlacingOrder",
              );
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default RespiteCarePlaningDetails;
