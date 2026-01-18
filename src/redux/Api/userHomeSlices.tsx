import { api } from "../BaseApi";

export const userHomeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: `/all-services-list`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getServiceThirdParty: builder.query({
      query: () => ({
        url: `/random-thirdparty-services`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getServiceWisePackage: builder.query({
      query: ({ service_id, per_page, page }) => {
        return {
          url: `/service-wise-packages?per_page=${per_page}&page=${page}&service_id=${service_id}`,
          method: "GET",
        };
      },
      providesTags: ["Package"],
    }),
    addRespiteCareRequest: builder.mutation({
      query: (data) => ({
        url: "/add-respite-care-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Package"],
    }),
    getAdminPackageDetails: builder.query({
      query: (id) => ({
        url: `/admin-package-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    getRespiteCarePackageDetails: builder.query({
      query: (id) => ({
        url: `/respite-care-package-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    getThirdPartyProviderDetails: builder.query({
      query: (id) => ({
        url: `/provider-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    getPackageTime: builder.query({
      query: (id) => ({
        url: `/package-times/${id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    getAddonBundles: builder.query({
      query: ({ page, per_page }) => ({
        url: `/addons?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetServiceThirdPartyQuery,
  useGetServiceWisePackageQuery,
  useLazyGetServiceWisePackageQuery,
  useAddRespiteCareRequestMutation,
  useGetAdminPackageDetailsQuery,
  useGetRespiteCarePackageDetailsQuery,
  useGetThirdPartyProviderDetailsQuery,
  useGetPackageTimeQuery,
  useGetAddonBundlesQuery,
} = userHomeSlices;
