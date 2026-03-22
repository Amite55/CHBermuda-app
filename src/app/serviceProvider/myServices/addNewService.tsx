import {
  IconDeleteRed,
  IconImageUpload,
  IconPlus,
  IconPlushPrimaryColor,
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useAddPackageMutation } from "@/src/redux/Api/providers/accounts/myServices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { addPackageSchema } from "@/src/validationSchema/userValidationSchema";
import DateTimePicker from "@react-native-community/datetimepicker";
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

const AddNewService = () => {
  const [servicesText, setServicesText] = React.useState("");
  const [serviceIncludeArry, setServiceIncludeArry] = React.useState<string[]>(
    [],
  );
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState<"date" | "time">("date");
  const [show, setShow] = React.useState(false);

  // ================= api end point ==================
  const [addPackage, { isLoading: isAddPackageLoading }] =
    useAddPackageMutation();

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
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
          }}
          onSubmit={(values) => console.log(values)}
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
                <View
                  style={tw`justify-center items-center gap-2 bg-white p-4 rounded-2xl mt-3`}
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
                    Upload coder photo for this package
                  </Text>
                </View>

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
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    placeholder="Write something about this package"
                    placeholderTextColor="#535353"
                    style={tw`flex-1 text-regularText font-LufgaRegular text-base`}
                  />
                </View>
                {errors.description && touched.description && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.description}
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
                {errors.included_services && touched.included_services && (
                  <Text style={tw`text-red-500 text-xs mt-1`}>
                    {errors.included_services}
                  </Text>
                )}

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
                {/* ------------------ included Service end hare  ---------------- */}

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
              </View>
              {/* --------------------- bottom button ---------------- */}

              <PrimaryButton
                onPress={handleSubmit}
                buttonText="Add"
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

export default AddNewService;
