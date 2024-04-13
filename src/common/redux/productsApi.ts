import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsT } from "./model";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://o-complex.com:1337/products",
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ page = 1, pageSize = 20 }) =>
        `?page=${page}&page_size=${pageSize}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
