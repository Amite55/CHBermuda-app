import { api } from "../../BaseApi";

export const orderSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrder: builder.query({
      query: ({ page, per_page, status }) => ({
        url: `/user-orders?per_page=${per_page}&page=${page}&status=${status}`,
        method: "GET",
      }),
    }),
    getAdminProviderByPackageId: builder.query({
      query: ({ id, page, per_page }) => ({
        url: `/admin-provider-by-package-id/${id}?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Provider"],
    }),
    getThirdPartyProviderByServiceId: builder.query({
      query: ({ id, page, per_page }) => ({
        url: `/thirdparty-provider-by-service-id/${id}?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Provider"],
    }),
    getAdminProviderDetails: builder.query({
      query: (id) => ({
        url: `/admin-provider-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Provider"],
    }),
    bookingSubscription: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    bookingSuccessRespiteCare: builder.mutation({
      query: (data) => ({
        url: "/respite-care-booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    bookingSuccessThirdParty: builder.mutation({
      query: (data) => ({
        url: "/thirdparty-booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    getBookingDetails: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      providesTags: ["Booking", "Payment", "Notification"],
    }),
    getDeliveryRequestDetails: builder.query({
      query: (id) => ({
        url: `/delivery-request/${id}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    declineDeliveryRequest: builder.mutation({
      query: (id) => ({
        url: `/decline-delivery-request/${id}`,
        method: "POST",
        body: {
          _method: "PUT",
        },
      }),
      invalidatesTags: ["Booking"],
    }),
    acceptDeliveryRequest: builder.mutation({
      query: (id) => ({
        url: `/accept-delivery-request/${id}`,
        method: "POST",
        body: {
          _method: "PUT",
        },
      }),
      invalidatesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/cancel-booking/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetUserOrderQuery,
  useLazyGetUserOrderQuery,
  useGetAdminProviderByPackageIdQuery,
  useLazyGetAdminProviderByPackageIdQuery,
  useGetThirdPartyProviderByServiceIdQuery,
  useLazyGetThirdPartyProviderByServiceIdQuery,
  useGetAdminProviderDetailsQuery,
  useBookingSubscriptionMutation,
  useBookingSuccessRespiteCareMutation,
  useBookingSuccessThirdPartyMutation,
  useGetBookingDetailsQuery,
  useGetDeliveryRequestDetailsQuery,
  useDeclineDeliveryRequestMutation,
  useAcceptDeliveryRequestMutation,
  useCancelBookingMutation,
} = orderSlices;
