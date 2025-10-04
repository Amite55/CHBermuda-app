import { IconRatingStar } from "@/assets/icons";
import { ImgBennerImage, ImgG, ImgNoOrder } from "@/assets/image";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import { Image, ImageBackground } from "expo-image";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Order = () => {
  const [orderStatus, setOrderStatus] = React.useState<any>("Pending");
  const [orderData, setOrderData] = React.useState<any>(true);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-bgBaseColor`}
      contentContainerStyle={tw`pb-20`}
    >
      <ImageBackground style={[tw` w-full h-36 `]} source={ImgG}>
        {/* ------------------- user header part ---------------- */}
        <UserInfoHeader containerStyle={tw`px-5`} />
        <Text
          style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
        >
          Orders
        </Text>
      </ImageBackground>

      {orderData ? (
        <View style={tw`px-5`}>
          {/* ============================= order section ============================= */}

          <View style={tw`flex-row justify-between items-center  gap-1 my-2`}>
            {/* Pending */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOrderStatus("Pending")}
              style={tw.style(
                "flex-1 h-8 rounded-lg justify-center items-center",
                orderStatus === "Pending"
                  ? "bg-primaryBtn"
                  : "border border-primaryBtn bg-white"
              )}
            >
              <Text
                style={tw.style(
                  "font-LufgaMedium text-base",
                  orderStatus === "Pending" ? "text-white" : "text-primaryBtn"
                )}
              >
                Pending
              </Text>
            </TouchableOpacity>

            {/* Completed */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOrderStatus("Completed")}
              style={tw.style(
                "flex-1 h-8 rounded-lg justify-center items-center",
                orderStatus === "Completed"
                  ? "bg-primaryBtn"
                  : "border border-primaryBtn bg-white"
              )}
            >
              <Text
                style={tw.style(
                  "font-LufgaMedium text-base",
                  orderStatus === "Completed" ? "text-white" : "text-primaryBtn"
                )}
              >
                Completed
              </Text>
            </TouchableOpacity>

            {/* Canceled */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOrderStatus("Canceled")}
              style={tw.style(
                "flex-1 h-8 rounded-lg justify-center items-center",
                orderStatus === "Canceled"
                  ? "bg-primaryBtn"
                  : "border border-primaryBtn bg-white"
              )}
            >
              <Text
                style={tw.style(
                  "font-LufgaMedium text-base",
                  orderStatus === "Canceled" ? "text-white" : "text-primaryBtn"
                )}
              >
                Canceled
              </Text>
            </TouchableOpacity>
          </View>

          {/* ========================== order list ========================== */}
          <View style={tw`mt-4 gap-4`}>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  style={tw`flex-row items-center gap-4 px-5 py-4 bg-white  rounded-xl`}
                >
                  <Image
                    style={tw`w-16 h-16 rounded-full`}
                    source={ImgBennerImage}
                    contentFit="contain"
                  />
                  <View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text
                        style={tw`font-LufgaMedium text-base text-regularText`}
                      >
                        Elizabeth Olson
                      </Text>
                      <Text
                        style={tw`font-LufgaRegular text-xs text-subText bg-slate-300 rounded-3xl px-1 py-0.5 `}
                      >
                        12 order
                      </Text>
                    </View>

                    <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                      Cristal comfort plan
                    </Text>
                    <View style={tw`flex-row items-center gap-1`}>
                      <SvgXml xml={IconRatingStar} />
                      <Text
                        style={tw`font-LufgaRegular text-sm text-regularText`}
                      >
                        4.0
                      </Text>
                      <Text style={tw`font-LufgaRegular text-sm text-subText`}>
                        (8 reviews)
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ) : (
        <View style={tw`flex-1 items-center justify-center gap-4 px-5`}>
          <Image style={tw`w-full h-36`} source={ImgNoOrder} />
          <Text
            style={tw`font-LufgaMedium text-2xl text-center text-regularText`}
          >
            Purchase a plan
          </Text>
          <Text
            style={tw`font-LufgaMedium text-base  text-subText text-center`}
          >
            Purchase a subscription and book a service to see them in this area.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Order;
