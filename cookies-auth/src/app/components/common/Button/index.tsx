import styles from "./Button.module.scss";

interface ButtonProps {
  title: string;
  type?: "submit" | "button" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ title, type, onClick }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={styles.container}>
      {title}
    </button>
  );
}
