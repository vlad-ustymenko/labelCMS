"use client";
import React from "react";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams } from "next/navigation";
import styles from "./Button.module.css";

const Button = ({ title, href = "", className, primary }) => {
  const { locale } = useParams();
  const animateTransition = usePageTransition();

  return (
    <Link
      href={`/${locale}${href}`}
      className={primary ? `${styles.primary} ${className}` : className}
      onClick={(e) => {
        e.preventDefault();
        animateTransition(`/${locale}${href}`);
      }}
    >
      {title}
    </Link>
  );
};

export default Button;
