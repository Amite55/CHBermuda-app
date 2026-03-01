import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ============= user info type for billing info ==============
interface userInfoType {
  name: string;
  email: string;
  location: string;
  userImage: string | null;
}
// ============== provider info type for booking ==============
interface providerInfoType {
  providerId: string;
  providerName: string;
  providerLocation: string;
  review: number;
  rating: number;
  totalOrders: number;
  providerImage: string;
}

// ================= respite care package details type =================
interface respiteCarePackageDetailsType {
  respiteCareId: string;
  name: string;
  respiteCareImage: string;
  addons: string[];
}
// ================= admin service package details type =================
interface adminServicePackageDetailsType {
  serviceId: string;
  title: string;
  serviceImage: string;
  used: number;
  total: number;
  remaining: number;
}
interface thirdPartyServicePackageDetailsType {
  duration: string;
}
interface packageInfoType {
  id: string;
  title: string;
  price: number;
  servicePackageImage: string;
  duration: string;
}
// ================ booking state type =================
interface BookingStateType {
  booking_type: string | null;
  date: string | null;
  package_time_id: string | null;
  time: string | null;
  amount: number | null;
  packageInfo: packageInfoType | null;
  subscriptionId: string | null;
  userInfo: userInfoType | null;
  providerInfo: providerInfoType | null;
  respiteCarePackageDetails: respiteCarePackageDetailsType | null;
  adminServicePackageDetails: adminServicePackageDetailsType | null;
  thirdPartyServicePackageDetails: thirdPartyServicePackageDetailsType | null;
}
// ================= initial state ================
const initialState: BookingStateType = {
  booking_type: null,
  date: null,
  time: null,
  subscriptionId: null,
  amount: 0,
  package_time_id: null,
  packageInfo: null,
  userInfo: null,
  providerInfo: null,
  respiteCarePackageDetails: null,
  adminServicePackageDetails: null,
  thirdPartyServicePackageDetails: null,
};

const bookingSlices = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setServiceType: (state, action) => {
      state.booking_type = action.payload;
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
