"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AnimateText from "../AnimateText/AnimateText";
import List from "../List/List";
import Container from "../Container/Container";
import CountList from "../CountList/CountList";
import ReviewsCarousel from "../ReviewsCarousel/ReviewsCarousel";
import Button from "../Button/Button";

import st from "./Sections.module.css";

gsap.registerPlugin(ScrollTrigger);

const Sections = ({
  data,
  about = false,
  services = false,
  achievements = false,
  reviews = false,
  approaches = false,
  business = false,
}) => {
  const containerRef = useRef(null);
  const aboutImageRef = useRef(null);
  const achievementsImageRef = useRef(null);

  const pathname = usePathname();

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
          scroller: isMobile ? "body" : "[data-scroll-container]",
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
        "0"
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
  }, [isMobile]);

  return (
    <section
      className={`${st.section} ${about && st.about} ${
        services && st.services
      } ${achievements && st.achievements} ${reviews && st.reviews} ${
        approaches && st.approaches
      } ${business && st.business}`}
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
              loading="lazy"
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
              loading="lazy"
            />
          )}

          {services && (
            <Image
              src={
                pathname.includes("business")
                  ? "/apartment.png"
                  : "/apartment3.png"
              }
              alt="background"
              width={1000}
              height={1000}
              className={st.background3}
              ref={achievementsImageRef}
              loading="lazy"
            />
          )}

          <h2
            className={`${st.title} ${about && st.aboutTitle} ${
              services && st.servicesTitle
            } ${achievements && st.achievementsTitle} ${
              reviews && st.reviewsTitle
            } ${approaches && st.approachesTitle} ${
              business && st.businessTitle
            } ${reviews && st.reviewsTitle} ${business && st.businessTitle}`}
          >
            <AnimateText
              stagger={0.1}
              duration={0.4}
              highlight={highlightTitle}
            >
              {title}
            </AnimateText>
          </h2>
          {/* {services && !pathname.includes("business") && (
            <Button
              title="Замовити консультацію"
              primary
              className={st.button}
              data-scroll
              data-scroll-speed="-1"
            ></Button>
          )} */}

          <div className={st.grid}>
            <div
              style={{
                zIndex: 1,
                marginTop: services ? (isMobile ? "20vw" : "1.5vw") : undefined,
              }}
            />
            <div className={st.content}>
              <AnimateText
                stagger={0.1}
                duration={0.4}
                highlight={highlightDescription}
                className={st.text}
              >
                {description}
              </AnimateText>
              {(services || approaches || business) && (
                <List className={st.list} list={list} />
              )}
              {achievements && <CountList className={st.list} list={list} />}
              {reviews && <ReviewsCarousel list={list} />}
            </div>
          </div>
        </Container>
      </div>
      {services && !pathname.includes("business") && (
        <Button
          title="Замовити консультацію"
          primary
          className={st.button}
          data-scroll
          data-scroll-speed="-1"
        />
      )}
      {/* Фонові відео */}
      {(services || business) && (
        <video
          autoPlay
          muted
          playsInline
          src="/video/phones.webm"
          className={st.video}
          style={{
            left: isMobile ? "-10%" : "-5%",
            top: isMobile ? "100%" : business ? "0" : "18%",
            zIndex: 2,
          }}
        />
      )}
      {(reviews || approaches) && (
        <video
          autoPlay
          muted
          playsInline
          src="/video/tablet.webm"
          className={st.video}
          style={{
            left: isMobile ? "-10%" : "-5%",
            top: isMobile ? "85%" : "0",
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
