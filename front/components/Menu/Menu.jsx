"use client";
import React from "react";
import { useMenuContext } from "@/context/MenuContext";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import st from "./Menu.module.css";

const Menu = ({ data }) => {
  const { locale } = useParams();
  const animateTransition = usePageTransition();
  const { activeMenu, setActiveMenu } = useMenuContext();
  const [business, setBusiness] = React.useState(false);
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

  useEffect(() => {
    if (activeMenu) {
      document.documentElement.classList.add("bodyHidden");
    } else {
      document.documentElement.classList.remove("bodyHidden");
    }
  }, [activeMenu]);

  useEffect(() => {
    if (pathname.includes("business")) {
      setBusiness(true);
    } else {
      setBusiness(false);
    }
  }, [pathname]);

  return (
    <div className={`${st.menu} ${activeMenu ? st.active : ""}`}>
      {business ? (
        <Link
          href={mainHref}
          onClick={(e) => {
            e.preventDefault();
            animateTransition(`/${locale}`);
            setTimeout(() => {
              setActiveMenu(false);
            }, 900);
          }}
        >
          {mainButton}
        </Link>
      ) : (
        <Link
          href={businessHref}
          onClick={(e) => {
            e.preventDefault();
            animateTransition(`/${locale}${businessHref}`);
            setTimeout(() => {
              setActiveMenu(false);
            }, 900);
          }}
        >
          {businessButton}
        </Link>
      )}
      <Link
        href={projectsHref}
        onClick={(e) => {
          e.preventDefault();
          animateTransition(`/${locale}${projectsHref}`);
          setTimeout(() => {
            setActiveMenu(false);
          }, 900);
        }}
      >
        {projectsButton}
      </Link>

      <Link className={st.phone} href={`tel:${phone}`}>
        {phone}
      </Link>
    </div>
  );
};

export default Menu;
