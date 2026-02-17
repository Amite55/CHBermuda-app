import { api } from "../BaseApi";

export const authSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["SingIn"],
    }),
    register: builder.mutation({
      query: (registerInfo) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: registerInfo,
        };
      },
      invalidatesTags: ["SingUp"],
    }),
    socialLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["SingUp", "SingIn", "Profile"],
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
      providesTags: ["Profile"],
    }),
    editProfilePic: builder.mutation({
      query: (formData) => ({
        url: "/edit-profile-picture",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteProfile: builder.mutation({
      query: (password) => ({
        url: "/delete-profile",
        method: "POST",
        body: password,
      }),
      invalidatesTags: ["Profile", "SingIn", "SingUp"],
    }),
    editProfile: builder.mutation({
      query: (formData) => ({
        url: "/edit-profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateLatLong: builder.mutation({
      query: (LatLong) => ({
        url: "/update-lat-long",
        method: "POST",
        body: LatLong,
      }),
      invalidatesTags: ["Profile", "SingIn", "SingUp"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: [
        "Profile",
        "SingIn",
        "SingUp",
        "Notification",
        "Booking",
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
