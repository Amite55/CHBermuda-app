import { configureStore } from "@reduxjs/toolkit";
import { api } from "./BaseApi";
import bookingSlice from "./appStore/bookingSlices";
const bookingReducer = bookingSlice;

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
