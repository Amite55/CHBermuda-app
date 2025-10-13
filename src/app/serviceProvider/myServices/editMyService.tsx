import {
  IconDeleteRed,
  IconPlus,
  IconPlushPrimaryColor,
  IconReUpload,
} from "@/assets/icons";
import { ImgServiceImage } from "@/assets/image";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import { router } from "expo-router";
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
import * as Yup from "yup";

const EditMyService = () => {
  const [servicesText, setServicesText] = React.useState();
  const [serviceIncludeArry, setServiceIncludeArry] = React.useState([]);

  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  console.log(date, "");

  const onChange = (event, selectedDate) => {
    const selelctedEdnTime = selectedDate;
    setShow(false);
    setDate(selelctedEdnTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // ==================== Validation Schema ====================
  const LoginSchema = Yup.object().shape({
    title: Yup.string().required("Package title is required"),
    about: Yup.string().required("Package about is required"),
    price: Yup.string().required("Price is required"),
  });

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
          contentContainerStyle={tw`px-5 pb-10`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <BackTitleButton title="Edit package" onPress={() => router.back()} />
          {/* --------------- service image  --------------- */}
          <View style={tw`relative`}>
            <Image
              style={tw`w-full h-40 rounded-3xl mt-2`}
              contentFit="cover"
              source={ImgServiceImage}
            />

            <View
              style={tw`absolute top-4 right-3 flex-row items-center gap-2`}
            >
              <TouchableOpacity
                onPress={() => {}}
                activeOpacity={0.6}
                style={tw`w-10 h-10 rounded-lg bg-gray-400 border border-white justify-center items-center shadow`}
              >
                <SvgXml xml={IconReUpload} />
              </TouchableOpacity>
            </View>
          </View>

          {/* -0----------------- input from here ----------------- */}
          <Formik
            initialValues={{ title: "", about: "", price: "" }}
            onSubmit={(values) => console.log(values)}
            validationSchema={LoginSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <View style={tw`w-full  mt-5`}>
                {/* ------------------ package title ---------------- */}
                <Text style={tw`font-LufgaMedium text-base text-black`}>
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
                <Text style={tw`font-LufgaMedium text-base text-black pt-3`}>
                  About
                </Text>
                <View
                  style={tw`w-full h-12  px-4 rounded-full border border-borderColor gap-3`}
                >
                  <TextInput
                    onChangeText={handleChange("about")}
                    onBlur={handleBlur("about")}
                    value={values.about}
                    placeholder="Write something about this package"
                    placeholderTextColor="#535353"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                  />
                </View>
                {errors.about && touched.about && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.about}
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
                    multiline
                    onChange={(text) => setServicesText(text.nativeEvent.text)}
                    placeholder="Type here..."
                    placeholderTextColor="#535353"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={!servicesText}
                    onPress={() => {
                      setServiceIncludeArry([
                        ...serviceIncludeArry,
                        servicesText,
                      ]);
                    }}
                    style={tw`border border-subText bg-white bg-opacity-35 w-12 h-12 items-center justify-center rounded-full`}
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
                        <TouchableOpacity>
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
                    {errors.price}
                  </Text>
                )}

                {/* --------------- Time Slot start hare --------------- */}
                {/* start time */}
                <Text style={tw`font-LufgaMedium text-base text-black pt-10`}>
                  Start Time
                </Text>
                <View style={tw`flex-row items-center justify-between   px-3`}>
                  <Text style={tw`font-LufgaMedium text-regularText text-base`}>
                    {date
                      ? date.toLocaleTimeString([], { hour12: true })
                      : "12:00 PM"}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      showMode("time");
                    }}
                    style={tw`border border-subText bg-white bg-opacity-35 w-12 h-12 items-center justify-center rounded-full`}
                  >
                    <SvgXml xml={IconPlushPrimaryColor} />
                  </TouchableOpacity>
                </View>
                {/* end time */}
                <Text style={tw`font-LufgaMedium text-base text-black pt-2`}>
                  End Time
                </Text>
                <View style={tw`flex-row items-center justify-between   px-3`}>
                  <Text style={tw`font-LufgaMedium text-regularText text-base`}>
                    {date
                      ? date.toLocaleTimeString([], { hour12: true })
                      : "12:00 AM"}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      showMode("time");
                    }}
                    style={tw`border border-subText bg-white bg-opacity-35 w-12 h-12 items-center justify-center rounded-full`}
                  >
                    <SvgXml xml={IconPlushPrimaryColor} />
                  </TouchableOpacity>
                </View>

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    onChange={onChange}
                  />
                )}

                {/* --------------------- bottom button ---------------- */}

                <PrimaryButton
                  // onPress={handleSubmit}
                  buttonText="Add"
                  buttonTextStyle={tw`font-LufgaMedium text-base`}
                  leftIcon={IconPlus}
                  buttonContainerStyle={tw`mt-8`}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default EditMyService;
