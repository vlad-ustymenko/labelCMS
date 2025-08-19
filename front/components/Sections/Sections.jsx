"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import AnimateText from "../AnimateText/AnimateText";
import List from "../List/List";
import Container from "../Container/Container";
import CountList from "../CountList/CountList";
import ReviewsCarousel from "../ReviewsCarousel/ReviewsCarousel";

import st from "./Sections.module.css";

gsap.registerPlugin(ScrollTrigger);

const Sections = ({
  data,
  about = false,
  services = false,
  achievements = false,
  reviews = false,
}) => {
  const containerRef = useRef(null);
  const aboutImageRef = useRef(null);
  const achievementsImageRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  const { title, description, highlightTitle, highlightDescription, list } =
    data;

  // мобайл
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // анімації
  useEffect(() => {
    const animations = [];

    const animateImage = (el, triggerEl, fromX, toX, fromY, toY) => {
      if (!el || !triggerEl) return;

      gsap.set(el, { x: fromX, y: fromY });

      const tween = gsap.to(el, {
        x: toX,
        y: toY,
        ease: "none",
        scrollTrigger: {
          trigger: triggerEl,
          scroller: "[data-scroll-container]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      animations.push(tween);
    };

    if (about)
      animateImage(
        aboutImageRef.current,
        containerRef.current,
        "-20%",
        "10%",
        "0%",
        "-10%"
      );
    if (achievements)
      animateImage(
        achievementsImageRef.current,
        containerRef.current,
        "0%",
        "-10%",
        "0%",
        "30%"
      );

    return () => {
      animations.forEach((tween) => tween.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [about, achievements, isMobile]);

  const getTitleFontSize = () => {
    if (about) return isMobile ? "7vw" : "4vw";
    if (services) return isMobile ? "13vw" : "9vw";
    return isMobile ? "10vw" : "7vw";
  };

  return (
    <section
      className={st.section}
      style={{ height: about ? "80vh" : undefined }}
    >
      <div
        className={st.container}
        data-scroll
        data-scroll-speed="1"
        ref={containerRef}
        style={{ height: about ? "80vh" : undefined }}
      >
        <Container>
          {about && (
            <Image
              src="/2.png"
              alt="background"
              width={1000}
              height={1000}
              className={st.background}
              ref={aboutImageRef}
            />
          )}

          {achievements && (
            <Image
              src="/house.png"
              alt="background"
              width={1000}
              height={1000}
              className={st.background2}
              ref={achievementsImageRef}
            />
          )}

          <h2 className={st.title} style={{ fontSize: getTitleFontSize() }}>
            <AnimateText
              stagger={0.1}
              duration={0.4}
              highlight={highlightTitle}
            >
              {title}
            </AnimateText>
          </h2>

          <div className={st.grid}>
            <div style={{ zIndex: 1 }} />
            <div className={st.content}>
              <AnimateText
                stagger={0.1}
                duration={0.4}
                highlight={highlightDescription}
                className={st.text}
              >
                {description}
              </AnimateText>

              {services && <List className={st.list} list={list} />}
              {achievements && <CountList className={st.list} list={list} />}
              {reviews && <ReviewsCarousel list={list} />}
            </div>
          </div>
        </Container>
      </div>

      {/* Фонові відео */}
      {services && (
        <video
          autoPlay
          muted
          playsInline
          src="/video/phones.webm"
          className={st.video}
          style={{
            left: isMobile ? "-10%" : "-5%",
            top: isMobile ? "100%" : "18%",
            zIndex: 2,
          }}
        />
      )}
      {about && (
        <video
          autoPlay
          muted
          playsInline
          src="/video/phone.webm"
          className={st.video}
        />
      )}
    </section>
  );
};

export default Sections;
