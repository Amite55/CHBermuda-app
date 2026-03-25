import {
  IconCameraWhite,
  IconDeleteRed,
  IconRightCornerArrowGray,
  IconSave,
  IconStaffProfile,
} from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import LogoutModal from "@/src/context/LogoutModal";
import { useImagePicker } from "@/src/hooks/useImagePicker";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import {
  useDeleteStaffMutation,
  useGetStaffsDetailsQuery,
  useUpdateStaffMutation,
} from "@/src/redux/Api/providers/accounts/staffs";
import ProviderDetailsSkeleton from "@/src/Skeletion/ProviderDetailsSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { addStaffsSchema } from "@/src/validationSchema/userValidationSchema";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
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
import { SvgXml } from "react-native-svg";

const EditStaffProfile = () => {
  const { id } = useLocalSearchParams();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // =============== hooks ===================
  const { image, previewUri, loading, error, pickImage } = useImagePicker();
  const toast = useToastHelpers();

  //  ==================== api end point ====================
  const { data: getStaffDetails, isLoading: isStaffDetailsLoading } =
    useGetStaffsDetailsQuery(id);
  const [updateStaffProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateStaffMutation();
  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation();

  // =============== update staff profile ===================
  const handleUpdateStaffProfile = async (value: any) => {
    try {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("phone", value.phone);
      formData.append("location", value.location);
      formData.append("_method", "PUT");
      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: image.name,
          type: image.type,
        } as any);
      }
      const res = await updateStaffProfile({ id, data: formData }).unwrap();
      if (res) {
        toast.success("Profile updated successfully!", 3000);
      }
    } catch (error: any) {
      console.log(error, "staffs update profile filed");
      toast.showError(
        error.message || "Your staff profile updated failed",
        3000,
      );
    }
  };

  // ================ delete staffs =============
  const handleDeleteStaff = async () => {
    try {
      const res = await deleteStaff(id).unwrap();
      if (res) {
        setDeleteModalVisible(false);
        toast.success("Staff deleted successfully!", 3000);
        router.back();
      }
    } catch (error: any) {
      console.log(error, "staffs delete filed");
      toast.showError(error.message || "Your staff  deleted failed", 3000);
      setDeleteModalVisible(false);
    }
  };

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

  // ============== loading state ==================
  if (isStaffDetailsLoading) {
    return <ProviderDetailsSkeleton />;
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          enableReinitialize
          initialValues={{
            name: getStaffDetails?.data?.name || "",
            email: getStaffDetails?.data?.email || "",
            phone: getStaffDetails?.data?.phone || "",
            location: getStaffDetails?.data?.location || "",
          }}
          onSubmit={(values) => handleUpdateStaffProfile(values)}
          validationSchema={addStaffsSchema}
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
                  title="Staff details "
                  onPress={() => router.back()}
                />

                {/* ======================= user profile image ======================= */}
                <View style={tw`relative items-center`}>
                  <Image
                    style={tw` w-24 h-24 rounded-full`}
                    source={image ? previewUri : getStaffDetails?.data?.image}
                    contentFit="cover"
                    placeholder={ImgPlaceholderProfile}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={pickImage}
                    disabled={loading}
                    style={tw`absolute right-4/12 -bottom-1 w-10 h-10 items-center justify-center rounded-full bg-primaryBtn`}
                  >
                    {loading ? (
                      <ActivityIndicator size={"small"} color="#fff" />
                    ) : (
                      <SvgXml xml={IconCameraWhite} />
                    )}
                  </TouchableOpacity>
                </View>
                {/* =-================= how much provided services =-================= */}
                <MenuCard
                  endIcon={IconRightCornerArrowGray}
                  icon={IconStaffProfile}
                  titleText=" Service provided"
                  subTitleText={`${getStaffDetails?.data?.order_completed} Service Provided`}
                  containerStyle={tw`justify-center rounded-full px-3 h-16 mt-6`}
                  onPress={() => {
                    router.push({
                      pathname:
                        "/serviceProvider/providerStaffs/providedServiceFromStaff",
                      params: { id: getStaffDetails?.data?.id },
                    });
                  }}
                />
                {/* ---------- input form ---------- */}
                <View style={tw` my-4`}>
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
                      {errors.name as any}
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
                      {errors.email as any}
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
                      {errors.phone as any}
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
                      {errors.location as any}
                    </Text>
                  )}
                </View>
              </View>
              <View>
                {/* =-================= how much provided services =-================= */}
                <MenuCard
                  icon={IconDeleteRed}
                  titleText="Remove staff"
                  subTitleText="Your account will be permanently deleted from this application."
                  containerStyle={tw`justify-center  px-3  mt-6`}
                  onPress={() => {
                    setDeleteModalVisible(true);
                  }}
                />
                {/* ====================== buttons ====================== */}
                <PrimaryButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  buttonText="Save changes"
                  buttonTextStyle={tw`text-lg font-LufgaRegular`}
                  leftIcon={IconSave}
                  buttonContainerStyle={tw`mt-4 h-10`}
                  disabled={isUpdateProfileLoading}
                  loading={isUpdateProfileLoading}
                />
              </View>

              {/* =================== delete modal ====================== */}
              <LogoutModal
                modalVisible={deleteModalVisible}
                onPress={() => handleDeleteStaff()}
                setModalVisible={setDeleteModalVisible}
                buttonTitle="Remove"
                disabled={false}
                modalTitle="Are you sure to remove this staff ?"
                subTitle="After removing, this staff will no longer available it this system."
                loading={isDeleting}
              />
            </ScrollView>
          )}

          {/* -------------------   submit button   ------------------ */}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditStaffProfile;
