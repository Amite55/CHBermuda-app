import { IconDeleteRed, IconImageUpload } from "@/assets/icons";
import { useMultiImagePicker } from "@/src/hooks/useMultiImagePicker";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useSendDeliveryRequestMutation } from "@/src/redux/Api/providers/orders";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

type SelectedImage = {
  uri: string;
  fileName?: string;
  mimeType?: string;
};

const DeliveryRequestSent = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const { booking_id } = useLocalSearchParams();
  const toast = useToastHelpers();

  // =============== hooks ==================

  const { error, images, loading, pickImages, removeImage, reset } =
    useMultiImagePicker();

  // =============== api end point ===============
  const [sendDeliveryRequest, { isLoading: isSendDeliveryRequestLoading }] =
    useSendDeliveryRequestMutation();

  // =============== image picker ===============
  const handlePick = async () => {
    const picked = await pickImages();
    if (picked.length === 0) return;
  };
  // =============== submit ===============
  const handleSendDeliveryRequest = async () => {
    if (!message.trim()) {
      toast.showError("Please write a message before sending.", 3000);
      return;
    } else if (images.length === 0) {
      toast.showError("Please select at least one image.", 3000);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("booking_id", booking_id as string);
      images.forEach((img, i) => {
        formData.append(`files[${i}]`, {
          uri: img.uri,
          name: img.name,
          type: img.type,
        } as any);
      });
      await sendDeliveryRequest(formData).unwrap();
      toast.success?.("Delivery request sent successfully!", 3000);
      router.push("/serviceProvider/serviceProviderTabs/providerOrder");
    } catch (error: any) {
      console.log(error, "Send delivery request failed!");
      toast.showError(error?.message || "Your request failed!", 3000);
    }
  };

  // =============== keyboard listener ===============
  useEffect(() => {
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

  // =============== render image item ===============
  const renderImageItem = ({ item }: { item: SelectedImage }) => {
    return (
      <View style={tw`relative`}>
        <Image
          style={tw`w-36 h-36 rounded-xl`}
          source={{ uri: item.uri }}
          contentFit="cover"
        />
        <TouchableOpacity
          onPress={() => removeImage(item.uri)}
          activeOpacity={0.6}
          style={tw`absolute top-2 right-2 w-8 h-8 rounded-lg bg-white justify-center items-center shadow`}
        >
          <SvgXml xml={IconDeleteRed} />
        </TouchableOpacity>
      </View>
    );
  };

  // =============== empty state for photos ===============
  const renderEmptyPhotos = () => (
    <View
      style={tw`h-36 flex-1 justify-center items-center rounded-xl border border-dashed border-borderColor mt-3`}
    >
      <Text style={tw`font-LufgaRegular text-sm text-subText`}>
        No images selected yet
      </Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          style={tw`flex-1 bg-bgBaseColor`}
          contentContainerStyle={[
            tw`px-5 pb-4 flex-grow justify-between`,
            keyboardVisible ? tw`pb-20` : tw`pb-0`,
          ]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* Header */}
            <BackTitleButton
              title="Send delivery request"
              onPress={() => router.back()}
            />

            {/* Upload Button */}
            <View
              style={tw`justify-center items-center gap-2 bg-white p-4 rounded-2xl mt-4`}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handlePick}
                style={tw`flex-row items-center gap-2 p-3 bg-white rounded-xl shadow`}
              >
                <SvgXml xml={IconImageUpload} />
                {loading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text style={tw`font-LufgaMedium text-lg text-black`}>
                    Upload file
                  </Text>
                )}
              </TouchableOpacity>
              <Text style={tw`font-LufgaRegular text-subText text-sm`}>
                Upload images (max 10)
              </Text>
            </View>

            {/* Photos Section */}
            <Text style={tw`font-LufgaMedium text-base text-black pt-5`}>
              Photos{" "}
              {selectedImages.length > 0 && (
                <Text style={tw`text-subText font-LufgaRegular text-sm`}>
                  ({selectedImages.length} selected)
                </Text>
              )}
            </Text>

            {images.length > 0 ? (
              <FlatList
                data={images}
                keyExtractor={(item) => item.uri}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
                contentContainerStyle={tw`gap-3 mt-3`}
                renderItem={renderImageItem}
              />
            ) : (
              renderEmptyPhotos()
            )}

            {/* Message Section */}
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
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </View>

          {/* Send Button */}
          <PrimaryButton
            buttonText="Send"
            buttonTextStyle={[tw`font-LufgaSemiBold text-base`]}
            buttonContainerStyle={[
              tw`mt-4`,
              !message.trim() && tw`bg-gray-500`,
            ]}
            onPress={handleSendDeliveryRequest}
            loading={isSendDeliveryRequestLoading}
            disabled={isSendDeliveryRequestLoading || !message.trim()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default DeliveryRequestSent;
