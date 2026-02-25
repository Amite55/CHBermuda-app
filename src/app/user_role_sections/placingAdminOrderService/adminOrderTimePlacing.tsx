import { IconRightArrow } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { updateBooking } from "@/src/redux/appStore/bookingSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch } from "react-redux";

const AdminOrderTimePlacing = () => {
  const [selected, setSelected] = React.useState<string>("");
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const toast = useToastHelpers();

  const handleStateUpdate = () => {
    try {
      if (!selected) {
        return toast.warning("Please select a date to proceed!");
      }
      dispatch(
        updateBooking({
          date: selected,
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
