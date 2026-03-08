import { IconRightArrow } from "@/assets/icons";
import BackTitleButton from "@/src/lib/BackTitleButton";
import SkeletonBox from "@/src/lib/CustomSkeleton/SkeletonBox";
import tw from "@/src/lib/tailwind";
import { useGetActivePlansQuery } from "@/src/redux/Api/userRole/accountSlices";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const serviceTypes = [
  {
    id: 1,
    label: "Transport",
    value: "transport",
  },
  {
    id: 2,
    label: "Care giving",
    value: "care_giving",
  },
];

const SelectProviderType = () => {
  const [selected, setSelected] = useState("transport");

  // ================== api end point ================
  const {
    data: activePlans,
    isLoading: isActivePlansLoading,
    refetch,
  } = useGetActivePlansQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // ==================== filtered by bundle plans ====================
  const findActiveBundlePlanArray = activePlans?.data?.filter(
    (item: any) => item?.subscription_type === "bundle",
  );

  const handleNext = () => {
    console.log("Selected Type:", selected);
  };

  if (isActivePlansLoading) {
    return (
      <View>
        <SkeletonBox height={16} width={160} />
        <SkeletonBox height={16} width={160} />
        <SkeletonBox height={16} width={160} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-bgBaseColor px-5  justify-between`}>
      {/* Top Section */}
      <View>
        {/* Header */}
        <BackTitleButton title="Select type" onPress={() => router.back()} />

        <Text style={tw` text-lg font-semibold my-6`}>
          Which type of service you want ?
        </Text>

        {/* Options */}
        <View style={tw`gap-3`}>
          {serviceTypes.map((item) => {
            const active = selected === item.value;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.5}
                onPress={() => setSelected(item.value)}
                style={tw`flex-row items-center bg-white rounded-xl px-4 py-4`}
              >
                <View
                  style={tw.style(
                    "w-5 h-5 rounded-full border-2 mr-3 items-center justify-center",
                    active ? "border-blue-600" : "border-gray-400",
                  )}
                >
                  {active && (
                    <View style={tw`w-2.5 h-2.5 rounded-full bg-blue-600`} />
                  )}
                </View>

                <Text style={tw`text-base`}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Next Button */}
      <PrimaryButton
        buttonText="Next"
        buttonTextStyle={tw`font-LufgaMedium text-base`}
        buttonContainerStyle={tw`mt-2 h-12`}
        rightIcon={IconRightArrow}
        onPress={() => {
          handleNext();
        }}
      />
    </View>
  );
};

export default SelectProviderType;
