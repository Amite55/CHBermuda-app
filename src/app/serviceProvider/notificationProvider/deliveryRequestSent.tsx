import { IconDeleteRed, IconImageUpload } from "@/assets/icons";
import { ImgServiceImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const DeliveryRequestSent = () => {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android alada behavior
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        // behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={tw`flex-1 bg-bgBaseColor`}
          contentContainerStyle={[
            tw`px-5 pb-4 flex-grow justify-between`,
            keyboardVisible ? tw`pb-20` : tw`pb-4`,
          ]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw``}>
            <BackTitleButton
              title="Send delivery request"
              onPress={() => router.back()}
            />
            <View
              style={tw`justify-center items-center gap-2 bg-white p-4 rounded-2xl mt-4`}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`flex-row items-center gap-2 p-3 bg-white rounded-xl shadow`}
              >
                <SvgXml xml={IconImageUpload} />
                <Text style={tw`font-LufgaMedium text-lg text-black`}>
                  Upload file
                </Text>
              </TouchableOpacity>
              <Text style={tw`font-LufgaRegular text-subText text-sm`}>
                Upload images
              </Text>
            </View>

            <Text style={tw`font-LufgaMedium text-base text-black pt-5`}>
              Photos
            </Text>

            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              contentContainerStyle={tw`gap-3 mt-3`}
              renderItem={() => (
                <View style={tw`relative`}>
                  <Image
                    style={tw`w-36 h-36 rounded-xl`}
                    source={ImgServiceImage}
                  />
                  <TouchableOpacity
                    onPress={() => {}}
                    activeOpacity={0.6}
                    style={tw` absolute top-2 right-2 w-8 h-8 rounded-lg bg-white justify-center items-center shadow`}
                  >
                    <SvgXml xml={IconDeleteRed} />
                  </TouchableOpacity>
                </View>
              )}
            />

            <Text style={tw`font-LufgaMedium text-base text-black pt-5`}>
              Your message
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

          {/* --------------- button --------------- */}
          <PrimaryButton
            buttonText="Send"
            buttonTextStyle={tw`font-LufgaSemiBold text-base`}
            buttonContainerStyle={tw`mt-4  `}
            onPress={() => {}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default DeliveryRequestSent;
