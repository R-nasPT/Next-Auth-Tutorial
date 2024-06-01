import { EMAIL_PATTERN } from "@/app/constants";
import { InputError, LoginForm, SignUpFromInput } from "@/app/types";

export const validateSignData = (data: SignUpFromInput): InputError => {
  let err = {};

  if (data.name.trim() === "") {
    err = { name: "Name is required" };
  } else if (data.name.length < 4) {
    err = { name: "Name must be at least 4 characters long" };
  } else if (data.name.length > 30) {
    err = { name: "Name must be less 30 characters" };
  } else if (data.email.trim() === "") {
    err = { email: "Name is required" };
  } else if (!EMAIL_PATTERN.test(data.email)) {
    err = { email: "Please provide valid email" };
  } else if (data.password.trim() === "") {
    err = { password: "Password is required" };
  } else if (data.password?.length < 6) {
    err = { password: "Password should be atleast 6 characters long" };
  } else if (data.password !== data.confirmPassword) {
    err = { confirmPassword: "Password don't match" };
  }
  return err;
};

export const validateLoginData = (data: LoginForm): InputError => {
  let err = {};

  if (data.email.trim() === "") {
    err = { email: "Name is required" };
  } else if (!EMAIL_PATTERN.test(data.email)) {
    err = { email: "Please provide valid email" };
  } else if (data.password.trim() === "") {
    err = { password: "Password is required" };
  }
  return err;
};
