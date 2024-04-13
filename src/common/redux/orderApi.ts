import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Review } from "./model";
import { url } from "inspector";

export const orderApi = createApi({
  reducerPath: "orederApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://o-complex.com:1337/" }),
  endpoints: (build) => ({
    postOrder: build.mutation({
      query: ({ ...order }) => ({
        url: `order/`,
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { usePostOrderMutation } = orderApi;
