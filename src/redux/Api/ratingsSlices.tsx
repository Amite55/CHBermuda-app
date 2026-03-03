import { api } from "../BaseApi";

export const ratingsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    addRatings: builder.mutation({
      query: (data) => ({
        url: `/ratings`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddRatingsMutation } = ratingsSlices;
