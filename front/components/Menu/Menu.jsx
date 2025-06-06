"use client";
import React from "react";
import { useMenuContext } from "@/context/MenuContext";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams } from "next/navigation";

import st from "./Menu.module.css";

const Menu = () => {
  const { locale } = useParams();
  const animateTransition = usePageTransition();
  const { activeMenu, setActiveMenu } = useMenuContext();
  return (
    <div className={`${st.menu} ${activeMenu ? st.active : ""}`}>
      <Link
        href="/en/projects"
        onClick={(e) => {
          e.preventDefault();
          animateTransition(`/${locale}/projects`);
          setActiveMenu(false);
        }}
      >
        Проекти
      </Link>
      <Link
        href="/business"
        onClick={(e) => {
          e.preventDefault();
          animateTransition(`/${locale}/bisiness`);
          setActiveMenu(false);
        }}
      >
        Для бізнесу
      </Link>
      <Link className={st.phone} href="tel:+380660084031">
        +380660084031
      </Link>
    </div>
  );
};

export default Menu;
