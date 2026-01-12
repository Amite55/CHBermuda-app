import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import tw from "../lib/tailwind";

const Toaster = () => {
  const { res } = useLocalSearchParams();
  const params = useGlobalSearchParams();
  const pathname = usePathname();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  React.useEffect(() => {
    const currentPath = pathname; // save the path when modal loads

    const timer = setTimeout(() => {
      // check if user still on this modal page
      if (router.canGoBack() && pathname === currentPath) {
        router.back();
      }
    }, Number(params?.time) || 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={tw`flex-1 bg-black/40 justify-center items-center`}>
      <View style={tw`w-80 bg-slate-700 px-4 py-3 rounded-xl absolute top-4`}>
        <Text style={tw`text-white text-sm`}>{res}</Text>
      </View>
    </View>
  );
};

export default Toaster;
