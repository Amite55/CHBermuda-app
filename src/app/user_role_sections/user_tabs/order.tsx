import {
  ImgG,
  ImgNoOrder,
  ImgProfileImg,
  ImgServiceImage,
} from "@/assets/image";
import OrderCard from "@/src/components/OrderCard";
import UserInfoHeader from "@/src/components/UserInfoHeader";
import tw from "@/src/lib/tailwind";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
        <UserInfoHeader
          containerStyle={tw`px-5`}
          userName="Rohit"
          userImage={ImgProfileImg}
          cartOnPress={() => {
            router.push("/user_role_sections/cart");
          }}
          notificationOnPress={() => {
            router.push("/user_role_sections/notificationsUser/notifications");
          }}
          profileOnPress={() => {
            router.push("/user_role_sections/user_tabs/user_profile");
          }}
        />
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
              onPress={() => {
                setOrderStatus("Pending");
                // router.push({
                //   pathname:
                //     "/user_role_sections/notificationsUser/orderDetailsStatus",
                //   params: { status: "pending" },
                // });
              }}
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

            {/* Ongoing */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setOrderStatus("Ongoing");

                // router.push({
                //   pathname:
                //     "/user_role_sections/notificationsUser/orderDetailsStatus",
                //   params: { status: "approved" },
                // });
              }}
              style={tw.style(
                "flex-1 h-8 rounded-lg justify-center items-center",
                orderStatus === "Ongoing"
                  ? "bg-primaryBtn"
                  : "border border-primaryBtn bg-white"
              )}
            >
              <Text
                style={tw.style(
                  "font-LufgaMedium text-base",
                  orderStatus === "Ongoing" ? "text-white" : "text-primaryBtn"
                )}
              >
                Ongoing
              </Text>
            </TouchableOpacity>

            {/* Completed */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setOrderStatus("Completed");

                // router.push({
                //   pathname:
                //     "/user_role_sections/notificationsUser/orderDetailsStatus",
                //   params: { status: "completed" },
                // });
              }}
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
          </View>

          {/* ========================== order list ========================== */}
          <View style={tw`mt-4 gap-4`}>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <OrderCard
                  key={index.toString()}
                  onPress={() => {}}
                  image={ImgServiceImage}
                  title="Order Title"
                  subTitle="Order Sub Title"
                  dateAndTime="Date and Time"
                />
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
