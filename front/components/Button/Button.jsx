"use client";
import React from "react";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams } from "next/navigation";
import styles from "./Button.module.css";

const Button = ({ title, href = "", isBack = false, className }) => {
  const { locale } = useParams();
  const animateTransition = usePageTransition();

  return (
    <Link
      href={`/${locale}${href}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        // document.body.classList.add("bodyHidden");
        // window.history.replaceState({ customState: true }, "", "/projects");
        // animateTransition(`/${locale}${href}`);
        if (isBack) {
          animateTransition(`/${locale}${href}`);
          setTimeout(() => {
            document.body.classList.remove("bodyHidden");
          }, 3000);
        } else {
          document.body.classList.add("bodyHidden");
          animateTransition(`/${locale}${href}`);
        }
      }}
    >
      {title}
    </Link>
  );
};

export default Button;
