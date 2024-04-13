import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Review } from "./model";

export const reviewsApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://o-complex.com:1337/" }),
  endpoints: (build) => ({
    getReviews: build.query<Review[], void>({
      query: () => `reviews/`,
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
