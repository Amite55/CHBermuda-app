import { api } from "../../BaseApi";

export const accountSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivePlans: builder.query({
      query: () => ({
        url: "/get-active-plans",
        method: "GET",
      }),
      providesTags: ["Plan"],
    }),
    getFAQS: builder.query({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
      providesTags: ["Pages"],
    }),
    getPages: builder.query({
      query: (type) => ({
        url: `/pages?type=${type}`,
        method: "GET",
      }),
      providesTags: ["Pages"],
    }),
    support: builder.mutation({
      query: (data) => ({
        url: "/support",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Pages"],
    }),
  }),
});

export const {
  useGetActivePlansQuery,
  useGetFAQSQuery,
  useGetPagesQuery,
  useSupportMutation,
} = accountSlices;
