import { api } from "../BaseApi";
import { tagTypes } from "../tagsTypes";

export const authSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [tagTypes.profile, tagTypes.auth],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    socialLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.profile],
    }),
    verifyOtp: builder.mutation({
      query: (code) => ({
        url: "/auth/otp-verification",
        method: "POST",
        body: code,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/change-password",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
      }),
      providesTags: [tagTypes.profile],
    }),
    editProfilePic: builder.mutation({
      query: (formData) => ({
        url: "/edit-profile-picture",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    deleteProfile: builder.mutation({
      query: (password) => ({
        url: "/delete-profile",
        method: "POST",
        body: password,
      }),
      invalidatesTags: [tagTypes.profile, tagTypes.auth],
    }),
    editProfile: builder.mutation({
      query: (credentials) => ({
        url: "/edit-profile",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    updateLatLong: builder.mutation({
      query: (LatLong) => ({
        url: "/update-lat-long",
        method: "POST",
        body: LatLong,
      }),
      invalidatesTags: [tagTypes.profile, tagTypes.auth],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: [
        tagTypes.auth,
        tagTypes.profile,
        tagTypes.notification,
        tagTypes.booking,
        tagTypes.payment,
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSocialLoginMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetProfileQuery,
  useEditProfilePicMutation,
  useDeleteProfileMutation,
  useEditProfileMutation,
  useUpdateLatLongMutation,
  useLogoutMutation,
} = authSlices;
