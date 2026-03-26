import { api } from "@/src/redux/BaseApi";

export const userHomeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentTransactions: builder.query({
      query: ({ page, per_page }) => ({
        url: `/provider-recent-transactions?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Account", "Booking", "Payment", "Profile", "Balance"],
    }),
    getOrderProvided: builder.query({
      query: ({ page, per_page }) => ({
        url: `/order-provided?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Account", "Booking", "Payment", "Profile", "Balance"],
    }),
  }),
});

export const {
  useGetOrderProvidedQuery,
  useLazyGetOrderProvidedQuery,
  useGetRecentTransactionsQuery,
  useLazyGetRecentTransactionsQuery,
} = userHomeSlices;
