"use client";
import Link from "next/link";
import { usePageTransition } from "../hooks/usePageTransition";
import styles from "./not-found.module.css";
import "../app/globals.css";

export default function NotFound() {
  const animateTransition = usePageTransition();
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>sdcvwe</h1>
      <p className={styles.text}>sdvsd</p>
      <Link
        href="/"
        className={styles.link}
        onClick={(e) => {
          e.preventDefault();
          animateTransition(`/`);
        }}
      >
        wefwe
      </Link>
    </main>
  );
}
