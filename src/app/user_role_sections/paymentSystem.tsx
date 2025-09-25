import { IconPaymentCard } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PaymentSystem = () => {
  const [saveCard, setSaveCard] = React.useState(true);

  const handleCheckBox = async () => {
    setSaveCard(!saveCard);
    try {
      // await AsyncStorage.setItem("check", JSON.stringify(isChecked));
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`px-5 bg-bgBaseColor flex-grow justify-between`}
      //   style={tw`px-5`}
    >
      <View>
        <BackTitleButton
          title="Withdraw Procedure"
          onPress={() => router.back()}
        />

        <View style={tw`flex-1   py-6`}>
          <Text style={[tw`font-LufgaSemiBold text-black text-2xl mb-6`]}>
            Add card
          </Text>

          {/* Card Information */}
          <View style={tw` rounded-2xl  mb-4`}>
            <Text style={[tw`font-LufgaMedium text-black text-sm`]}>
              Card information
            </Text>

            <TextInput
              placeholder="Card number"
              placeholderTextColor="#666"
              style={[
                tw`font-LufgaSemiBold text-base mt-3 border-b border-gray-400 pb-2 text-white`,
              ]}
              keyboardType="numeric"
            />

            <View style={tw`flex-row mt-4`}>
              <TextInput
                placeholder="MM/YY"
                placeholderTextColor="#666"
                style={[
                  tw`flex-1 border-b border-gray-400 pb-2 text-white mr-3 font-LufgaSemiBold text-base`,
                ]}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="CVC"
                placeholderTextColor="#666"
                style={[
                  tw`flex-1 border-b border-gray-400 pb-2 text-white font-LufgaSemiBold text-base`,
                ]}
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </View>

          {/* Billing Address */}
          <View style={tw` rounded-2xl p-4 mb-4`}>
            <Text style={[tw`text-sm text-subText  mb-3 font-LufgaMedium`]}>
              Billing address
            </Text>
            <Text style={[tw`text-black text-base mb-2 font-LufgaSemiBold`]}>
              United States
            </Text>
            <TextInput
              placeholder="ZIP"
              placeholderTextColor="#666"
              style={[
                tw`border-b border-gray-400 pb-2 text-white font-LufgaSemiBold text-base`,
              ]}
              keyboardType="numeric"
            />
          </View>

          <View style={tw`flex-row gap-2 items-center rounded-none`}>
            <TouchableOpacity
              onPress={() => handleCheckBox()}
              style={tw.style(
                `border border-black w-5 h-5  justify-center items-center rounded-sm`,
                saveCard ? `bg-primaryBtn border-0` : `bg-transparent`
              )}
            >
              {saveCard ? <Text style={tw`text-white text-sm`}>✔</Text> : null}
            </TouchableOpacity>
            <Text style={tw`text-black text-xs`}>Remember me</Text>
          </View>
        </View>
      </View>

      <PrimaryButton
        //   onPress={() => router.push("/taskPerformerSection/homeTabs/task")}
        leftIcon={IconPaymentCard}
        buttonTextStyle={tw`font-LufgaMedium text-sm`}
        buttonText="Pay now"
        buttonContainerStyle={tw`w-full h-10 mb-2`}
      />
    </ScrollView>
  );
};

export default PaymentSystem;
