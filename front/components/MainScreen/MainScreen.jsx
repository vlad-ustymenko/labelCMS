"use client";
import React, { useEffect } from "react";
import styles from "./MainScreen.module.css";
import Sofa from "@/components/Sofa/Sofa";
import Button from "@/components/Button/Button";
import SpinningText from "../SpinningText/SpinningText";

import { gsap } from "gsap";

const MainScreen = ({ data }) => {
  const { slogan, companyName, companySubname, button, spinningText } = data;

  useEffect(() => {
    gsap.to(".title", {
      letterSpacing: "0px",
      ease: "power2.out",
      delay: 1,
      duration: 2,
    });
    gsap.to(".title2", {
      letterSpacing: "0px",
      ease: "power2.out",
      delay: 1,
      duration: 2,
    });
    gsap.to(".subtitle", {
      letterSpacing: "0px",
      ease: "power2.out",
      delay: 1,
      duration: 2,
    });

    gsap.to(".subtitle", {
      letterSpacing: "0px",
      ease: "power2.out",
      delay: 1,
      duration: 2,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.mainScreen}`,
        scroller: "[data-scroll-container]",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(".title", { letterSpacing: "10px" })
      .to(".title2", { letterSpacing: "10px" }, "<")
      .to(".subtitle", { letterSpacing: "10px" }, "<");
  }, []);

  return (
    <section className={`${styles.mainScreen} main`}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "2",
        }}
      ></div>
      <Button
        title={button.title}
        className={styles.button}
        href={button.href}
      />

      <h1 className="title" data-scroll data-scroll-speed="-2">
        {companyName}
      </h1>
      <div className="title2" data-scroll data-scroll-speed="-2">
        {companyName}
        <h2 className="subtitle">{companySubname}</h2>
      </div>

      <div className="subtitle2">{slogan}</div>

      <SpinningText textArray={spinningText} className={styles.spinningText} />
      <Sofa />
    </section>
  );
};

export default MainScreen;
