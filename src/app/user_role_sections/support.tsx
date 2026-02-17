import { IconSend } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useSupportMutation } from "@/src/redux/Api/userRole/accountSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
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
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";

const Support = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const toast = useToastHelpers();

  // ================== api end point ===================
  const [sendSupport, { isLoading: isSupportLoading }] = useSupportMutation();

  // ================= handle send support function ================
  const handleSendSupport = async (values: any) => {
    try {
      const res = await sendSupport(values).unwrap();
      if (res) {
        router.back();
        toast.success(
          res?.message || "Your support message send successfully",
          3000,
        );
      }
    } catch (error: any) {
      console.log(error, "Send Support not success ->>");
      toast.showError(
        error.message ||
          error?.data?.message ||
          error ||
          error?.data ||
          "Profile Image not updated please try again",
        3000,
      );
    }
  };

  // ==================== Validation Schema ====================
  const SupportSchema = Yup.object().shape({
    subject: Yup.string().required("Please enter subject"),
    message: Yup.string().required("Message Field is required"),
  });

  // ============== keyboard handler ================
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
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{
            subject: "",
            message: "",
          }}
          onSubmit={(values) => handleSendSupport(values)}
          validationSchema={SupportSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
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
                <BackTitleButton
                  title="Support"
                  onPress={() => router.back()}
                />
                {/* support form */}
                <View style={tw` mt-4`}>
                  <Text
                    style={tw`font-LufgaMedium text-base text-regularText mt-2`}
                  >
                    Subject
                  </Text>
                  <View
                    style={tw`w-full h-12 px-4 rounded-full border border-borderColor mt-1`}
                  >
                    <TextInput
                      placeholder="Why you are writing this ?"
                      placeholderTextColor="#535353"
                      style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                      onChangeText={handleChange("subject")}
                      onBlur={handleBlur("subject")}
                      value={values.subject}
                    />
                  </View>
                  {errors.subject && touched.subject && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.subject}
                    </Text>
                  )}

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
                      onChangeText={handleChange("message")}
                      onBlur={handleBlur("message")}
                      value={values.message}
                    />
                  </View>
                  {errors.message && touched.message && (
                    <Text style={tw`text-red-500 text-xs mt-1`}>
                      {errors.message}
                    </Text>
                  )}
                </View>
              </View>

              {/* ---------- submit button ---------- */}
              <PrimaryButton
                onPress={handleSubmit}
                disabled={isSupportLoading}
                loading={isSupportLoading}
                buttonText="Send"
                buttonContainerStyle={tw`mt-2`}
                buttonTextStyle={tw`text-base font-LufgaMedium`}
                rightIcon={IconSend}
              />
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Support;
