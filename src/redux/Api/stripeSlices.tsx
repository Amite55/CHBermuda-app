import { api } from "../BaseApi";

export const stripeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccountBalance: builder.query({
      query: (id) => ({
        url: `/stripe/connected/balance?account_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Balance", "Account"],
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: "/stripe/connected/account-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
    createOnboardingLink: builder.mutation({
      query: (data) => ({
        url: "/stripe/connected/account-link",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
    onboardingVerification: builder.mutation({
      query: (data) => ({
        url: "/stripe/connected/onboarding-verification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
    createInstantPayoutWithdraw: builder.mutation({
      query: (data) => ({
        url: "/stripe/connected/payout-instant",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useGetAccountBalanceQuery,
  useCreateAccountMutation,
  useCreateOnboardingLinkMutation,
  useOnboardingVerificationMutation,
  useCreateInstantPayoutWithdrawMutation,
} = stripeSlices;
