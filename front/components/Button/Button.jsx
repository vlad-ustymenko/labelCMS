"use client";
import React from "react";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams } from "next/navigation";
import { useModalContext } from "@/context/ModalContext";
import styles from "./Button.module.css";

const Button = ({ title, href = "", className, primary, link, ...props }) => {
  const { locale } = useParams();
  const animateTransition = usePageTransition();
  const { setActiveModal } = useModalContext();

  return link ? (
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
  ) : (
    <button
      className={primary ? `${styles.primary} ${className}` : className}
      onClick={() => setActiveModal(true)}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
