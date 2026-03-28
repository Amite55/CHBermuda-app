import {
  IconBookingApprovedComplete,
  IconBookingCanceled,
  IconDeclineRequest,
  IconDeliveryRequest,
  IconNewBookingPlaced,
  IconUserNotification,
} from "@/assets/icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
// ================= props type   ===============
interface Props {
  title: string;
  description: string;
  time: string;
  icon: string;
  onPress?: () => void;
  type?: string;
  containerStyle?: any;
}
// Color Map type   ===============
interface ColorMap {
  [key: string]: string;
}

// =============== color scheme   ===============
const textColorMap: ColorMap = {
  booking_approved: "#4285F4",
  booking_cancelled: "#FF3A00",
  new_booking: "#008100",
  new_delivery_request: "#9747FF",
  decline_delivery_request: "#C88C00",
  accepted_delivery_request: "#2577FF",
};

const iconMap = {
  booking_approved: IconBookingApprovedComplete,
  booking_cancelled: IconBookingCanceled,
  new_booking: IconNewBookingPlaced,
  new_delivery_request: IconDeliveryRequest,
  decline_delivery_request: IconDeclineRequest,
  accepted_delivery_request: IconBookingApprovedComplete,
};

const NotificationCard = ({
  title,
  description,
  time,
  icon,
  onPress,
  type,
  containerStyle,
}: Props) => {
  const textColor = textColorMap[type] || "#000000";
  const Icon = iconMap[type] || IconUserNotification;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        tw`bg-slate-300 rounded-2xl p-3 flex-row items-center gap-3 `,
        containerStyle,
      ]}
    >
      <View
        style={tw`w-12 h-12 rounded-lg bg-gray-200 items-center justify-center`}
      >
        <SvgXml xml={Icon} />
      </View>
      <View>
        <Text style={[tw`font-LufgaMedium text-sm`, { color: textColor }]}>
          {title}
        </Text>
        <Text style={tw`font-LufgaRegular text-sm text-subText`}>
          {description}
        </Text>
        <Text style={tw`font-LufgaRegular text-xs text-subText`}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
