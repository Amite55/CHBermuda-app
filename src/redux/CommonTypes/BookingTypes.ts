export interface UserInfo {
  name: string;
  email: string;
  location: string;
}

export interface BookingState {
  booking_type: "respite_care" | "thirdparty_booking" | "admin_booking";
  date: string;
  time?: string;
  amount?: number;
  subscriptionId?: string;
  adminSubscriptionId?: string;
  package_time_id?: string;
  userInfo: UserInfo;
  providerInfo?: {
    providerId: string;
    providerName: string;
    providerImage: string;
    totalOrders: number;
    rating: number;
    review: number;
  };
  packageInfo?: {
    id: string;
    title: string;
    price: number;
    duration: number;
    servicePackageImage: string;
  };
  respiteCarePackageDetails?: {
    respiteCareId: string;
    name: string;
    respiteCareImage: string;
    addons: string[];
  };
}

export interface UserInfoFormType {
  fullName: string;
  email: string;
  location: string;
}
