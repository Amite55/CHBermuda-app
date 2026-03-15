import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address")
    .required("Email is required"),
  location: Yup.string().required("Location is required"),
});
