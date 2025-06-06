"use client";
import React, { useEffect, useRef, useState } from "react";
import st from "./MainScreen.module.css";
import Sofa from "@/components/Sofa/Sofa";
import SofaVideo from "../SofaVideo/SofaVideo";
import Header from "../Header/Header";
import Button from "@/components/Button/Button";
import SpinningText from "../SpinningText/SpinningText";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWebmSupport } from "../../hooks/useWebmSupport";
import Menu from "../Menu/Menu";

gsap.registerPlugin(ScrollTrigger);

const MainScreen = ({ data }) => {
  const isWebmSupported = useWebmSupport();
  const { slogan, companyName, companySubname, button, spinningText } = data;

  useEffect(() => {
    setTimeout(() => {
      const scrollContainer =
        window.innerWidth < 768 ? "body" : "[data-scroll-container]";
      gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `.${st.mainScreen}`,
            scroller: scrollContainer,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(`.${st.title}`, {
          scale: scrollContainer === "body" ? 1.5 : 1.1,
          y: scrollContainer === "body" ? 10 : 100,
          transformOrigin: scrollContainer === "body" ? "bottom" : "left",
        })
          .to(
            `.${st.strokeTitle}`,
            {
              scale: scrollContainer === "body" ? 1.5 : 1.1,
              y: scrollContainer === "body" ? 10 : 100,
              transformOrigin: scrollContainer === "body" ? "bottom" : "left",
            },
            "<"
          )
          .to(
            `.${st.subtitle}`,
            {
              scale: scrollContainer === "body" ? 1.2 : 1.01,
              transformOrigin: scrollContainer === "body" ? "bottom" : "left",
            },
            "<"
          );
      });
      ScrollTrigger.refresh();
    }, 30);
  }, []);

  return (
    <section className={st.mainScreen}>
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
      {/* <Button
        title={button.title}
        className={st.button}
        href={button.href}
        primary
      /> */}
      <Header></Header>
      <h1 className={st.title} data-scroll data-scroll-speed="-2">
        {companyName}
      </h1>
      <div className={st.strokeTitle} data-scroll data-scroll-speed="-2">
        {companyName}
        <h2 className={st.subtitle}>{companySubname}</h2>
      </div>
      <div className={st.slogan}>{slogan}</div>
      <SpinningText textArray={spinningText} className={st.spinningText} />
      {isWebmSupported ? <SofaVideo /> : <Sofa />}
      <Menu></Menu>
    </section>
  );
};

export default MainScreen;
