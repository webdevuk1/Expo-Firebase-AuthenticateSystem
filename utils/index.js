import * as Yup from "yup";

export const updateEmailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("")
    .email("Enter a valid email address")
    .label("Email"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("")
    .email("Enter a valid email address")
    .label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("")
    .email("Enter a valid email address")
    .label("Email"),
  password: Yup.string().required("").min(6).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must match password.")
    .required("Confirm Password is required."),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required("")
    .label("Email")
    .email("Enter a valid email address"),
});
