"use client";
import { InputError, LoginForm } from "@/app/types";
import styles from "./Auth.module.scss";
import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import InfoText from "./InfoText";
import { validateLoginData } from "@/lib/validator";
import { isObjectEmpty } from "@/helper/client-helper";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import ErrorText from "../common/ErrorText";
import { useAuthContext } from "@/app/contexts/AuthContext";

export default function Login() {
  const [data, setData] = useState<LoginForm>({
    email: "",
    password: "",
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateLoginData(data);
    setValidationError(err);

    const isValid = isObjectEmpty(err);
    if (isValid) {
      try {
        const apiRes = await axios.post(
          "http://localhost:3000/api/auth/login",
          data
        );
        if (apiRes.data?.success) {
          setSubmitError("");
          setUser(apiRes.data.user);
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
      <form
        className={`${styles.form} ${styles.loginForm}`}
        onSubmit={handleLogin}
      >
        <h2 className={styles.title}>Login</h2>
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

        <Button type="submit" title="Login" />

        {submitError && <ErrorText text={submitError} />}

        <InfoText
          text="Already have an account"
          linkHref={"/signup"}
          linkTitle="Sign Up"
        />
      </form>
    </div>
  );
}
