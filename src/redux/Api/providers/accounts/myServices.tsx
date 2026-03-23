import { api } from "@/src/redux/BaseApi";

export const userHomeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyPackage: builder.query({
      query: ({ page, per_page }) => ({
        url: `/my-services?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Package", "Service", "Category", "Account"],
    }),
    addPackage: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Package", "Service", "Account"],
    }),
    updatePackage: builder.mutation({
      query: (data) => ({
        url: `/packages/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Package", "Service", "Account"],
    }),
    getPackageDetails: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package", "Service", "Account", "Category"],
    }),
    addPackageTime: builder.mutation({
      query: (data) => ({
        url: "/add-package-time",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Package", "Service"],
    }),
    updatePackageTime: builder.mutation({
      query: (data) => ({
        url: `/update-package-time/${data.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Package", "Service"],
    }),
    removePackageTime: builder.mutation({
      query: (id) => ({
        url: `/remove-package-time/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package", "Service"],
    }),
  }),
});

export const {
  useAddPackageMutation,
  useGetMyPackageQuery,
  useLazyGetMyPackageQuery,
  useGetPackageDetailsQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useAddPackageTimeMutation,
  useUpdatePackageTimeMutation,
  useRemovePackageTimeMutation,
} = userHomeSlices;
