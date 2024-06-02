"use client";
import { useState } from "react";
import Input from "../common/Input";
import styles from "./Auth.module.scss";
import Button from "../common/Button";
import { InputError, SignUpFromInput } from "@/app/types";
import { validateSignData } from "@/lib/validator";
import InfoText from "./InfoText";
import axios, { AxiosError } from "axios";
import { isObjectEmpty } from "@/helper/client-helper";
import { redirect } from "next/navigation";
import ErrorText from "../common/ErrorText";
import { useAuthContext } from "@/app/contexts/AuthContext";

export default function SignUp() {
  const [data, setData] = useState<SignUpFromInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user, setUser } = useAuthContext();

  const [validationError, setValidationError] = useState<InputError>({});
  const [submitError, setSubmitError] = useState<string>("");

  const handleInputChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateSignData(data);
    setValidationError(err);

    const isValid = isObjectEmpty(err);
    if (isValid) {
      try {
        const apiRes = await axios.post(
          "http://localhost:3000/api/auth/signup",
          data
        );
        if (apiRes.data?.success) {
          setSubmitError("");
          setUser(apiRes.data.user)
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error;
          setSubmitError(errorMsg);
        }
      }
    }
  };

  if (user) redirect("/profile");

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignUp}>
        <h2 className={styles.title}>Sign Up</h2>
        <Input
          label="Name"
          name="name"
          value={data.name}
          onChange={handleInputChang}
          error={validationError.name}
        />
        <Input
          label="Email"
          name="email"
          value={data.email}
          onChange={handleInputChang}
          error={validationError.email}
        />
        <Input
          label="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleInputChang}
          error={validationError.password}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={data.confirmPassword}
          onChange={handleInputChang}
          error={validationError.confirmPassword}
        />
        <Button type="submit" title="Sign Up" />

        {submitError && <ErrorText text={submitError} />}

        <InfoText
          text="Don't have account"
          linkHref={"/login"}
          linkTitle="Login"
        />
      </form>
    </div>
  );
}
