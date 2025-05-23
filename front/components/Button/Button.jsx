import React from "react";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams } from "next/navigation";
import styles from "./Button.module.css";

const Button = ({ title, href, className }) => {
  const { locale } = useParams();
  const animateTransition = usePageTransition();

  return (
    <Link
      href={`/${locale}${href}`}
      className={`${className} ${styles.button}`}
      onClick={(e) => {
        e.preventDefault();
        document.body.classList.add("bodyHidden");
        // window.history.replaceState({ customState: true }, "", "/projects");
        animateTransition(`/${locale}${href}`);
      }}
    >
      {title}
    </Link>
  );
};

export default Button;
