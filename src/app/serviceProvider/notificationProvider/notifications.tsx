import { NotificationProviderData } from "@/src/components/AllData";
import NotificationCard from "@/src/components/NotificationCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

const Notifications = () => {
  return (
    <View style={tw`flex-1 bg-bgBaseColor`}>
      <FlatList
        data={NotificationProviderData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 flex-grow `}
        ListHeaderComponent={() => {
          return (
            <BackTitleButton
              title="Notifications"
              onPress={() => router.back()}
            />
          );
        }}
        renderItem={(item) => (
          <NotificationCard
            onPress={() => {
              router.push({
                pathname:
                  "/serviceProvider/notificationProvider/providerOrderDetails",
                params: { status: item.item.status },
              });
            }}
            title={item.item.title}
            description={item.item.description}
            time={item.item.time}
            icon={item.item.icon}
          />
        )}
      />
    </View>
  );
};

export default Notifications;
