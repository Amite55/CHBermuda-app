import { IconDeleteRed, IconRightCornerArrowWhite } from "@/assets/icons";
import { ImgProfileImg } from "@/assets/image";
import MenuCard from "@/src/components/MenuCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import PrimaryButton from "@/src/utils/PrimaryButton";
import { router } from "expo-router";
import React from "react";
import { FlatList } from "react-native-gesture-handler";

const Cart = () => {
  const [cart, setCart] = React.useState(true);
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw` bg-bgBaseColor px-5 gap-3 pb-3 flex-grow justify-between`}
      ListHeaderComponent={() => {
        return <BackTitleButton onPress={() => router.back()} title="Cart" />;
      }}
      renderItem={({ item }) => {
        return (
          <MenuCard
            endIconOnPress={() => {}}
            titleText="Transportation service"
            titleTextStyle={tw`text-sm`}
            subTitleText="$1,799/month"
            image={ImgProfileImg}
            imageStyle={tw`w-16 h-16 rounded-full `}
            endIcon={IconDeleteRed}
            containerStyle={tw`py-2`}
          />
        );
      }}
      ListFooterComponent={() => {
        return (
          <PrimaryButton
            buttonText="Buy Now"
            onPress={() => {
              router.push("/user_role_sections/paymentSystem");
            }}
            rightIcon={IconRightCornerArrowWhite}
            buttonContainerStyle={tw`h-10`}
            buttonTextStyle={tw`text-lg`}
          />
        );
      }}
    />
  );
};

export default Cart;
