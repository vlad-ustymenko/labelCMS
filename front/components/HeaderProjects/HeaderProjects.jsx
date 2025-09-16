"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "../../hooks/usePageTransition";
import Button from "../Button/Button";
import { useMenuContext } from "@/context/MenuContext";
import { useParams } from "next/navigation";
import st from "./HeaderProjects.module.css";

const HeaderProjects = () => {
  const { activeMenu, setActiveMenu } = useMenuContext();
  const pathname = usePathname();
  const animateTransition = usePageTransition();
  const { locale } = useParams();
  return (
    <div className={st.wrapper}>
      <Button className={st.button} title="Label" isBack link />
      <Link
        className={st.lang}
        href={
          locale === "en"
            ? `/uk${pathname.includes("projects") ? "/projects" : ""}`
            : `/en${pathname.includes("projects") ? "/projects" : ""}`
        }
        onClick={(e) => {
          e.preventDefault();
          const targetPath =
            locale === "en"
              ? `/uk${pathname.includes("projects") ? "/projects" : ""}`
              : `/en${pathname.includes("projects") ? "/projects" : ""}`;
          animateTransition(targetPath);
        }}
      >
        {locale === "en" ? "UA" : "EN"}
      </Link>
      <label className={st.hamburger}>
        <input
          type="checkbox"
          checked={activeMenu}
          onChange={() => setActiveMenu((prev) => !prev)}
        ></input>
        <svg viewBox="0 0 32 32">
          <path
            className={`${st.line} ${st.lineTopBottom}`}
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className={st.line} d="M7 16 27 16"></path>
        </svg>
      </label>
    </div>
  );
};

export default HeaderProjects;
