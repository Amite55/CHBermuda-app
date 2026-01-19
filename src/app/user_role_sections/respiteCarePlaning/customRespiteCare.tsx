import { IconDuration, IconRightCornerArrowWhite } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useAddRespiteCareRequestMutation,
  useGetRespiteCarePackageDetailsQuery,
} from "@/src/redux/Api/userHomeSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
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
  const [messageValue, setMessageValue] = React.useState("");
  const { respiteId } = useLocalSearchParams();
  const toast = useToastHelpers();

  // ==================== api end point ====================
  const { data: respiteDetails, isLoading: isRespiteDateLoading } =
    useGetRespiteCarePackageDetailsQuery(respiteId);
  const [sendNewRespiteRequest, { isLoading: isRespiteRequestLoading }] =
    useAddRespiteCareRequestMutation();

  // ==================== handle custom respite care service request ====================
  const handleRequestRespiteCareRequest = async () => {
    try {
      const response = await sendNewRespiteRequest({
        message: messageValue,
        respite_care_id: respiteId,
      }).unwrap();
      if (response) {
        setMessageValue("");
        toast.success(
          response?.message || "Respite Care send successfully",
          3000,
        );
      }
    } catch (error: any) {
      console.log(error, "New respite Care not send ");
      toast.showError(
        error.message ||
          error?.data?.message ||
          error ||
          error?.data ||
          "Not send please try again",
        4000,
      );
    }
  };

  //   0---------------- keyboard view condition view ------------------0
  React.useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
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
            keyboardVisible ? tw`pb-16` : tw`pb-2`,
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
              source={respiteDetails?.data?.respite_care?.image}
            />
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={tw`font-LufgaMedium text-base text-black pt-3`}
            >
              {respiteDetails?.data?.respite_care?.title}
            </Text>

            <View style={tw`flex-row justify-between items-center `}>
              <View style={tw`flex-row items-center gap-1 `}>
                <SvgXml xml={IconDuration} />
                <Text style={tw`font-LufgaMedium text-base text-black`}>
                  Duration: {respiteDetails?.data?.respite_care?.duration} hour
                </Text>
              </View>
              <Text style={tw`font-LufgaMedium text-xl text-black`}>
                $ {respiteDetails?.data?.respite_care?.price}
                <Text style={tw`font-LufgaRegular text-sm text-gray-500`}>
                  / {respiteDetails?.data?.respite_care?.type}
                </Text>
              </Text>
            </View>
            {/* ------------------ plan description ---------------- */}
            <Text style={tw`font-LufgaRegular text-sm text-subText  pt-3`}>
              {respiteDetails?.data?.respite_care?.description}
            </Text>

            <View style={tw`my-6`}>
              <TextInput
                value={messageValue}
                onChangeText={(value) => setMessageValue(value)}
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
            loading={isRespiteRequestLoading}
            disabled={isRespiteDateLoading}
            buttonText="Get a qoute"
            buttonTextStyle={tw`font-LufgaMedium text-base`}
            rightIcon={IconRightCornerArrowWhite}
            buttonContainerStyle={tw`mt-2 h-12 `}
            onPress={handleRequestRespiteCareRequest}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CustomRespiteCare;
