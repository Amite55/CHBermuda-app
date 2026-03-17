import { api } from "../../BaseApi";

export const userHomeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getProviderOrders: builder.query({
      query: ({ per_page, page, status }) => ({
        url: `/provider-orders?per_page=${per_page}&page=${page}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["Booking", "Payment", "Notification"],
    }),
    getBookingDetails: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      providesTags: ["Booking", "Payment", "Notification"],
    }),
    declineBooking: builder.mutation({
      query: (id) => ({
        url: `/decline-booking/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Booking", "Notification"],
    }),
    acceptBooking: builder.mutation({
      query: (id) => ({
        url: `/accept-booking/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Booking", "Notification"],
    }),
    sendDeliveryRequest: builder.mutation({
      query: (data) => ({
        url: `/send-delivery-request`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking", "Notification"],
    }),
  }),
});

export const {
  useGetProviderOrdersQuery,
  useGetBookingDetailsQuery,
  useDeclineBookingMutation,
  useAcceptBookingMutation,
  useSendDeliveryRequestMutation,
} = userHomeSlices;
