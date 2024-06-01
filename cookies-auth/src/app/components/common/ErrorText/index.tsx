import styles from './ErrorText.module.scss'

interface ErrorTextProps {
  text: string;
}

export default function ErrorText({ text }: ErrorTextProps) {
  return (
    <p className={styles.errorMsg}>{text}</p>
  );
}
