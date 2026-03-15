import { BookingState } from "../redux/CommonTypes/BookingTypes";

const buildAddonsPayload = (addons: string[]) =>
  addons.reduce<Record<string, string>>((acc, value, index) => {
    acc[`add_ons_id[${index + 1}]`] = value;
    return acc;
  }, {});

export const buildBookingPayload = (booking: BookingState) => {
  const base = {
    name: booking.userInfo?.name,
    email: booking.userInfo?.email,
    location: booking.userInfo?.location,
    booking_type: booking.booking_type,
    date: booking.date,
  };

  switch (booking.booking_type) {
    case "respite_care": {
      const addons = booking.respiteCarePackageDetails?.addons ?? [];
      return {
        ...base,
        respite_care_id: booking.respiteCarePackageDetails?.respiteCareId,
        amount: booking.amount,
        ...(addons.length > 0 && buildAddonsPayload(addons)),
      };
    }

    case "thirdparty_booking":
      return {
        ...base,
        provider_id: booking.providerInfo?.providerId,
        package_id: booking.packageInfo?.id,
        package_time_id: booking.package_time_id,
        ...(booking.subscriptionId
          ? { subscription_id: booking.subscriptionId }
          : { amount: booking.packageInfo?.price }),
      };

    case "admin_booking":
      return {
        ...base,
        provider_id: booking.providerInfo?.providerId,
        package_id: booking.packageInfo?.id,
        subscription_id: booking.adminSubscriptionId,
      };

    default:
      return base;
  }
};
