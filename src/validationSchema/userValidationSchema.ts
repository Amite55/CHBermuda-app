import * as Yup from "yup";
// ====================== Validation Schema user info ======================
export const userValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address")
    .required("Email is required"),
  location: Yup.string().required("Location is required"),
});

// =========================== add staffs schema ===========================
export const addStaffsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  location: Yup.string().required("Location is required"),
});

// ==================== Validation Schema ====================
export const addPackageSchema = Yup.object().shape({
  title: Yup.string().required("Package title is required"),
  description: Yup.string().required("Package about is required"),
  price: Yup.string().required("Price is required"),
  included_services: Yup.string().required("Included services is required"),
});
