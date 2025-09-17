"use client";
import React from "react";
import { useEffect } from "react";
import st from "./Header.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useMenuContext } from "@/context/MenuContext";
import { useParams } from "next/navigation";
import Button from "../Button/Button";

const Header = ({ data }) => {
  const { activeMenu, setActiveMenu } = useMenuContext();
  const { locale } = useParams();
  const pathname = usePathname();
  const [business, setBusiness] = React.useState(false);
  const animateTransition = usePageTransition();

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
    if (pathname.includes("business")) {
      setBusiness(true);
    } else {
      setBusiness(false);
    }
  }, [pathname]);

  return (
    <div className={st.header}>
      <div className={`${st.wrapper} ${st.left}`}>
        {!business ? (
          <Link
            href={businessHref}
            onClick={(e) => {
              e.preventDefault();
              animateTransition(`/${locale}${businessHref}`);
            }}
            className={st.business}
          >
            {businessButton}
          </Link>
        ) : (
          <Link
            href={mainHref}
            onClick={(e) => {
              e.preventDefault();
              animateTransition(`/${locale}`);
            }}
            className={st.main}
          >
            {mainButton}
          </Link>
        )}
        <Link
          href={projectsHref}
          onClick={(e) => {
            e.preventDefault();
            animateTransition(`/${locale}${projectsHref}`);
          }}
          className={st.projects}
        >
          {projectsButton}
        </Link>
      </div>
      <div className={st.wrapper}>
        <Link
          className={st.lang}
          href={
            locale === "en"
              ? `/uk${business ? "/business" : ""}`
              : `/en${business ? "/business" : ""}`
          }
          onClick={(e) => {
            e.preventDefault();
            const targetPath =
              locale === "en"
                ? `/uk${business ? "/business" : ""}`
                : `/en${business ? "/business" : ""}`;
            animateTransition(targetPath);
          }}
        >
          {locale === "en" ? "UA" : "EN"}
        </Link>
        <Link className={st.phone} href={`tel:${phone}`}>
          {phone}
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
    </div>
  );
};

export default Header;
