import Link from "next/link";
import styles from "./Auth.module.scss";

interface InfoTextProps {
  text: string;
  linkHref: string;
  linkTitle: string;
}
export default function InfoText({ text, linkHref, linkTitle }: InfoTextProps) {
  return (
    <div>
      <span className={styles.infoText}>{text}</span>
      <Link className={styles.link} href={linkHref}>
        {linkTitle}
      </Link>
    </div>
  );
}
