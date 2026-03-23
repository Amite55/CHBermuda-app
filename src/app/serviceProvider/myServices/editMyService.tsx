import {
  IconDeleteRed,
  IconPlus,
  IconPlushPrimaryColor,
  IconReUpload,
} from "@/assets/icons";
import { ImgPlaceholderService } from "@/assets/image";
import { useImagePicker } from "@/src/hooks/useImagePicker";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useGetPackageDetailsQuery } from "@/src/redux/Api/providers/accounts/myServices";
import MyServiceSkeleton from "@/src/Skeletion/MyServiceSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { editPackageSchema } from "@/src/validationSchema/userValidationSchema";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
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

const EditMyService = () => {
  const [servicesText, setServicesText] = React.useState("");
  const [serviceIncludeArry, setServiceIncludeArry] = React.useState<any[]>([]);
  const { id } = useLocalSearchParams();

  // hooks                ====
  const toast = useToastHelpers();
  const { image, loading, pickImage, previewUri } = useImagePicker({
    aspect: [16, 9],
  });

  // =============== api end point ===============
  const { data: packageDetails, isLoading: isPackageDetailsLoading } =
    useGetPackageDetailsQuery(id);

  // =============== get image from camera ================
  const handleProfileImage = async () => {
    const picked = await pickImage();
    if (!picked) {
      toast.showError("Upload cancelled", 3000);
      return;
    }
  };

  const handleUpdateService = (value: any) => {
    try {
      console.log(value, "this is edit value-------->");
    } catch (error: any) {
      console.log(error, "Your service not updated.");
    }
  };

  // ============== here is included services ===============
  React.useEffect(() => {
    if (packageDetails?.data?.included_services) {
      setServiceIncludeArry(packageDetails.data.included_services);
    }
  }, [packageDetails]);

  // -=============== here is loading state ===============-
  if (isPackageDetailsLoading) {
    return <MyServiceSkeleton />;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <Formik
          initialValues={{
            title: packageDetails?.data?.title || "",
            description: packageDetails?.data?.description || "",
            price: packageDetails?.data?.price || "",
            duration: packageDetails?.data?.duration || "",
            included_services: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={editPackageSchema}
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
              contentContainerStyle={tw`px-5 justify-between flex-grow`}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={tw`w-full `}>
                <BackTitleButton
                  title="Edit package"
                  onPress={() => router.back()}
                />
                {/* --------------- service image  --------------- */}
                <View style={tw`relative`}>
                  <Image
                    style={tw`w-full h-40 rounded-3xl mt-2`}
                    contentFit="cover"
                    source={image ? previewUri : packageDetails?.data?.icon}
                    placeholder={ImgPlaceholderService}
                  />

                  <View
                    style={tw`absolute top-4 right-3 flex-row items-center gap-2`}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handleProfileImage();
                      }}
                      activeOpacity={0.6}
                      style={tw`w-10 h-10 rounded-lg bg-gray-400 border border-white justify-center items-center shadow`}
                    >
                      <SvgXml xml={IconReUpload} />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* ------------------ package title ---------------- */}
                <Text style={tw`font-LufgaMedium text-base text-black mt-2`}>
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
                    {errors.title as any}
                  </Text>
                )}
                {/* ------------------ about ---------------- */}
                <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
                  Description
                </Text>
                <View
                  style={tw`w-full h-24  px-4 rounded-xl border border-borderColor gap-3`}
                >
                  <TextInput
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    placeholder="Write something about this package"
                    placeholderTextColor="#535353"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                    multiline
                    numberOfLines={10}
                  />
                </View>
                {errors.description && touched.description && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.description as any}
                  </Text>
                )}
                {/* ------------------ included Service  ---------------- */}
                <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
                  Included services
                </Text>
                <View
                  style={tw`w-full h-12 flex-row justify-center   rounded-full  gap-3`}
                >
                  <TextInput
                    onChangeText={(text) => {
                      setServicesText(text);
                      handleChange("included_services")(text);
                    }}
                    onBlur={handleBlur("included_services")}
                    value={servicesText}
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
                      <View
                        key={index}
                        style={tw`flex-row justify-between items-start gap-2`}
                      >
                        <View style={tw`flex-row items-start gap-2 flex-1`}>
                          <View
                            style={tw`w-1.5 h-1.5 bg-black rounded-full mt-2`}
                          />
                          <Text
                            style={tw`flex-1 font-LufgaRegular text-base text-subText`}
                          >
                            {item}
                          </Text>
                        </View>

                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={tw`mt-1`}
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

                {/*     ------------------ included Service end hare  ---------------- */}

                {/* ------------------ price ---------------- */}
                <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
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
                  />
                  <Text
                    style={tw`text-regularText font-LufgaRegular text-base`}
                  >
                    USD
                  </Text>
                </View>
                {errors.price && touched.price && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.price as any}
                  </Text>
                )}
                {/* ------------------ Duration ---------------- */}
                <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
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
                  />
                  <Text
                    style={tw`text-regularText font-LufgaRegular text-base`}
                  >
                    / hour
                  </Text>
                </View>
                {errors.duration && touched.duration && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.duration as any}
                  </Text>
                )}
              </View>
              {/* --------------------- bottom button ---------------- */}
              <PrimaryButton
                onPress={handleSubmit}
                buttonText="Update"
                buttonTextStyle={tw`font-LufgaMedium text-base`}
                leftIcon={IconPlus}
                buttonContainerStyle={tw`mt-8`}
              />
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default EditMyService;
