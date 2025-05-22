import React from "react";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import styles from "./Button.module.css";

const Button = ({ title, className }) => {
  const animateTransition = usePageTransition();

  return (
    <Link
      href={"/projects"}
      className={`${className} ${styles.button}`}
      onClick={(e) => {
        e.preventDefault();
        document.body.classList.add("bodyHidden");
        // window.history.replaceState({ customState: true }, "", "/projects");
        animateTransition("/projects");
      }}
    >
      {title}
    </Link>
  );
};

export default Button;
