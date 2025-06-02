"use client";
import React from "react";
import { useEffect } from "react";
import st from "./Header.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams } from "next/navigation";

const Header = () => {
  const { locale } = useParams();
  const pathname = usePathname();
  const animateTransition = usePageTransition();
  return (
    <div className={st.header}>
      <div className={st.wrapper}>
        <Link
          href="/en/projects"
          onClick={(e) => {
            e.preventDefault();
            animateTransition(`/${locale}/projects`);
          }}
        >
          Проекти
        </Link>
        <Link
          href="/business"
          onClick={(e) => {
            e.preventDefault();
            animateTransition(`/${locale}/bisiness`);
          }}
        >
          Для бізнесу
        </Link>
      </div>
      <div className={st.wrapper}>
        <Link
          href={pathname === "/en" ? "/uk" : "/en"}
          onClick={(e) => {
            e.preventDefault();
            animateTransition(`/${locale === "en" ? "uk" : "en"}`);
          }}
        >
          {locale === "en" ? "UA" : "EN"}
        </Link>
        <Link href="tel:+380660084031">+380660084031</Link>
      </div>
    </div>
  );
};

export default Header;
