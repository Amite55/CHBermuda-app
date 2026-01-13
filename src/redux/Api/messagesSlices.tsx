import { api } from "../BaseApi";

export const messagesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/send-message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),
    editMessage: builder.mutation({
      query: (data) => ({
        url: `/edit-message/${data.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),
    getMessages: builder.query({
      query: (receiver_id) => ({
        url: `/get-message?receiver_id=${receiver_id}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),
    markAsRead: builder.mutation({
      query: (receiver_id) => ({
        url: `/mark-as-read`,
        method: "POST",
        body: receiver_id,
      }),
      invalidatesTags: ["Message"],
    }),
    getSearchNewUser: builder.query({
      query: (role) => ({
        url: `/search-new-user?role=${role}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),
    getChatList: builder.query({
      query: () => ({
        url: `/chat-list`,
        method: "GET",
      }),
      providesTags: ["Message"],
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
