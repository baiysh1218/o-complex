import { configureStore } from "@reduxjs/toolkit";
import { reviewsApi } from "./reviewsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./productsApi";
import { orderApi } from "./orderApi";

export const store = configureStore({
  reducer: {
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      reviewsApi.middleware,
      productsApi.middleware,
      orderApi.middleware
    ),
});

setupListeners(store.dispatch);
