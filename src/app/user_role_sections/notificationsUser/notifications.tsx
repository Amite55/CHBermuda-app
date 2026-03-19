import { IconUserNotification } from "@/assets/icons";
import NotificationCard from "@/src/components/NotificationCard";
import BackTitleButton from "@/src/lib/BackTitleButton";
import NotificationSkeleton from "@/src/lib/CustomSkeleton/NotificationSkeletion";
import { helpers } from "@/src/lib/helper/helpers";
import tw from "@/src/lib/tailwind";
import { useLazyGetNotificationsQuery } from "@/src/redux/Api/notificationSlices";
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

  // ============== api end point ================
  const [
    getNotifications,
    {
      isLoading: isNotificationDataLoading,
      isFetching: isNotificationDataFetching,
    },
  ] = useLazyGetNotificationsQuery({});

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
  }, [getNotifications]);

  // ============= load more =================
  const handleLoadMore = useCallback(async () => {
    if (isNotificationDataFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await loadData(nextPage);
    }
  }, [loadData, isNotificationDataFetching, hasMore, page]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([isNotificationDataFetching]);
    } finally {
      setRefreshing(false);
    }
  };

  // ================ notification skeleton loading =================
  if (isNotificationDataLoading) {
    return <NotificationSkeleton />;
  }

  // =================== render notification card/items ===============
  const RenderNotificationItems = (item: INotification) => {
    console.log(
      item?.data?.data?.type,
      "this is notification types ===========>",
    );
    return (
      <NotificationCard
        onPress={() => {
          router.push({
            pathname:
              "/user_role_sections/notificationsUser/orderDetailsStatus",
            params: {
              status: item?.data?.data?.type,
              id: item?.data?.data?.booking_id,
            },
          });
        }}
        title={item?.data?.title}
        description={item?.data?.body}
        time={helpers.timeDataAgo(item?.created_at)}
        icon={IconUserNotification}
        type={item?.data?.data?.type}
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
        onEndReached={handleLoadMore}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
