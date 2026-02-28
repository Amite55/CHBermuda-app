import { IconRightArrow } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useLazyGetPackageTimeQuery } from "@/src/redux/Api/userHomeSlices";
import { updateBooking } from "@/src/redux/appStore/bookingSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";

const AdminOrderTimePlacing = () => {
  const [selected, setSelected] = React.useState<string>("");
  const [bookingTime, setBookingTime] = React.useState<string>("");
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const toast = useToastHelpers();
  const booking = useSelector((state: any) => state.booking);

  // =============== api end points ================
  const [getPackageTime, readTimeData] = useLazyGetPackageTimeQuery();

  useEffect(() => {
    const readTime = async () => {
      if (booking?.packageInfo?.id) {
        await getPackageTime(booking?.packageInfo?.id);
      }
    };
    readTime();
  }, [booking?.packageInfo?.id]);

  const handleStateUpdate = () => {
    try {
      if (!selected) {
        return toast.warning("Please select a date to proceed!");
      }
      if (booking?.booking_type === "thirdparty_booking") {
        if (!booking?.package_time_id) {
          return toast.warning("Please select a time slot to proceed!");
        }
      }
      dispatch(
        updateBooking({
          date: selected,
          ...(bookingTime && { time: bookingTime }),
        }),
      );
      router.push(
        "/user_role_sections/placingAdminOrderService/confirmDetailsAdminOrders",
      );
    } catch (error) {
      console.log(error, "time Scheduling not updated----->");
    }
  };
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
              todayTextColor: "#183E",
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
                selectedColor: "#183E9F",
              },
            }}
            minDate={today}
          />
        </View>

        {/* ====================== time slot section ================ */}
        {booking?.booking_type === "thirdparty_booking" && (
          <View>
            <Text style={tw`font-LufgaMedium text-base text-regularText mt-2`}>
              Select time
            </Text>
            <View style={tw`flex-row flex-wrap justify-between`}>
              {readTimeData?.isLoading ? (
                <View>
                  {[1, 2, 3, 4].map((item) => {
                    return (
                      <SkeletonBox
                        key={item}
                        height={40}
                        width={150}
                        radius={12}
                        style={tw`mb-2`}
                      />
                    );
                  })}
                </View>
              ) : readTimeData?.currentData?.data?.length > 0 ? (
                readTimeData?.currentData?.data?.map((item: any) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setBookingTime(item?.time_from + item?.time_to);
                        try {
                          dispatch(
                            updateBooking({
                              package_time_id: item?.id,
                            }),
                          );
                        } catch (error) {
                          console.log(error, "error in setting booking time");
                        }
                      }}
                      key={item?.id}
                      activeOpacity={0.6}
                      style={[
                        tw`w-[48%] items-center justify-center bg-white px-2 py-4 rounded-xl mt-2`,
                        bookingTime === item?.time_from + item?.time_to
                          ? tw`bg-primaryBtn`
                          : tw`bg-white`,
                      ]}
                    >
                      <Text
                        style={[
                          tw`font-LufgaRegular text-xs text-regularText`,
                          {
                            color:
                              bookingTime === item?.time_from + item?.time_to
                                ? "#FFFFFF"
                                : "#111827",
                          },
                        ]}
                      >
                        {item?.time_from + " - " + item?.time_to}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text
                  style={tw`font-LufgaMedium text-base text-center text-subText mt-4`}
                >
                  No time slots available for this provider
                </Text>
              )}
            </View>
          </View>
        )}
      </View>

      {/* ==================== submit button ==================== */}
      <PrimaryButton
        onPress={() => {
          handleStateUpdate();
        }}
        buttonText="Next"
        buttonContainerStyle={tw`mt-6 `}
        buttonTextStyle={tw`text-lg font-LufgaMedium`}
        rightIcon={IconRightArrow}
      />
    </ScrollView>
  );
};

export default AdminOrderTimePlacing;
