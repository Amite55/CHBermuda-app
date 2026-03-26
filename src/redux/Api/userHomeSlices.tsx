import { api } from "../BaseApi";

export const userHomeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: `/all-services-list`,
        method: "GET",
      }),
      providesTags: ["Category", "Package", "Service", "Plan"],
    }),
    getServiceThirdParty: builder.query({
      query: () => ({
        url: `/random-thirdparty-services`,
        method: "GET",
      }),
      providesTags: ["Service", "Category", "Package", "Plan"],
    }),
    getServiceWisePackage: builder.query({
      query: ({ service_id, per_page, page }) => {
        return {
          url: `/service-wise-packages?per_page=${per_page}&page=${page}&service_id=${service_id}`,
          method: "GET",
        };
      },
      providesTags: ["Package", "Category", "Service", "Plan"],
    }),
    addRespiteCareRequest: builder.mutation({
      query: (data) => ({
        url: "/add-respite-care-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Package", "Category", "Service", "Plan"],
    }),
    getAdminPackageDetails: builder.query({
      query: (id) => ({
        url: `/admin-package-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Package", "Category", "Service", "Plan"],
    }),
    getRespiteCarePackageDetails: builder.query({
      query: (id) => ({
        url: `/respite-care-package-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Package", "Category", "Service", "Plan"],
    }),
    getThirdPartyProviderDetails: builder.query({
      query: (id) => ({
        url: `/thirdparty-provider-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Package", "Category", "Service", "Plan"],
    }),
    getPackageTime: builder.query({
      query: (id) => ({
        url: `/package-times/${id}`,
        method: "GET",
      }),
      providesTags: ["Package", "Category", "Service", "Plan"],
    }),
    getAddonBundles: builder.query({
      query: ({ page, per_page }) => ({
        url: `/addons?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Package", "Category", "Service", "Plan"],
    }),
    getAddonBundlesDetails: builder.query({
      query: (id) => ({
        url: `/addons/${id}`,
        method: "GET",
      }),
      providesTags: ["Package", "Category", "Service", "Plan"],
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
  useLazyGetPackageTimeQuery,
  useGetAddonBundlesQuery,
  useLazyGetAddonBundlesQuery,
  useGetAddonBundlesDetailsQuery,
} = userHomeSlices;
