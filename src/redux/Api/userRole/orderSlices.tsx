import { api } from "../../BaseApi";

export const orderSlices = api.injectEndpoints({
  endpoints: (builder) => ({
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
    getThirdPartyProviderDetails: builder.query({
      query: (id) => ({
        url: `/thirdparty-provider-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Provider"],
    }),
    booking: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAdminProviderByPackageIdQuery,
  useLazyGetAdminProviderByPackageIdQuery,
  useGetThirdPartyProviderByServiceIdQuery,
  useLazyGetThirdPartyProviderByServiceIdQuery,
  useGetAdminProviderDetailsQuery,
  useGetThirdPartyProviderDetailsQuery,
  useBookingMutation,
} = orderSlices;
