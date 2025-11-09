import { IconDuration, IconRightCornerArrowWhite } from "@/assets/icons";
import { ImgRespiteCarePlan } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const CustomRespiteCare = () => {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  //   0---------------- keyboard view condition view ------------------0
  React.useEffect(() => {
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
          style={tw`flex-1 bg-bgBaseColor`}
          contentContainerStyle={[
            tw` px-5 flex-grow justify-between`,
            keyboardVisible && tw`pb-10`,
          ]}
        >
          <View style={tw`pb-2`}>
            <BackTitleButton
              title={"Custom Services"}
              onPress={() => router.back()}
            />
            <Image
              contentFit="cover"
              style={tw`w-full h-40 rounded-3xl mt-3`}
              source={ImgRespiteCarePlan}
            />
            <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
              Custom
            </Text>

            <View style={tw`flex-row justify-between items-center `}>
              <View style={tw`flex-row items-center gap-1 `}>
                <SvgXml xml={IconDuration} />
                <Text style={tw`font-LufgaMedium text-base text-black`}>
                  Duration: N/A
                </Text>
              </View>
              {/* <Text style={tw`font-LufgaMedium text-xl text-black`}>
            ${item?.price}
            <Text style={tw`font-LufgaRegular text-sm text-gray-500`}>
              / weekly
            </Text>
          </Text> */}
            </View>
            {/* ------------------ plan description ---------------- */}
            <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
              Lorem ipsum dolor sit amet consectetur. Dignissim vulputate
              elementum vitae magna id. Eu vulputate scelerisque tincidunt mi.
              Faucibus lobortis sed quis convallis massa nulla est eget
              ultricies. Quis fringilla sollicitudin posuere luctus et urna
              molestie et senectus. Eget purus odio in vestibulum tellus
              condimentum blandit fermentum.
            </Text>

            <View style={tw`my-6`}>
              <TextInput
                placeholder="Your message"
                placeholderTextColor={"#000"}
                multiline
                numberOfLines={40}
                textAlignVertical="top"
                textAlign="left"
                style={tw`font-LufgaRegular text-sm text-subText bg-white h-64 py-4 px-4 rounded-3xl`}
              />
            </View>
          </View>

          <PrimaryButton
            buttonText="Get a qoute"
            buttonTextStyle={tw`font-LufgaMedium text-base`}
            rightIcon={IconRightCornerArrowWhite}
            buttonContainerStyle={tw`mt-2 h-10 `}
            // onPress={() => {
            //   router.push(
            //     "/user_role_sections/placingAdminOrderService/adminPlacingOrder"
            //   );
            // }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CustomRespiteCare;
