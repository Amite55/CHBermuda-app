export interface ISignUp {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

// ================ notification types=================
export interface INotification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    title: string;
    body: string;
    data: {
      booking_id: number;
      type: string; // e.g. "booking_approved"
    };
  };
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

// ================= staffs type =========
export interface IStaffs {
  email: string;
  location: string;
  name: string;
  phone: string;
}
