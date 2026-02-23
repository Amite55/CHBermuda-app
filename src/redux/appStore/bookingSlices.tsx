import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type ServiceType = "admin" | "respite" | "third_party" | null;

interface BookingStateType {
  serviceType: ServiceType;
  serviceId: string | null;
  providerId: string | null;
  date: string | null;
  time: string | null;
  addons: string[];
  subscriptionId: string | null;
  paymentMethod: string | null;
  billingInfo: {
    name: string;
    email: string;
    phone: string;
  } | null;
}

const initialState: BookingStateType = {
  serviceType: null,
  serviceId: null,
  providerId: null,
  date: null,
  time: null,
  addons: [],
  subscriptionId: null,
  paymentMethod: null,
  billingInfo: null,
};

const bookingSlices = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setServiceType: (state, action) => {
      state.serviceType = action.payload;
    },

    updateBooking(state, action: PayloadAction<Partial<BookingStateType>>) {
      return { ...state, ...action.payload };
    },

    resetBooking() {
      return initialState;
    },
  },
});

export const { setServiceType, updateBooking, resetBooking } =
  bookingSlices.actions;

export default bookingSlices.reducer;
