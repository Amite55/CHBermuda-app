import { IconCrossWhite, IconWallet, IconWithdraw } from "@/assets/icons";
import { ImgPlaceholderProfile } from "@/assets/image";
import { useProfile } from "@/src/hooks/useGetUserProfile";
import { usePagination } from "@/src/hooks/usePagination";
import BackTitleButton from "@/src/lib/BackTitleButton";
import { useToastHelpers } from "@/src/lib/helper/useToastHelper";
import tw from "@/src/lib/tailwind";
import { useLazyGetRecentTransactionsQuery } from "@/src/redux/Api/providers/accounts/balancAndOrder";
import {
  useCreateInstantPayoutWithdrawMutation,
  useGetAccountBalanceQuery,
} from "@/src/redux/Api/stripeSlices";
import StaffsSkeleton from "@/src/Skeletion/StaffsSkeleton";
import PrimaryButton from "@/src/utils/PrimaryButton";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Transaction {
  id: number;
  booking_id: number;
  created_at: string;
  package: { id: number; title: string };
  package_id: number;
  payment_intent_id: string;
  profit: string;
  provider_id: number;
  purchase_amount: string;
  respite_care_id: number | null;
  show_in_provider: number;
  status: string;
  subscription_id: number | null;
  transaction_id: string;
  transaction_type: string;
  updated_at: string;
  user: { avatar: string; id: number; name: string };
  user_id: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatAmount = (amount: string | number) => {
  const num = parseFloat(String(amount));
  return `$${num.toFixed(2)}`;
};

// ─── Transaction Row ──────────────────────────────────────────────────────────
const TransactionItem = ({ item }: { item: Transaction }) => {
  const isWithdrawn = item.transaction_type === "withdrawal";
  return (
    <View style={tw`flex-row items-center gap-3 py-3 border-b border-gray-100`}>
      {/* Icon */}
      <View
        style={tw`w-10 h-10 rounded-full items-center justify-center ${
          isWithdrawn ? "bg-red-100" : "bg-green-100"
        }`}
      >
        {isWithdrawn ? (
          // Arrow up-right (withdrawal)
          <Text style={tw`text-red-500 text-lg`}>↗</Text>
        ) : (
          // Arrow down-left (incoming)
          <Text style={tw`text-green-500 text-lg`}>↙</Text>
        )}
      </View>

      {/* Info */}
      <View style={tw`flex-1`}>
        {isWithdrawn ? (
          <>
            <Text style={tw`text-red-500 font-LufgaMedium text-sm`}>
              Withdrawn
            </Text>
            <Text style={tw`text-subText font-LufgaRegular text-xs`}>
              **** **** ****
            </Text>
          </>
        ) : (
          <>
            <Text
              style={tw`text-textColor font-LufgaMedium text-sm`}
              numberOfLines={1}
            >
              {item.package?.title ?? "Service"}
            </Text>
            <View style={tw`flex-row items-center gap-1 mt-0.5`}>
              <Image
                source={item.user?.avatar}
                style={tw`w-5 h-5 rounded-full`}
                contentFit="cover"
                placeholder={ImgPlaceholderProfile}
              />
              <Text style={tw`text-subText font-LufgaRegular text-xs`}>
                {item.user?.name ?? "User"}
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Amount */}
      <Text
        style={tw`font-LufgaSemiBold text-sm ${
          isWithdrawn ? "text-red-500" : "text-green-500"
        }`}
      >
        {isWithdrawn ? "- " : "+ "}
        {formatAmount(item.purchase_amount)}
      </Text>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const MyWallet = () => {
  const [ammount, setAmount] = useState("");
  const ratingBottomSheetModalRef = useRef<BottomSheetModal>(null);

  // ================ hooks =================
  const { profileData, isProfileLoading } = useProfile();
  const toast = useToastHelpers();
  // api end point ==========================================================
  const [resendTransactions, { isLoading: isLoadingTrans }] =
    useLazyGetRecentTransactionsQuery();
  const { data: getAccountBalance, isLoading: isLoadingBalance } =
    useGetAccountBalanceQuery(profileData?.data?.stripe_account_id, {
      skip: !profileData?.data?.stripe_account_id,
    });
  const [createWithdrawal, { isLoading: isLoadingWithdrawal }] =
    useCreateInstantPayoutWithdrawMutation();

  // ======== handle withdrawal ========
  const handleWithdrawal = async () => {
    try {
      const data = {
        amount: ammount,
        currency: "usd",
        method: "standard",
      };

      const response = await createWithdrawal(data).unwrap();
      setAmount("");
      if (response) {
        ratingBottomSheetModalRef.current?.close();
        toast.success(
          response?.message || "Withdrawal request sent successfully",
          300,
        );
      }
    } catch (error: any) {
      console.log(error, "Your Withdraw request not success!");
      toast.showError("Your Withdraw request not success!", 3000);
    }
  };

  const {
    data: transSectionsData,
    isLoading,
    isFetchingMore,
    refreshing,
    fetchData,
    loadMore,
    refresh,
  } = usePagination(resendTransactions);

  useEffect(() => {
    fetchData(1, true);
  }, []);

  // ─── Header ───────────────────────────────────────────────────────────────
  const ListHeader = useCallback(
    () => (
      <View style={tw`gap-4`}>
        <BackTitleButton title="My Wallet" onPress={() => router.back()} />

        {/* Balance Card */}
        <View
          style={tw`bg-white rounded-2xl items-center py-6 gap-3 px-4 shadow-sm`}
        >
          {/* Wallet icon */}

          {/* Replace with your actual wallet image/icon */}
          <SvgXml xml={IconWallet} />
          <Text style={tw`text-subText font-LufgaRegular text-sm mb-1`}>
            Available balance
          </Text>
          {isLoadingBalance ? (
            <ActivityIndicator size="small" color="#1D4ED8" />
          ) : (
            <Text style={tw`text-textColor font-LufgaBold text-3xl`}>
              ${getAccountBalance?.data?.available?.[0]?.amount || "0.00"}
            </Text>
          )}
        </View>

        {/* Withdraw Button */}
        <PrimaryButton
          buttonContainerStyle={tw`h-12`}
          buttonText="Withdraw"
          leftIcon={IconWithdraw}
          onPress={() => ratingBottomSheetModalRef.current?.present()}
        />

        {/* Section Title */}
        <Text style={tw`text-black font-LufgaSemiBold text-base mt-1`}>
          Recent transactions
        </Text>
      </View>
    ),
    [getAccountBalance, isLoadingBalance],
  );

  // ─── Empty ────────────────────────────────────────────────────────────────
  const ListEmpty = useCallback(
    () =>
      !isLoading ? (
        <View style={tw`items-center py-10`}>
          <Text style={tw`font-LufgaRegular text-sm text-subText`}>
            No recent transactions
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#1D4ED8" style={tw`py-10`} />
      ),
    [isLoading],
  );

  // ─── Footer ───────────────────────────────────────────────────────────────
  const ListFooter = useCallback(
    () =>
      isFetchingMore ? (
        <ActivityIndicator size="small" color="#000" style={tw`py-4`} />
      ) : null,
    [isFetchingMore],
  );

  // ─── Refresh ──────────────────────────────────────────────────────────────
  const onRefreshHandler = useCallback(() => {
    fetchData(1, true);
  }, [fetchData]);

  //   ============= loading =================
  if (isLoadingBalance || isProfileLoading) {
    return <StaffsSkeleton />;
  }

  return (
    <>
      <FlatList
        data={transSectionsData as Transaction[]}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={tw`bg-bgBaseColor px-5 gap-3 pb-6`}
        style={tw`flex-1 bg-bgBaseColor`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => <TransactionItem item={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefreshHandler}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={ListEmpty}
      />

      {/* ===================== withdrawal modal ===================== */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ratingBottomSheetModalRef}
          snapPoints={["80%"]}
          containerStyle={tw`bg-gray-500 bg-opacity-20`}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
            />
          )}
        >
          <BottomSheetScrollView contentContainerStyle={tw`flex-1  bg-white`}>
            {/* ----------------- header title part ---------------- */}
            <View
              style={tw`flex-row items-center justify-between bg-primaryBtn py-2 px-4 rounded-t-2xl`}
            >
              <View />
              <Text style={tw`font-LufgaMedium text-sm text-white`}>
                Feedback
              </Text>
              <TouchableOpacity
                onPress={() => ratingBottomSheetModalRef.current?.dismiss()}
              >
                <SvgXml xml={IconCrossWhite} />
              </TouchableOpacity>
            </View>

            {/* = ----------------- plan content ---------------- */}
            <View
              style={tw`rounded-3xl bg-white px-4 py-4 flex-grow justify-between`}
            >
              <View style={tw`justify-center items-center gap-2`}>
                {/* ------------- rating section ------------- */}
                <Text style={tw`font-LufgaRegular text-black text-base mt-4`}>
                  Withdraw can take up to 7 days
                </Text>

                {/* ------------------ user feedback description ---------------- */}
                <BottomSheetTextInput
                  placeholder="Enter amount to withdraw"
                  placeholderTextColor={"#535353"}
                  textAlignVertical="top"
                  style={tw`font-LufgaRegular text-black text-base mt-4 bg-bgBaseColor w-full rounded-2xl p-3 h-12`}
                  onChangeText={(text) => setAmount(text)}
                  value={ammount}
                  keyboardType="numeric"
                />
              </View>

              {/* = ----------------- button content ---------------- */}
              <PrimaryButton
                onPress={() => {
                  handleWithdrawal();
                }}
                buttonText="Done"
                buttonTextStyle={tw`text-sm`}
                loading={isLoadingWithdrawal}
                disabled={isLoadingWithdrawal}
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default MyWallet;
