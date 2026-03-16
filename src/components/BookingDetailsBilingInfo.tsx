import React from "react";
import { Text, View } from "react-native";
import tw from "../lib/tailwind";

interface Props {
  name?: string;
  email?: string;
  location?: string;
  containerStyle?: any;
}

const BookingDetailsBilingInfo = ({
  name = "-",
  email = "-",
  location = "-",
  containerStyle,
}: Props) => {
  return (
    <View style={[tw`bg-white p-3 rounded-2xl gap-3`, containerStyle]}>
      <View>
        <Text style={tw`font-LufgaMedium text-lg text-black`}>Name</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={tw`font-LufgaRegular text-sm text-subText`}
        >
          {name}
        </Text>
      </View>

      <View>
        <Text style={tw`font-LufgaMedium text-lg text-black`}>Email</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={tw`font-LufgaRegular text-sm text-subText`}
        >
          {email}
        </Text>
      </View>

      <View>
        <Text style={tw`font-LufgaMedium text-lg text-black`}>Location</Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={tw`font-LufgaRegular text-sm text-subText`}
        >
          {location}
        </Text>
      </View>
    </View>
  );
};

export default BookingDetailsBilingInfo;
