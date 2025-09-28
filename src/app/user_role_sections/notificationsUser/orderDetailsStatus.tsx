import {
  IconCartWhite,
  IconCrossRed,
  IconCrossWhite,
  IconMessage,
  IconPendingStatus,
  IconRightCornerArrowWhite,
  IconSuccess,
  IconTellPhone,
} from "@/assets/icons";
import { ImgProfileImg, ImgService } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import ProviderCard from "@/src/components/ProviderCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";

const OrderDetailsStatus = () => {
  const [rating, setRating] = useState(0);
  const { status } = useLocalSearchParams();

  const ratingBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleRatingModalOpen = useCallback(async () => {
    ratingBottomSheetModalRef.current?.present();
  }, []);
  const handleRatingModalClose = useCallback(() => {
    ratingBottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-bgBaseColor `}
        contentContainerStyle={tw`pb-5 px-5`}
      >
        <BackTitleButton title={status} onPress={() => router.back()} />

        {/* ============== Order Details Status ============== */}

        <View>
          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            Service
          </Text>
          <MenuCard
            titleText="Crystal Comfort Plan"
            subTitleText="Number of order in this month: 2"
            image={ImgProfileImg}
            containerStyle={tw` bg-white`}
          />
          {/* = ----------------- provider content ---------------- */}
          <View style={tw`flex-row items-center justify-between pt-6 pb-3`}>
            <Text style={tw`font-LufgaSemiBold text-base text-black`}>
              Provider
            </Text>
            {status === "approved" && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`w-10 h-10 bg-slate-300 rounded-xl items-center justify-center`}
              >
                <SvgXml xml={IconMessage} />
              </TouchableOpacity>
            )}
          </View>
          <ProviderCard
            containerStyle={tw`bg-white`}
            image={ImgProfileImg}
            title="John Doe"
            subTitle="Crystal Comfort Plan"
            ratings={4.5}
            reviews={10}
            totalOrder={12}
          />

          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            Billing information
          </Text>

          {/* ==================== user info details ================== */}
          <View style={tw` bg-white p-3 rounded-2xl`}>
            <View>
              <Text style={tw`font-LufgaMedium text-lg text-black`}>Name</Text>
              <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                Mr. Lopez
              </Text>
            </View>
            <View>
              <Text style={tw`font-LufgaMedium text-lg text-black`}>Email</Text>
              <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                example@gmail.com
              </Text>
            </View>
            <View>
              <Text style={tw`font-LufgaMedium text-lg text-black`}>
                Location
              </Text>
              <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                Dhaka, Bangladesh
              </Text>
            </View>
          </View>

          <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
            Scheduled time
          </Text>
          {/* ==================== Scheduled time ================== */}
          <View style={tw` bg-white p-3 rounded-2xl`}>
            <Text style={tw`font-LufgaMedium text-lg text-black`}>
              Mon, Aug 27, 2025
            </Text>
            <Text style={tw`font-LufgaRegular text-sm text-subText`}>
              02:00 PM - 11:00 PM
            </Text>
          </View>

          {/* ========================== status ways details ================ */}

          {status === "pending" && (
            <View>
              <View style={tw`justify-between items-center py-6`}>
                <SvgXml xml={IconPendingStatus} />
                <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                  No response form provider yet
                </Text>
              </View>
              <PrimaryButton
                buttonText="Cancel order"
                buttonTextStyle={tw`text-sm text-red-500`}
                buttonContainerStyle={tw`bg-transparent border border-red-500`}
                leftIcon={IconCrossRed}
                onPress={() => {}}
              />
            </View>
          )}

          {/* ====================== ongoing or complete status details ================ */}
          {status === "approved" && (
            <View>
              <Text style={tw`font-LufgaSemiBold text-base text-black py-3`}>
                Assigned stuff
              </Text>
              <MenuCard
                titleText="John Doe"
                subTitleText="+12345678965"
                image={ImgProfileImg}
                containerStyle={tw` bg-white`}
                endIcon={IconTellPhone}
                endIconOnPress={() => {}}
              />
            </View>
          )}
          {/* ================= cancel status details ================ */}
          {status === "canceled" && (
            <PrimaryButton
              buttonText="Place order"
              buttonTextStyle={tw`text-sm`}
              buttonContainerStyle={tw`h-10 mt-4 mb-2`}
              leftIcon={IconCartWhite}
              onPress={() => {}}
            />
          )}

          {/* =================== if status is delivered ================ */}

          {status === "delivered" && (
            <View>
              <FlatList
                data={[1, 2, 3, 4, 5]}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
                contentContainerStyle={tw`gap-3 py-4 `}
                renderItem={() => (
                  <Image source={ImgService} style={tw`w-28 h-28 rounded-xl`} />
                )}
              />

              <Text style={tw`font-LufgaSemiBold text-base text-black`}>
                Message
              </Text>

              <View style={tw` bg-white p-3 rounded-2xl`}>
                <Text style={tw`font-LufgaRegular text-sm text-black`}>
                  Lorem ipsum dolor sit amet consectetur. Morbi volutpat urna
                  justo odio enim mattis non velit vulputate. Porttitor a auctor
                  sit eu. Laoreet nunc et nec dolor. Pharetra aliquet eu neque
                  justo eget eget. Pharetra facilisis semper tempus fermentum.
                  Maecenas urna sodales dapibus consectetur mi convallis. Lectus
                  sit nam vel nunc congue nunc amet eros purus.
                </Text>
              </View>

              {/* =- status way botton =     */}
              <View style={tw`flex-row justify-center gap-2 mt-4`}>
                <PrimaryButton
                  buttonText="Decline"
                  buttonTextStyle={tw`text-sm`}
                  buttonContainerStyle={tw`h-10 bg-red-700 flex-1`}
                  onPress={() => {}}
                />
                <PrimaryButton
                  buttonText="Accept"
                  buttonTextStyle={tw`text-sm`}
                  buttonContainerStyle={tw`h-10 bg-green-700 flex-1`}
                  onPress={() => {
                    handleRatingModalOpen();
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {/* =============================== place order details modal =============================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ratingBottomSheetModalRef}
          snapPoints={["80%"]}
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
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-white`}>
            {/* ----------------- header title part ---------------- */}
            <View
              style={tw`flex-row items-center justify-between bg-primaryBtn py-2 px-4 rounded-t-2xl`}
            >
              <View />
              <Text style={tw`font-LufgaMedium text-sm text-white`}>
                Feedback
              </Text>
              <TouchableOpacity onPress={() => handleRatingModalClose()}>
                <SvgXml xml={IconCrossWhite} />
              </TouchableOpacity>
            </View>

            {/* = ----------------- plan content ---------------- */}
            <View
              style={tw`rounded-3xl bg-white px-4 py-4 flex-grow justify-between`}
            >
              <View style={tw`justify-center items-center gap-2`}>
                <SvgXml xml={IconSuccess} />
                <Text style={tw`font-LufgaMedium text-black text-lg `}>
                  Delivery request accepted
                </Text>
                <Text style={tw`font-LufgaSemiBold text-black text-xl`}>
                  $ 49.00
                </Text>

                {/* ------------- rating section ------------- */}
                <Text style={tw`font-LufgaRegular text-black text-base mt-4`}>
                  Share your experience with John Doe
                </Text>
                {rating && (
                  <Text
                    style={tw`font-LufgaSemiBold text-black text-lg border border-black rounded-full px-4 py-1`}
                  >
                    {rating === 0.5 || rating === 1
                      ? "Poor"
                      : rating === 1.5 || rating === 2
                      ? "Good"
                      : rating === 2.5 || rating === 3
                      ? "Better"
                      : rating === 3.5 || rating === 4
                      ? "Best"
                      : rating === 4.5 || rating === 5
                      ? "Excellent"
                      : null}
                  </Text>
                )}
                {/* ---------------------- input user rating ---------------- */}
                <StarRating
                  starSize={30}
                  color="#F9A21E"
                  rating={rating}
                  onChange={setRating}
                />

                {/* ------------------ user feedback description ---------------- */}

                <TextInput
                  multiline
                  placeholder="Write a review"
                  placeholderTextColor={"#535353"}
                  textAlignVertical="top"
                  style={tw`font-LufgaRegular text-black text-base mt-4 bg-bgBaseColor w-full rounded-2xl p-3 h-28`}
                  numberOfLines={8}
                />
              </View>

              {/* = ----------------- button content ---------------- */}
              <PrimaryButton
                onPress={() => {
                  handleRatingModalClose();
                  router.push({
                    pathname:
                      "/user_role_sections/notificationsUser/orderDetailsStatus",
                  });
                }}
                buttonText="Done"
                buttonTextStyle={tw`text-sm`}
                rightIcon={IconRightCornerArrowWhite}
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default OrderDetailsStatus;
