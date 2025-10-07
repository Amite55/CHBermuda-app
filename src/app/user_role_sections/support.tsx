import { IconSend } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Support = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 bg-bgBaseColor`}
          contentContainerStyle={[
            tw`px-5 flex-grow justify-between`,
            keyboardVisible ? tw`pb-20` : tw`pb-2`,
          ]}
        >
          <View>
            <BackTitleButton title="Support" onPress={() => router.back()} />
            {/* support form */}
            <View style={tw` mt-4`}>
              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-2`}
              >
                Full Name
              </Text>
              <View
                style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
              >
                <TextInput
                  placeholder="Enter your Full Name"
                  placeholderTextColor="#535353"
                  style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                />
              </View>

              <Text
                style={tw`font-LufgaMedium text-base text-regularText mt-2`}
              >
                Message
              </Text>
              <View
                style={tw`w-full h-36 px-4 rounded-3xl border border-borderColor mt-1`}
              >
                <TextInput
                  multiline
                  numberOfLines={10}
                  textAlignVertical="top"
                  placeholder="Write your message here..."
                  placeholderTextColor="#535353"
                  style={tw`flex-1 pt-4 text-regularText font-LufgaRegular text-base`}
                />
              </View>
            </View>
          </View>

          {/* ---------- submit button ---------- */}
          <PrimaryButton
            buttonText="Send"
            buttonContainerStyle={tw`mt-2`}
            buttonTextStyle={tw`text-base font-LufgaMedium`}
            rightIcon={IconSend}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Support;
