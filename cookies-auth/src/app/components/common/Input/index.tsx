import { useEffect, useState } from "react";
import styles from "./input.module.scss";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ErrorText from "../ErrorText";

interface InputProps {
  label: string;
  value: string;
  onChange: (even: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  error?: string;
}
export default function Input({ label, value, onChange, type, name, error }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    if (type === "password" && showPassword) {
      setInputType("text");
    } else {
      setInputType(type);
    }
  }, [showPassword, type]);

  const togglePasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
        />
        <span className={styles.label}>{label}</span>
        {type === "password" &&
          (showPassword ? (
            <BsEyeSlash
              className={styles.showHideIcon}
              onClick={togglePasswordIcon}
            />
          ) : (
            <BsEye
              className={styles.showHideIcon}
              onClick={togglePasswordIcon}
            />
          ))}
      </div>
      {error && <ErrorText text={error} />}
    </div>
  );
}
