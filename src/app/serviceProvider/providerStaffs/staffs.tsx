import { IconPlus, IconRightTopConnerArrow } from "@/assets/icons";
import { ImgEmployees, ImgProfileImg } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Staffs = () => {
  const [activeStatus, setActiveStatus] = React.useState("all");
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor `}
      contentContainerStyle={tw`pb-5 px-5`}
    >
      <View style={tw`relative`}>
        <BackTitleButton title="Staffs" onPress={() => router.back()} />
        <TouchableOpacity
          onPress={() => {
            router.push("/serviceProvider/providerStaffs/addNewStaffs");
          }}
          activeOpacity={0.7}
          style={tw`absolute top-2 right-0 bg-primaryBtn flex-row items-center justify-center gap-1 rounded-lg py-2 px-3`}
        >
          <Text style={tw`font-LufgaMedium text-base text-white`}>Add</Text>
          <SvgXml xml={IconPlus} />
        </TouchableOpacity>
      </View>
      <View
        style={tw`justify-center items-center gap-2 bg-white p-5 rounded-2xl mt-3`}
      >
        <Image
          style={tw`w-16 h-14`}
          source={ImgEmployees}
          contentFit="contain"
        />
        <Text style={tw`font-LufgaRegular text-sm text-subText`}>
          Total employees
        </Text>
        <Text style={tw`font-LufgaSemiBold text-lg text-black`}>30</Text>
      </View>
      {/* staffs  */}
      <View style={tw`flex-row justify-between mt-3`}>
        {/* active staff */}
        <TouchableOpacity
          onPress={() => setActiveStatus("active")}
          activeOpacity={0.7}
          style={[
            tw`w-[48%] gap-2 bg-white p-5 rounded-2xl  justify-center items-center`,
            activeStatus === "active" ? tw`bg-primaryBtn` : tw`bg-white`,
          ]}
        >
          <View style={tw`relative`}>
            <Text
              style={[
                tw`font-LufgaRegular text-lg `,
                activeStatus === "active" ? tw`text-white` : tw`text-subText`,
              ]}
            >
              Available
            </Text>
            <View
              style={tw`absolute -top-1 -right-2  w-3 h-3 bg-blue-600  rounded-full`}
            />
          </View>
          <Text
            style={[
              tw`font-LufgaSemiBold text-xl text-black`,
              activeStatus === "active" ? tw`text-white` : tw`text-black`,
            ]}
          >
            10
          </Text>
        </TouchableOpacity>
        {/* inactive staff */}
        <TouchableOpacity
          onPress={() => setActiveStatus("inactive")}
          activeOpacity={0.7}
          style={[
            tw`w-[48%] gap-2  p-5 rounded-2xl justify-center items-center`,
            activeStatus === "inactive" ? tw`bg-primaryBtn` : tw`bg-white`,
          ]}
        >
          <View style={tw`relative`}>
            <Text
              style={[
                tw`font-LufgaRegular text-lg text-subText`,
                activeStatus === "inactive" ? tw`text-white` : tw`text-subText`,
              ]}
            >
              Unavailable
            </Text>
            <View
              style={tw`absolute -top-1 -right-2 w-3 h-3 bg-gray-600  rounded-full`}
            />
          </View>
          <Text
            style={[
              tw`font-LufgaSemiBold text-xl text-black`,
              activeStatus === "inactive" ? tw`text-white` : tw`text-black`,
            ]}
          >
            20
          </Text>
        </TouchableOpacity>
      </View>
      {/* all staffs */}
      <Text style={tw`font-LufgaSemiBold text-xl text-black mt-4`}>
        All Staffs
      </Text>
      <View style={tw`mt-3 gap-4`}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => {
          return (
            <MenuCard
              key={index}
              onPress={() => {
                router.push("/serviceProvider/providerStaffs/editStaffProfile");
              }}
              titleText="Mr. Lopez"
              subTitleText="example@gmail.com"
              image={ImgProfileImg}
              imageStyle={tw`w-20 h-20 rounded-full `}
              endIcon={IconRightTopConnerArrow}
              containerStyle={tw`py-2`}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Staffs;
