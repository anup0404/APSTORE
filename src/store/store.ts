import { configureStore } from "@reduxjs/toolkit";
import productSelectionReducer from "./slice/productSlice";

import { baseApi } from "./api/baseApi";
// import { authApi } from "./api/authApi";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    productSelection: productSelectionReducer,
    // auth: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
