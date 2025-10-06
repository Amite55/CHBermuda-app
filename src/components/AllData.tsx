import { IconUserNotification } from "@/assets/icons";
import {
  ImgCategoryCareGivers,
  ImgCategoryCleaners,
  ImgCategoryMealDelivery,
  ImgCategoryNurse,
  ImgCategoryTransports,
} from "@/assets/image";

export const CategoryData = [
  {
    id: 1,
    name: "Care givers",
    image: ImgCategoryCareGivers,
    provider: "Admin",
  },
  {
    id: 2,
    name: "Cleaners",
    image: ImgCategoryCleaners,
    provider: "Provider",
  },
  {
    id: 3,
    name: "Transports",
    image: ImgCategoryTransports,
    provider: "Provider",
  },
  {
    id: 4,
    name: "Meal delivery",
    image: ImgCategoryMealDelivery,
    provider: "Provider",
  },
  {
    id: 5,
    name: "Physiotherapy",
    image: ImgCategoryMealDelivery,
    provider: "Admin",
  },
  {
    id: 6,
    name: "Rotating Nurse",
    image: ImgCategoryNurse,
    provider: "Admin",
  },
];

export const ServicesData = [
  {
    id: 1,
    title: "Meal delivery",
    providers: 16,
    price: 175,
    image: ImgCategoryCareGivers,
    description: "Nutritious, senior-friendly meals delivered to your door.",
    included: [
      "4 freshly prepared, balanced meals per week.",
      "Delivered directly to the client’s home.",
      "Additional meals available upon request.",
    ],
  },
  {
    id: 2,
    title: "Home cleaning",
    providers: 22,
    price: 120,
    image: ImgCategoryCleaners,
    description: "Weekly home cleaning service tailored to your needs.",
    included: [
      "Dusting, vacuuming, and mopping.",
      "Kitchen and bathroom cleaning.",
      "Flexible scheduling options.",
    ],
  },
  {
    id: 3,
    title: "Personal care",
    providers: 10,
    price: 200,
    image: ImgCategoryTransports,
    description: "Compassionate assistance with daily personal activities.",
    included: [
      "Bathing and grooming support.",
      "Medication reminders.",
      "Respectful companionship.",
    ],
  },
  {
    id: 4,
    title: "Transportation",
    providers: 18,
    price: 90,
    image: ImgCategoryMealDelivery,
    description: "Safe and reliable rides to appointments and errands.",
    included: [
      "Door-to-door pickup service.",
      "Available for medical and social outings.",
      "Drivers trained in senior care.",
    ],
  },
  {
    id: 5,
    title: "Physical therapy",
    providers: 12,
    price: 220,
    image: ImgCategoryMealDelivery,
    description: "Professional therapy sessions to improve mobility.",
    included: [
      "One-on-one physical therapy.",
      "Customized exercise plans.",
      "Progress tracking and reporting.",
    ],
  },
  {
    id: 6,
    title: "Companionship",
    providers: 30,
    price: 80,
    image: ImgCategoryNurse,
    description: "Friendly visits to reduce loneliness and isolation.",
    included: [
      "Engaging conversations.",
      "Board games and reading together.",
      "Accompaniment to events.",
    ],
  },
  {
    id: 7,
    title: "Grocery delivery",
    providers: 25,
    price: 60,
    image: ImgCategoryNurse,
    description: "Fresh groceries delivered straight to your doorstep.",
    included: [
      "Weekly delivery slots.",
      "Custom shopping lists.",
      "Assistance with unpacking.",
    ],
  },
  {
    id: 8,
    title: "Home safety check",
    providers: 8,
    price: 150,
    image: ImgCategoryNurse,
    description: "Ensure your home environment is safe and hazard-free.",
    included: [
      "Fall-risk assessment.",
      "Installation of safety equipment.",
      "Detailed safety recommendations.",
    ],
  },
];

export const NotificationData = [
  {
    id: 1,
    title: "Your order has been placed.",
    description: "Crystal Comfort Plan",
    time: new Date().toDateString(),
    icon: IconUserNotification,
    status: "pending",
  },
  {
    id: 2,
    title: "Booking request approved.",
    description: "Crystal Comfort Plan",
    time: new Date().toDateString(),
    icon: IconUserNotification,
    status: "approved",
  },
  {
    id: 3,
    title: "Booking request canceled.",
    description: "Crystal Comfort Plan",
    time: new Date().toDateString(),
    icon: IconUserNotification,
    status: "canceled",
  },
  {
    id: 4,
    title: "Requested for delivery.",
    description: "Crystal Comfort Plan",
    time: new Date().toDateString(),
    icon: IconUserNotification,
    status: "delivered",
  },
];

export const ProviderServiceData = [
  {
    id: 1,
    title: "Meal delivery",
    price: 175,
    description: "Nutritious, senior-friendly meals delivered to your door.",
    duration: "1 hr",
  },
  {
    id: 2,
    title: "Home cleaning",
    price: 120,
    description: "Weekly home cleaning service tailored to your needs.",
    duration: "2 hr",
  },
  {
    id: 3,
    title: "Personal care",
    price: 200,
    description: "Compassionate assistance with daily personal activities.",
    duration: "1 hr",
  },
];

export const BookingTimeData = [
  {
    id: 1,
    time: "9:00 AM - 10:00 AM",
  },
  { id: 2, time: "10:00 AM - 11:00 AM" },
  { id: 3, time: "11:00 AM - 12:00 PM" },
  { id: 4, time: "12:00 PM - 1:00 PM" },
  { id: 5, time: "1:00 PM - 2:00 PM" },
];
