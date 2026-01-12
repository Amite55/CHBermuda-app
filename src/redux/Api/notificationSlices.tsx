import { api } from "../BaseApi";
import { tagTypes } from "../tagsTypes";

export const notificationSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page, per_page }) => ({
        url: `/notifications?per_page=${per_page}&page=${page}`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
    singleMarkAsRead: builder.mutation({
      query: (id) => ({
        url: `/mark-notification/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    allMarkAsRead: builder.mutation({
      query: () => ({
        url: `/mark-all-notification`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSingleMarkAsReadMutation,
  useAllMarkAsReadMutation,
} = notificationSlices;
