import { IconRatingStar, IconRightArrow } from "@/assets/icons";
import { ImgBennerImage } from "@/assets/image";
import { BookingTimeData } from "@/src/components/AllData";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SvgXml } from "react-native-svg";

const ProviderOrderDateTimePlacing = () => {
  const [selected, setSelected] = React.useState<string>("");
  const [bookingTime, setBookingTime] = React.useState<string>("");
  const today = new Date().toISOString().split("T")[0];
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-3 px-5 flex-grow justify-between`}
    >
      <View>
        <BackTitleButton
          title="Scheduling time"
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
              source={ImgBennerImage}
              contentFit="contain"
            />
            <View
              style={tw`w-2 h-2 bg-green-600 rounded-full absolute top-0 right-0`}
            />
          </View>
          <View>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`font-LufgaMedium text-base text-regularText`}>
                Light cleaning
              </Text>
              <Text
                style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
              >
                12 order
              </Text>
            </View>

            <View style={tw`flex-row items-center gap-2 mt-1`}>
              <Text style={tw`font-LufgaMedium text-sm text-subText`}>
                Light cleaning
              </Text>
              <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                $49.00
              </Text>
            </View>
            {/* ================== profile total review ================ */}
            <View style={tw`flex-row items-center gap-1`}>
              <SvgXml xml={IconRatingStar} />
              <Text style={tw`font-LufgaRegular text-sm text-regularText`}>
                4.0
              </Text>
              <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                (8 reviews)
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* ================ date slot section ================ */}
        <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
          Select date
        </Text>

        {/* =================== calender =================== */}
        <View
          style={tw`rounded-3xl  bg-white px-4 py-6 flex-grow justify-center `}
        >
          <Calendar
            style={tw` p-2 rounded-3xl gap-2 text-black`}
            theme={{
              calendarBackground: "#fff",
              textSectionTitleColor: "#111",
              selectedDayBackgroundColor: "#183E9F",
              selectedDayTextColor: "#fff",
              todayTextColor: "#183E9F",
              dayTextColor: "#111",
              textDisabledColor: "#A4A4A4",
              arrowColor: "orange",
              monthTextColor: "#111",
            }}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
            minDate={today}
          />
        </View>
        {/* ========================== time slot ========================== */}
        <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
          Select time
        </Text>

        <View style={tw`flex-row flex-wrap justify-between`}>
          {BookingTimeData.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => setBookingTime(item.time)}
                key={item.id}
                activeOpacity={0.6}
                style={[
                  tw`w-[48%] items-center justify-center bg-white px-2 py-4 rounded-xl mt-2`,
                  bookingTime === item.time ? tw`bg-primaryBtn` : tw`bg-white`,
                ]}
              >
                <Text
                  style={[
                    tw`font-LufgaRegular text-xs text-regularText`,
                    {
                      color: bookingTime === item.time ? "#FFFFFF" : "#111827",
                    },
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ==================== submit button ==================== */}
      <PrimaryButton
        onPress={() => {
          router.push(
            "/user_role_sections/placingProviderOrderService/confirmDetailsProviderPlacingOrder"
          );
        }}
        buttonText="Next"
        buttonContainerStyle={tw`mt-6 `}
        buttonTextStyle={tw`text-lg font-LufgaMedium`}
        rightIcon={IconRightArrow}
      />
    </ScrollView>
  );
};

export default ProviderOrderDateTimePlacing;
