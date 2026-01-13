import { api } from "../BaseApi";

export const notificationSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page, per_page }) => ({
        url: `/notifications?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    singleMarkAsRead: builder.mutation({
      query: (id) => ({
        url: `/mark-notification/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
    allMarkAsRead: builder.mutation({
      query: () => ({
        url: `/mark-all-notification`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSingleMarkAsReadMutation,
  useAllMarkAsReadMutation,
} = notificationSlices;
