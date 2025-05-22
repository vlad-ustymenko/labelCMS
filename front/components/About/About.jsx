"use client";

import ReactMarkdown from "react-markdown";

import React, { useEffect, useRef, useState } from "react";
import AnimateText from "../AnimateText/AnimateText";
import st from "./About.module.css";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const About = ({ data }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const { title, description, text } = data.data;

  // console.log(text);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const image = imageRef.current;
  //   if (!container || !image) return;

  //   const spans = container.querySelectorAll(`.${st.splitText}`);
  //   const allCharSpans = [];
  //   const allH2Lines = [];

  //   spans.forEach((span) => {
  //     const isH2 = span.tagName.toLowerCase() === "h2";

  //     if (isH2) {
  //       // Для h2: збираємо всі лінії в масив
  //       const split = new SplitType(span, { types: "lines" });
  //       allH2Lines.push(...split.lines);
  //     } else {
  //       // Для тексту в .text: розбивка на букви
  //       const split = new SplitType(span, { types: "lines, words, chars" });
  //       allCharSpans.push(...split.chars);
  //     }
  //   });

  //   // Анімація h2 — всі лінії послідовно
  //   if (allH2Lines.length > 0) {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: ".about",
  //         scroller: isMobile ? "body" : "[data-scroll-container]",
  //         start: "top 80%",
  //         toggleActions: "restart none none reverse",
  //       },
  //     });

  //     tl.from(allH2Lines, {
  //       // y: -50,
  //       rotateZ: -5,
  //       scaleY: 0,
  //       transformOrigin: "top left",
  //       // opacity: 0,
  //       duration: 0.4,
  //       stagger: 0.1,
  //     });
  //   }

  //   // Анімація по буквах — всі букви з усіх спанів у .text
  //   if (allCharSpans.length > 0) {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: `.${st.text}`,
  //         scroller: isMobile ? "body" : "[data-scroll-container]",
  //         start: "top 80%",
  //         toggleActions: "restart none none reverse",
  //       },
  //     });

  //     tl.from(allCharSpans, {
  //       scaleY: 0,
  //       y: -10,
  //       transformOrigin: "top",
  //       opacity: 0,
  //       stagger: 0.02,
  //       duration: 0.2,
  //     });
  //   }

  //   // Початкові стилі для картинки
  //   gsap.set(image, {
  //     x: "0%",
  //     y: "0%",
  //     rotate: -10,
  //   });

  //   // Анімація картинки на скролл
  //   gsap.to(image, {
  //     x: "5%",
  //     y: "5%",
  //     rotate: 0,
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: ".about",
  //       scroller: "[data-scroll-container]",
  //       start: "top 80%",
  //       end: "bottom top",
  //       scrub: true,
  //     },
  //   });

  //   // Очищення ScrollTrigger при анмаунті
  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, [isMobile]);

  return (
    <div
      style={{ height: "100vh", position: "relative" }}
      className="about"
      data-scroll
      data-scroll-speed="1"
      ref={containerRef}
    >
      <Image
        src="/2.png"
        alt="background"
        width={1000}
        height={1000}
        className={st.background}
        ref={imageRef}
      />
      <h2 className={`${st.wrapper}`}>
        <AnimateText>{text}</AnimateText>
      </h2>

      <div className={st.grid}>
        <div style={{ zIndex: 1 }}></div>
        <div className={st.text}>
          <AnimateText>{description}</AnimateText>
        </div>
      </div>
    </div>
  );
};

export default About;
