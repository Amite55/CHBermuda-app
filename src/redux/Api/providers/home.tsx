import { api } from "../../BaseApi";

export const userHomeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getHomePage: builder.query({
      query: () => ({
        url: `/home-page`,
        method: "GET",
      }),
      providesTags: ["Account", "Booking", "Payment", "Profile"],
    }),
  }),
});

export const { useGetHomePageQuery } = userHomeSlices;
