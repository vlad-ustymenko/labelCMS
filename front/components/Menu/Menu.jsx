"use client";
import React from "react";
import { useMenuContext } from "@/context/MenuContext";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import st from "./Menu.module.css";

const Menu = ({ data }) => {
  const { locale } = useParams();
  const animateTransition = usePageTransition();
  const { activeMenu, setActiveMenu } = useMenuContext();

  const { projectsButton, projectsHref, businessButton, businessHref, phone } =
    data;

  useEffect(() => {
    if (activeMenu) {
      document.documentElement.classList.add("bodyHidden");
    } else {
      document.documentElement.classList.remove("bodyHidden");
    }
  }, [activeMenu]);

  return (
    <div className={`${st.menu} ${activeMenu ? st.active : ""}`}>
      <Link
        href="/projects"
        onClick={(e) => {
          e.preventDefault();
          animateTransition(`/${locale}${projectsHref}`);
          setActiveMenu(false);
        }}
      >
        {projectsButton}
      </Link>
      <Link
        href="/business"
        onClick={(e) => {
          e.preventDefault();
          animateTransition(`/${locale}${businessHref}`);
          setActiveMenu(false);
        }}
      >
        {businessButton}
      </Link>
      <Link className={st.phone} href={`tel:${phone}`}>
        {phone}
      </Link>
    </div>
  );
};

export default Menu;
