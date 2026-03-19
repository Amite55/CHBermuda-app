import { api } from "@/src/redux/BaseApi";

export const userHomeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyStaffs: builder.query({
      query: ({ page, per_page }) => ({
        url: `/staffs/?page=${page}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Staff", "Account", "Provider"],
    }),
    addStaff: builder.mutation({
      query: (data) => ({
        url: "/staffs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff", "Account", "Provider"],
    }),
    updateStaff: builder.mutation({
      query: (data) => ({
        url: `/staffs/${data?.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Staff", "Account", "Provider"],
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/staffs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff", "Account", "Provider"],
    }),
    assignStaff: builder.mutation({
      query: (data) => ({
        url: `/staffs/assign`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff", "Provider", "Notification"],
    }),
    getStaffServiceProvided: builder.query({
      query: ({ page, per_page, id }) => ({
        url: `/staffs/service-provided/${id}?page=${page}?per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Service", "Provider"],
    }),
  }),
});

export const {
  useGetMyStaffsQuery,
  useLazyGetMyStaffsQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useAssignStaffMutation,
  useGetStaffServiceProvidedQuery,
} = userHomeSlices;
