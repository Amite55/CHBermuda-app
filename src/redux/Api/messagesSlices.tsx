import { api } from "../BaseApi";
import { tagTypes } from "../tagsTypes";

export const messagesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/send-message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.message],
    }),
    editMessage: builder.mutation({
      query: (data) => ({
        url: `/edit-message/${data.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.message],
    }),
    getMessages: builder.query({
      query: (receiver_id) => ({
        url: `/get-message?receiver_id=${receiver_id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.message],
    }),
    markAsRead: builder.mutation({
      query: (receiver_id) => ({
        url: `/mark-as-read`,
        method: "POST",
        body: receiver_id,
      }),
      invalidatesTags: [tagTypes.message],
    }),
    getSearchNewUser: builder.query({
      query: (role) => ({
        url: `/search-new-user?role=${role}`,
        method: "GET",
      }),
      providesTags: [tagTypes.message],
    }),
    getChatList: builder.query({
      query: () => ({
        url: `/chat-list`,
        method: "GET",
      }),
      providesTags: [tagTypes.message],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useEditMessageMutation,
  useGetMessagesQuery,
  useMarkAsReadMutation,
  useGetSearchNewUserQuery,
  useGetChatListQuery,
} = messagesSlices;
