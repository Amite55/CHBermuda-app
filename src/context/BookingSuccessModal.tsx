import { IconSuccessIcon } from "@/assets/icons";
import React, { useEffect, useRef } from "react";
import { Animated, BackHandler, Modal, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import PrimaryButton from "../utils/PrimaryButton";

interface IModalType {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  onPress?: () => void;
}

const BookingSuccessModal = ({
  isModalVisible,
  setIsModalVisible,
  onPress,
}: IModalType) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isModalVisible) return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onPress?.();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [isModalVisible]);

  useEffect(() => {
    if (isModalVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isModalVisible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(false);
      }}
    >
      <View style={tw`flex-1 justify-center bg-black bg-opacity-50 px-5`}>
        <Animated.View
          style={[
            tw`bg-white justify-center items-center rounded-2xl p-6 h-88 gap-2`,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <SvgXml xml={IconSuccessIcon} />

          <Text style={tw`font-LufgaBold text-xl text-[#172B4D]`}>
            Order placed
          </Text>

          <Text
            style={tw`text-center font-LufgaRegular text-sm text-black my-2`}
          >
            Your order has been placed. Please be patient until it’s accepted
            from provider side.
          </Text>

          <View style={tw`w-full`}>
            <PrimaryButton
              buttonText="Go to home"
              buttonTextStyle={tw`text-lg h-10 font-LufgaMedium`}
              onPress={onPress}
              buttonContainerStyle={tw`w-full`}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BookingSuccessModal;
