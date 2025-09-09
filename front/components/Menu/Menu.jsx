"use client";
import React, { useEffect } from "react";
import { useMenuContext } from "@/context/MenuContext";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams, usePathname } from "next/navigation";
import st from "./Menu.module.css";

const Menu = ({ data }) => {
  const { locale } = useParams();
  const animateTransition = usePageTransition();
  const { activeMenu, setActiveMenu } = useMenuContext();
  const pathname = usePathname();

  const {
    projectsButton,
    projectsHref,
    businessButton,
    businessHref,
    mainButton,
    mainHref,
    phone,
  } = data;

  const isBusiness = pathname.includes("business");

  const handleNav = (e, href) => {
    e.preventDefault();
    animateTransition(href);
    setActiveMenu(false);
  };

  // Блокування скролу
  useEffect(() => {
    if (activeMenu) {
      document.documentElement.classList.add("bodyHidden");
    } else {
      document.documentElement.classList.remove("bodyHidden");
    }
  }, [activeMenu]);

  return (
    <nav
      className={`${st.menu} ${activeMenu ? st.active : ""}`}
      role="navigation"
      aria-label="Main menu"
    >
      {isBusiness ? (
        <Link href={mainHref} onClick={(e) => handleNav(e, `/${locale}`)}>
          {mainButton}
        </Link>
      ) : (
        <Link
          href={businessHref}
          onClick={(e) => handleNav(e, `/${locale}${businessHref}`)}
        >
          {businessButton}
        </Link>
      )}

      <Link
        href={projectsHref}
        onClick={(e) => handleNav(e, `/${locale}${projectsHref}`)}
      >
        {projectsButton}
      </Link>

      <Link className={st.phone} href={`tel:${phone}`}>
        <span aria-label="Phone number">{phone}</span>
      </Link>
    </nav>
  );
};

export default Menu;
