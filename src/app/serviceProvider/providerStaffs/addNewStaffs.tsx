import { IconCameraWhite, IconPlus } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { addStaffsSchema } from "@/src/validationSchema/userValidationSchema";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
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
import { SvgXml } from "react-native-svg";

const AddNewStaffs = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{ name: "", email: "", phone: "", location: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={addStaffsSchema}
          enableReinitialize={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            values,
          }) => (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={tw`flex-1 bg-bgBaseColor`}
              contentContainerStyle={[
                tw`px-5 flex-grow justify-between`,
                keyboardVisible ? tw`pb-10 pt-3` : tw`pb-0 `,
              ]}
            >
              <View>
                <BackTitleButton
                  title="Add Staff"
                  onPress={() => router.back()}
                />

                {/* ======================= user profile image ======================= */}
                <View style={tw`relative items-center`}>
                  <Image
                    style={tw`  w-24 h-24 rounded-full`}
                    source={ImgProfileImg}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={tw`absolute right-4/12 -bottom-1 w-10 h-10 items-center justify-center rounded-full bg-primaryBtn`}
                  >
                    <SvgXml xml={IconCameraWhite} />
                  </TouchableOpacity>
                </View>

                {/* ---------- input form ---------- */}
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
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      placeholder="Enter your Full Name"
                      placeholderTextColor="#535353"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.name && touched.name && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.name}
                    </Text>
                  )}

                  <Text
                    style={tw`font-LufgaMedium text-base text-regularText mt-4`}
                  >
                    Email
                  </Text>
                  <View
                    style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
                  >
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Enter your Email"
                      placeholderTextColor="#535353"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.email}
                    </Text>
                  )}
                  <Text
                    style={tw`font-LufgaMedium text-base text-regularText mt-4`}
                  >
                    Phone
                  </Text>
                  <View
                    style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
                  >
                    <TextInput
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                      keyboardType="numeric"
                      placeholder="Enter your Phone"
                      placeholderTextColor="#535353"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.phone && touched.phone && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.phone}
                    </Text>
                  )}

                  <Text
                    style={tw`font-LufgaMedium text-base text-regularText mt-4`}
                  >
                    Location
                  </Text>
                  <View
                    style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
                  >
                    <TextInput
                      onChangeText={handleChange("location")}
                      onBlur={handleBlur("location")}
                      value={values.location}
                      placeholder="Enter your Location"
                      placeholderTextColor="#535353"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    />
                  </View>
                  {errors.location && touched.location && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.location}
                    </Text>
                  )}
                </View>
              </View>

              {/* ====================== buttons ====================== */}
              <PrimaryButton
                onPress={() => {
                  handleSubmit();
                }}
                buttonText="Add"
                leftIcon={IconPlus}
                buttonContainerStyle={tw`mt-4`}
              />
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddNewStaffs;
