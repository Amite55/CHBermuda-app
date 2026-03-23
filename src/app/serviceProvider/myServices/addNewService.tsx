import {
  IconDeleteRed,
  IconImageUpload,
  IconPlus,
  IconPlushPrimaryColor,
} from "@/assets/icons";
import TimeSlotManager from "@/src/components/Timeslotmanager";
import { useImagePicker } from "@/src/hooks/useImagePicker";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useAddPackageMutation } from "@/src/redux/Api/providers/accounts/myServices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { addPackageSchema } from "@/src/validationSchema/userValidationSchema";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const AddNewService = () => {
  const [servicesText, setServicesText] = React.useState("");
  const [timerFormData, setTimeFormData] = React.useState<any[]>([]);
  const [serviceIncludeArry, setServiceIncludeArry] = React.useState<string[]>(
    [],
  );
  // ============== hook ==================
  const toast = useToastHelpers();
  const { image, loading, pickImage, previewUri } = useImagePicker({
    aspect: [16, 9],
  });

  // =============== get image from camera ================
  const handleProfileImage = async () => {
    const picked = await pickImage();
    if (!picked) {
      toast.showError("Upload cancelled", 3000);
      return;
    }
  };

  // ================= api end point ==================
  const [addPackage, { isLoading: isAddPackageLoading }] =
    useAddPackageMutation();

  // ================= handle add new service package ================
  const handleAddNewServicePackage = async (values: any) => {
    if (!image) return toast.showError("Please select image", 3000);
    if (!timerFormData) return toast.showError("Please select image", 3000);
    try {
      const formData = new FormData();
      formData.append("icon", {
        uri: image.uri,
        name: image.name,
        type: image.type,
      } as any);
      formData.append("description", values.description);
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("duration", values.duration);
      serviceIncludeArry.forEach((service, index) => {
        formData.append(`included_services[${index}]`, service);
      });
      timerFormData.forEach((slot, index) => {
        formData.append(`time_from[${index}]`, slot.startTime);
        formData.append(`time_to[${index}]`, slot.endTime);
      });
      const res = await addPackage(formData).unwrap();
      console.log(res, "service added ------------>");
      toast.success("Your Service added successfully!", 3000);
      router.back();
    } catch (error: any) {
      console.log(error, "there package not add new package");
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        {/* -0----------------- input from here ----------------- */}
        <Formik
          initialValues={{
            title: "",
            description: "",
            included_services: "",
            price: "",
            duration: "",
          }}
          onSubmit={(values) => handleAddNewServicePackage(values)}
          validationSchema={addPackageSchema}
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
              style={tw`flex-1 bg-bgBaseColor`}
              contentContainerStyle={tw`px-5 pb-0 flex-grow justify-between`}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View>
                <BackTitleButton
                  title="Add new package"
                  onPress={() => router.back()}
                />

                {/* ================ image upload ================ */}
                <View
                  style={tw`justify-center items-center gap-2 bg-white p-4 rounded-2xl mt-3`}
                >
                  {loading ? (
                    <ActivityIndicator size={"small"} />
                  ) : image ? (
                    <View>
                      <Image
                        style={tw`w-36  h-24 rounded-md`}
                        source={previewUri}
                        contentFit="cover"
                      />
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleProfileImage}
                        style={tw` items-center  p-1 bg-white rounded-xl shadow mt-1`}
                      >
                        <Text
                          style={tw`font-LufgaMedium text-sm text-gray-500`}
                        >
                          Change
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleProfileImage}
                      style={tw`flex-row items-center gap-2 p-3 bg-white rounded-xl shadow`}
                    >
                      <SvgXml xml={IconImageUpload} />
                      <Text style={tw`font-LufgaMedium text-lg text-black`}>
                        Upload file
                      </Text>
                    </TouchableOpacity>
                  )}
                  <Text style={tw`font-LufgaRegular text-subText text-sm`}>
                    Upload coder photo for this package
                  </Text>
                </View>

                {/* ------------------ package title ---------------- */}
                <Text
                  style={tw`font-LufgaMedium text-base uppercase text-black pt-2`}
                >
                  Package title
                </Text>
                <View
                  style={tw`w-full h-12  px-4 rounded-full border border-borderColor gap-3`}
                >
                  <TextInput
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                    placeholder="Package title goes here"
                    placeholderTextColor="#535353"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                  />
                </View>
                {errors.title && touched.title && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.title}
                  </Text>
                )}
                {/* ------------------ about ---------------- */}
                <Text
                  style={tw`font-LufgaMedium text-base uppercase text-black pt-3`}
                >
                  About
                </Text>
                <View
                  style={tw`w-full  h-20  px-4 rounded-2xl border border-borderColor gap-3`}
                >
                  <TextInput
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    placeholder="Write something about this package"
                    placeholderTextColor="#535353"
                    textAlign="left"
                    textAlignVertical="top"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    multiline
                    numberOfLines={6}
                  />
                </View>
                {errors.description && touched.description && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.description}
                  </Text>
                )}
                {/* ------------------ included Service  ---------------- */}
                <Text
                  style={tw`font-LufgaMedium text-base uppercase text-black pt-3`}
                >
                  Included services
                </Text>
                <View
                  style={tw`w-full h-12 flex-row justify-center   rounded-full  gap-3`}
                >
                  <TextInput
                    multiline
                    onChangeText={handleChange("included_services")}
                    onBlur={handleBlur("included_services")}
                    value={values.included_services}
                    onChange={(text) => setServicesText(text.nativeEvent.text)}
                    placeholder="Type here..."
                    placeholderTextColor="#535353"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={!servicesText}
                    onPress={() => {
                      if (!servicesText.trim()) return;
                      setServiceIncludeArry([
                        ...serviceIncludeArry,
                        servicesText.trim(),
                      ]);
                      setServicesText("");
                      handleChange("included_services")("");
                    }}
                    style={tw`border border-subText bg-white bg-opacity-35 w-10 h-10l items-center justify-center rounded-full`}
                  >
                    <SvgXml xml={IconPlushPrimaryColor} />
                  </TouchableOpacity>
                </View>

                {serviceIncludeArry.length > 0 && (
                  <View
                    style={tw`gap-4 my-4 border border-subText rounded-2xl p-3`}
                  >
                    {serviceIncludeArry.map((item, index) => (
                      <View key={index} style={tw`flex-row justify-between`}>
                        <View style={tw`flex-row items-center gap-1`}>
                          <View style={tw`w-1 h-1 bg-black rounded-full`} />
                          <Text
                            numberOfLines={2}
                            style={tw`flex-shrink  font-LufgaRegular text-base text-subText`}
                          >
                            {item}
                          </Text>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            setServiceIncludeArry(
                              serviceIncludeArry.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          <SvgXml xml={IconDeleteRed} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {/* ------------------ price ---------------- */}
                <Text
                  style={tw`font-LufgaMedium text-base uppercase text-black pt-3`}
                >
                  Price
                </Text>
                <View
                  style={tw`w-full h-12 flex-row items-center px-4 rounded-full border border-borderColor gap-3`}
                >
                  <TextInput
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    value={values.price}
                    placeholder="0.00"
                    placeholderTextColor="#535353"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    keyboardType="numeric"
                  />
                  <Text
                    style={tw`text-regularText font-LufgaRegular text-base`}
                  >
                    USD
                  </Text>
                </View>
                {errors.price && touched.price && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.price}
                  </Text>
                )}
                {/* ------------------ duration ---------------- */}
                <Text
                  style={tw`font-LufgaMedium text-base uppercase text-black pt-3`}
                >
                  Duration
                </Text>
                <View
                  style={tw`w-full h-12 flex-row items-center px-4 rounded-full border border-borderColor gap-3`}
                >
                  <TextInput
                    onChangeText={handleChange("duration")}
                    onBlur={handleBlur("duration")}
                    value={values.duration}
                    placeholder="00"
                    placeholderTextColor="#535353"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    keyboardType="numeric"
                  />
                  <Text
                    style={tw`text-regularText font-LufgaRegular text-base`}
                  >
                    / hour
                  </Text>
                </View>
                {errors.duration && touched.duration && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.duration}
                  </Text>
                )}

                {/* --------------- Time Slot start hare --------------- */}
                <TimeSlotManager
                  onSlotsChange={(slots) => setTimeFormData(slots)}
                  maxSlots={5}
                  label="Select Your Time Slots"
                />
              </View>
              {/* --------------------- bottom button ---------------- */}

              <PrimaryButton
                onPress={handleSubmit}
                loading={isAddPackageLoading}
                disabled={isAddPackageLoading}
                buttonText="Add"
                buttonTextStyle={tw`font-LufgaMedium text-base`}
                leftIcon={IconPlus}
                buttonContainerStyle={tw`mt-8 h-12`}
              />
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AddNewService;
