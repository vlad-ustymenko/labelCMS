import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>sdcvwe</h1>
      <p className={styles.text}>sdvsd</p>
      <Link href="/" className={styles.link}>
        wefwe
      </Link>
    </main>
  );
}
