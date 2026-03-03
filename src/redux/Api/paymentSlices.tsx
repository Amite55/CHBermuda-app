import { api } from "../BaseApi";

export const paymentSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/stripe/payment/payment-intent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment", "Booking"],
    }),
    subscriptionSuccessAdminPackageORBundle: builder.mutation({
      query: (data) => ({
        url: `/subscription-success`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment", "Booking", "Provider"],
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useSubscriptionSuccessAdminPackageORBundleMutation,
} = paymentSlices;
