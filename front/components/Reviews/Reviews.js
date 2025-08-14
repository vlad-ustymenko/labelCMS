"use client";

import ReactMarkdown from "react-markdown";

import React, { useEffect, useRef, useState } from "react";
import AnimateText from "../AnimateText/AnimateText";
import st from "./Reviews.module.css";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Container from "../Container/Container";
import List from "../List/List";
import ReviewsCard from "../ReviewsCard/ReviewsCard";
import ReviewsCarousel from "../ReviewsCarousel/ReviewsCarousel";

gsap.registerPlugin(ScrollTrigger);

const Reviews = ({ data }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  const { title, description, highlightTitle, list } = data;

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
    <section
      className={st.container}
      data-scroll
      data-scroll-speed="1"
      ref={containerRef}
    >
      <Container>
        <h2 className={`${st.title}`}>
          <AnimateText stagger={0.1} duration={0.4} highlight={highlightTitle}>
            {title}
          </AnimateText>
        </h2>

        <div className={st.grid}>
          <div style={{ zIndex: 1 }}></div>
          <div className={st.content}>
            <AnimateText stagger={0.1} duration={0.4} className={st.text}>
              {description}
            </AnimateText>
            <ReviewsCarousel list={list} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Reviews;
