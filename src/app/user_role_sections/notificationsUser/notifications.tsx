import { IconUserNotification } from "@/assets/icons";
import NotificationCard from "@/src/components/NotificationCard";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import BackTitleButton from "@/src/lib/BackTitleButton";
import NotificationSkeleton from "@/src/lib/CustomSkeleton/NotificationSkeletion";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import {
  useLazyGetNotificationsQuery,
  useSingleMarkAsReadMutation,
} from "@/src/redux/Api/notificationSlices";
import { INotification } from "@/src/redux/CommonTypes/CommonType";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, View } from "react-native";

// number of page to load
const LIMIT = 10;
const Notifications = () => {
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [notificationData, setIsNotificationData] = React.useState([]);

  // ============== hooks end point ================
  const { profileData, isProfileLoading } = useProfile();

  // ============== api end point ================
  const [
    getNotifications,
    {
      isLoading: isNotificationDataLoading,
      isFetching: isNotificationDataFetching,
    },
  ] = useLazyGetNotificationsQuery({});
  const [
    singleMarkNotification,
    { isLoading: isSingleMarkNotificationLoading },
  ] = useSingleMarkAsReadMutation();

  // ================ handle mark as read and navigate to details page ================
  const handleMarkAsReadClick = async (notification: any) => {
    try {
      if (!notification?.read_at) {
        await singleMarkNotification(notification?.id).unwrap();
      }
    } catch (error: any) {
      console.log("Ignore mark error:", error?.data?.message);
    }
    if (profileData?.data?.role === "USER") {
      router.push({
        pathname: "/user_role_sections/notificationsUser/orderDetailsStatus",
        params: {
          status: notification?.data?.data?.type,
          id: notification?.data?.data?.booking_id,
          ...(notification?.data?.data?.request_id &&
            notification?.data?.data?.type === "new_delivery_request" && {
              request_id: notification?.data?.data?.request_id,
            }),
        },
      });
    } else if (
      profileData?.data?.role === "PROVIDER"
      // profileData?.data?.provider_type === "THIRDPARTY"
    ) {
      router.push({
        pathname: "/serviceProvider/notificationProvider/providerOrderDetails",
        params: {
          status: notification?.data?.data?.type,
          booking_id: notification?.data?.data?.booking_id,
        },
      });
    }
  };

  // ========================= get data with paginate ========================
  const loadData = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      try {
        const response = await getNotifications({
          page: pageNum,
          per_page: LIMIT,
          _timestamp: Date.now(),
        }).unwrap();

        const newData = response?.data?.notifications?.data || [];
        const lastPage = response?.data?.notifications?.last_page || 1;
        if (isRefresh) {
          setIsNotificationData(newData);
        } else if (pageNum === 1) {
          setIsNotificationData(newData);
        } else {
          setIsNotificationData((prevData) => [...prevData, ...newData]);
        }
        setHasMore(pageNum < lastPage);
        // =============== update page number ===============
        if (pageNum < lastPage) {
          setPage(pageNum + 1);
        }
      } catch (error: any) {
        console.log(error, "not get package data ------------>");
      }
    },
    [getNotifications],
  );

  // ========= initial render =========
  useEffect(() => {
    loadData(1);
  }, []);

  // ============= load more =================
  const handleLoadMore = useCallback(async () => {
    if (!isNotificationDataFetching && hasMore) {
      await loadData(page);
    }
  }, [loadData, isNotificationDataFetching, hasMore, page]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setPage(1);
      await loadData(1, true);
    } finally {
      setRefreshing(false);
    }
  };
  // ================ notification skeleton loading =================
  if (isNotificationDataLoading || isProfileLoading) {
    return <NotificationSkeleton />;
  }

  // =================== render notification card/items ===============
  const RenderNotificationItems = (item: INotification) => {
    return (
      <NotificationCard
        onPress={() => {
          handleMarkAsReadClick(item);
        }}
        title={item?.data?.title}
        description={item?.data?.body}
        time={helpers.timeDataAgo(item?.created_at)}
        icon={IconUserNotification}
        type={item?.data?.data?.type}
        containerStyle={[tw``, item?.read_at ? tw`bg-white` : tw`bg-gray-300`]}
      />
    );
  };

  return (
    <View style={tw`flex-1 bg-bgBaseColor`}>
      <FlatList
        data={notificationData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-3 flex-grow `}
        refreshing={refreshing}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => {
          return (
            <BackTitleButton
              title="Notifications user"
              onPress={() => router.back()}
            />
          );
        }}
        renderItem={(item) => RenderNotificationItems(item?.item)}
      />
    </View>
  );
};

export default Notifications;
