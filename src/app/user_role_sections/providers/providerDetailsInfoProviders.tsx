import { IconCrossWhite, IconLocation, IconRatingStar } from "@/assets/icons";
import { ImgPlaceholderProfile, ImgServiceImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useGetThirdPartyProviderDetailsQuery } from "@/src/redux/Api/userHomeSlices";
import { updateBooking } from "@/src/redux/appStore/bookingSlices";
import ServicePackageListSkeleton from "@/src/Skeletion/ServicePackageListSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { SvgXml } from "react-native-svg";
import { useDispatch } from "react-redux";

const ProviderDetailsInfoProviders = () => {
  const { id } = useLocalSearchParams();
  const detailsBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [serviceDetails, setServiceDetails] = React.useState<any>(null);
  const dispatch = useDispatch();

  // =================== api end point ===================
  const { data: providerDetailsData, isLoading: isProviderDetailsDataLoading } =
    useGetThirdPartyProviderDetailsQuery(id);

  const handleDetailsModalOpen = useCallback(async () => {
    detailsBottomSheetModalRef.current?.present();
  }, []);
  const handleDetailsModalClose = useCallback(() => {
    detailsBottomSheetModalRef.current?.dismiss();
  }, []);

  // ================== if user selected service then show service details in modal ==================
  const handleServiceDetailsModal = useCallback(
    async (id: string) => {
      if (!id) return null;
      try {
        const findData = await providerDetailsData?.data?.packages?.find(
          (item: any) => String(item?.id) === String(id),
        );
        if (findData) {
          setServiceDetails(findData);
          handleDetailsModalOpen();
        }
      } catch (error: any) {
        console.log(error, "Single service not get>>>>>>>>");
      }
    },
    [providerDetailsData],
  );

  // ======================== max rating count array =======================
  const ratingCounts = [
    providerDetailsData?.data?.rating?.total_five_stars || 0,
    providerDetailsData?.data?.rating?.total_four_stars || 0,
    providerDetailsData?.data?.rating?.total_three_stars || 0,
    providerDetailsData?.data?.rating?.total_two_stars || 0,
    providerDetailsData?.data?.rating?.total_one_stars || 0,
  ];
  const maxRatingCount = Math.max(...ratingCounts, 1);
  const fiveStarProgress =
    (providerDetailsData?.data?.rating?.total_five_stars || 0) / maxRatingCount;
  const fourStarProgress =
    (providerDetailsData?.data?.rating?.total_four_stars || 0) / maxRatingCount;
  const threeStarProgress =
    (providerDetailsData?.data?.rating?.total_three_stars || 0) /
    maxRatingCount;
  const twoStarProgress =
    (providerDetailsData?.data?.rating?.total_two_stars || 0) / maxRatingCount;
  const oneStarProgress =
    (providerDetailsData?.data?.rating?.total_one_stars || 0) / maxRatingCount;

  // ============== handle state store in redux and navigate to scheduling page ==============
  const handleStateUpdate = () => {
    try {
      dispatch(
        updateBooking({
          providerInfo: {
            providerId: providerDetailsData?.data?.provider?.id,
            providerName: providerDetailsData?.data?.provider?.name,
            providerLocation: providerDetailsData?.data?.provider?.address,
            providerImage: providerDetailsData?.data?.provider?.avatar,
            totalOrders:
              providerDetailsData?.data?.provider?.completed_orders || 0,
            rating: providerDetailsData?.data?.rating?.avg_rating || 0,
            review: providerDetailsData?.data?.rating?.total_reviews || 0,
          },
          packageInfo: {
            id: serviceDetails?.id,
            title: serviceDetails?.title,
            price: serviceDetails?.price,
          },
        }),
      );

      handleDetailsModalClose();
      router.push(
        "/user_role_sections/placingAdminOrderService/adminPlacingOrder",
      );
    } catch (error) {
      console.log(
        error,
        "Provider data state not included in third party provider>>",
      );
    }
  };

  // ================== loading state =================
  if (isProviderDetailsDataLoading) {
    return <ServicePackageListSkeleton CARD_COUNT={2} />;
  }

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={tw`flex-1 bg-bgBaseColor`}
        contentContainerStyle={tw` pb-4 px-5 bg-bgBaseColor  `}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <BackTitleButton
          title="Provider details info"
          onPress={() => router.back()}
        />
        {/* =--------------------------- provider info --------------------------- */}
        <TouchableOpacity
          activeOpacity={0.7}
          disabled
          style={tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl mt-2`}
        >
          <View style={tw`relative`}>
            <Image
              style={tw`w-16 h-16 rounded-full`}
              source={providerDetailsData?.data?.provider?.avatar}
              contentFit="contain"
              placeholder={ImgPlaceholderProfile}
            />
          </View>
          <View>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                {providerDetailsData?.data?.provider?.name?.length > 23
                  ? `${providerDetailsData?.data?.provider?.name?.slice(0, 23)}...`
                  : providerDetailsData?.data?.provider?.name}
              </Text>
              <Text
                style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
              >
                {providerDetailsData?.data?.provider?.completed_orders || 0}{" "}
                order
              </Text>
            </View>

            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              Joined{" "}
              {helpers.formatDate(
                providerDetailsData?.data?.provider?.created_at,
              )}
            </Text>
          </View>
        </TouchableOpacity>
        {/* ============================= provider service list section ============================= */}
        <View>
          {providerDetailsData?.data?.packages?.map((item) => {
            return (
              <View
                key={item.id}
                style={tw`bg-white rounded-xl mt-4 p-4 flex-row justify-between items-center`}
              >
                <View style={tw`flex-shrink`}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={tw`font-LufgaMedium text-base text-black`}
                  >
                    {item?.title}
                  </Text>
                  <Text style={tw`font-LufgaMedium text-base text-black`}>
                    $ {item?.price}
                  </Text>
                  <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                    Duration: {item?.duration} hours
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleServiceDetailsModal(item?.id)}
                  style={tw`px-4 py-2 bg-secondaryBtn2 rounded-lg`}
                  activeOpacity={0.7}
                >
                  <Text style={tw`font-LufgaRegular text-sm text-primaryBtn`}>
                    See details
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* --------------------------- provider location --------------------------- */}
        <View style={tw`flex-row items-center gap-4  my-3`}>
          <SvgXml xml={IconLocation} />
          <View style={tw`gap-1`}>
            <Text style={tw`font-LufgaMedium text-base text-black`}>
              Location
            </Text>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              {providerDetailsData?.data?.provider?.address}
            </Text>
          </View>
        </View>
        {/* ------------------- provider rating and review ------------------ */}

        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconRatingStar} />
          <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
            {providerDetailsData?.data?.rating?.avg_rating || 0}
          </Text>
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            ({providerDetailsData?.data?.rating?.total_reviews || 0} reviews)
          </Text>
        </View>
        {/* ============================= rating section ============================ */}
        <View style={tw`my-6 bg-white rounded-2xl p-4 gap-2`}>
          {/* --------------------- rating excellent --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                5.0
              </Text>
              <Progress.Bar
                progress={fiveStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Excellent
            </Text>
          </View>
          {/* --------------------- rating Best --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                4.0
              </Text>
              <Progress.Bar
                progress={fourStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Best
            </Text>
          </View>
          {/* --------------------- rating Better --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                3.0
              </Text>
              <Progress.Bar
                progress={threeStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Better
            </Text>
          </View>
          {/* --------------------- rating Good --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                2.0
              </Text>
              <Progress.Bar
                progress={twoStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Good
            </Text>
          </View>
          {/* --------------------- rating Poor --------------------- */}
          <View style={tw`gap-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1 `}>
              <SvgXml xml={IconRatingStar} />
              <Text
                style={tw`font-LufgaMedium text-base text-regularText pr-2`}
              >
                1.0
              </Text>
              <Progress.Bar
                progress={oneStarProgress}
                color="#183E9F"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                animated={true}
              />
            </View>
            <Text
              style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl p-2`}
            >
              Poor
            </Text>
          </View>
        </View>
        {/* ========================== Reviews section ========================== */}
        <Text style={tw`font-LufgaMedium text-base text-regularText mb-2`}>
          Reviews
        </Text>
        <FlatList
          data={providerDetailsData?.data?.reviews}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={tw`gap-4 pb-2 `}
          renderItem={({ item }) => {
            return (
              <View style={tw` bg-white rounded-2xl gap-4 w-80`}>
                <Text style={tw`font-LufgaRegular text-sm text-black p-4 `}>
                  {item?.review}
                </Text>
                <View
                  style={tw`flex-row items-center justify-between bg-slate-200 p-2 rounded-xl`}
                >
                  <View>
                    <Text style={tw`font-LufgaMedium text-base text-black`}>
                      {item?.user?.name}
                    </Text>
                  </View>
                  <Image
                    source={item?.user?.avatar}
                    style={tw`w-12 h-12 rounded-full `}
                    contentFit="cover"
                    placeholder={ImgPlaceholderProfile}
                  />
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
      {/* ================================== service modal show =============================== */}
      <BottomSheetModal
        ref={detailsBottomSheetModalRef}
        snapPoints={["90%"]}
        enableDynamicSizing={false}
        index={0}
        containerStyle={tw`bg-gray-500 bg-opacity-20`}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw` pb-10 bg-white`}
          style={tw`flex-1`}
        >
          {/* ----------------- header title part ---------------- */}
          <View
            style={tw`flex-row items-center justify-between bg-primaryBtn py-2 px-4 rounded-t-2xl`}
          >
            <View />
            <Text style={tw`font-LufgaMedium text-sm text-white`}>
              Service details
            </Text>
            <TouchableOpacity onPress={() => handleDetailsModalClose()}>
              <SvgXml xml={IconCrossWhite} />
            </TouchableOpacity>
            {/* ================ service details part ================ */}
          </View>
          <View style={tw`p-4`}>
            <Image
              style={tw`w-full h-56 rounded-xl `}
              source={serviceDetails?.icon}
              contentFit="cover"
              placeholder={ImgServiceImage}
            />

            {/* price */}
            <View style={tw`flex-row gap-4 items-center justify-between mt-4`}>
              <Text
                style={tw`flex-shrink font-LufgaMedium text-base text-black`}
              >
                {serviceDetails?.title}
              </Text>
              <Text style={tw`font-LufgaMedium text-xl text-black`}>$65</Text>
            </View>
            {/* description */}
            <View style={tw`gap-2 mt-4`}>
              <View style={tw`flex-row items-start gap-2 `}>
                <View style={tw`w-2 h-2 rounded-full bg-black mt-1`} />

                <Text style={tw`font-LufgaRegular text-sm text-black flex-1`}>
                  Duration: {serviceDetails?.duration} hours
                </Text>
              </View>

              <Text
                style={tw`font-LufgaRegular text-sm text-center text-black flex-1`}
              >
                {serviceDetails?.description}
              </Text>
            </View>

            {/* Included Services: */}

            <Text style={tw`font-LufgaMedium text-base text-black pt-4`}>
              Included Services:
            </Text>
            <View style={tw`gap-2 mt-4 pl-3`}>
              {serviceDetails?.included_services?.map((item: string) => {
                return (
                  <View key={item} style={tw`flex-row items-start gap-2 `}>
                    <View style={tw`w-2 h-2 rounded-full bg-black mt-1`} />

                    <Text
                      style={tw`font-LufgaRegular text-sm text-black flex-1`}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            {/* =============== select button =============== */}
            <PrimaryButton
              buttonText="Select"
              buttonTextStyle={tw`font-LufgaMedium text-base`}
              onPress={() => {
                handleStateUpdate();
                // router.push(
                //   "/user_role_sections/placingProviderOrderService/providerOrderDateTimePlacing",
                // );
              }}
              buttonContainerStyle={tw`mt-6`}
            />
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ProviderDetailsInfoProviders;
