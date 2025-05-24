"use client";
import React, { useEffect } from "react";
import st from "./MainScreen.module.css";
import Sofa from "@/components/Sofa/Sofa";
import Button from "@/components/Button/Button";
import SpinningText from "../SpinningText/SpinningText";

import { gsap } from "gsap";

const MainScreen = ({ data }) => {
  const { slogan, companyName, companySubname, button, spinningText } = data;

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${st.mainScreen}`,
        scroller: "[data-scroll-container]",
        start: "top top",
        end: "bottom top",
        markers: true,
        scrub: true, // плавне скролювання
      },
    });

    tl.to(`.${st.title}`, {
      scale: 1.1,
      y: 100,
      transformOrigin: "left",
    })
      .to(
        `.${st.strokeTitle}`,
        { scale: 1.1, y: 100, transformOrigin: "left" },
        "<"
      )
      .to(`.${st.subtitle}`, { scale: 1.05, transformOrigin: "left" }, "<");
  }, []);

  return (
    <section className={`${st.mainScreen} main`}>
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
      <Button title={button.title} className={st.button} href={button.href} />

      <h1 className={st.title} data-scroll data-scroll-speed="-2">
        {companyName}
      </h1>
      <div className={st.strokeTitle} data-scroll data-scroll-speed="-2">
        {companyName}
        <h2 className={st.subtitle}>{companySubname}</h2>
      </div>

      <div className={st.slogan}>{slogan}</div>

      <SpinningText textArray={spinningText} className={st.spinningText} />
      <Sofa />
    </section>
  );
};

export default MainScreen;
