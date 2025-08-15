"use client";

import ReactMarkdown from "react-markdown";

import React, { useEffect, useRef, useState } from "react";
import AnimateText from "../AnimateText/AnimateText";
import st from "./Sections.module.css";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import List from "../List/List";
import SplitType from "split-type";
import Container from "../Container/Container";
import CountList from "../CountList/CountList";
import ReviewsCarousel from "../ReviewsCarousel/ReviewsCarousel";

gsap.registerPlugin(ScrollTrigger);

const Sections = ({
  data,
  about = false,
  services = false,
  achievements = false,
  reviews = false,
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const { title, description, highlightTitle, highlightDescription } = data;

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

  useEffect(() => {
    if (services) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Початкові стилі для картинки
    gsap.set(image, {
      x: about ? "-20%" : "10%",
      y: about ? "-20%" : "40%",
      rotate: -10,
    });

    // Анімація картинки на скролл
    gsap.to(image, {
      x: "10%",
      y: "40%",
      rotate: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        scroller: "[data-scroll-container]",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });

    // Очищення ScrollTrigger при анмаунті
    // return () => {
    //   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    // };
  }, [isMobile]);

  return (
    <section
      className={`${st.section}`}
      style={{ height: about ? "80vh" : "" }}
    >
      <div
        className={`${st.container}`}
        data-scroll
        data-scroll-speed="1"
        ref={containerRef}
        style={{ height: about ? "80vh" : "" }}
      >
        <Container>
          {about && (
            <Image
              src="/2.png"
              alt="background"
              width={1000}
              height={1000}
              className={st.background}
              ref={imageRef}
            />
          )}
          {achievements && (
            <Image
              src="/house.png"
              alt="background"
              width={1000}
              height={1000}
              className={st.background2}
              ref={imageRef}
            />
          )}
          <h2
            className={`${st.title}`}
            style={{
              fontSize: about ? "4vw" : services ? "9vw" : "7vw",
              lineHeight: about ? "4vw" : services ? "9vw" : "7vw",
            }}
          >
            <AnimateText
              stagger={0.1}
              duration={0.4}
              highlight={highlightTitle}
            >
              {title}
            </AnimateText>
          </h2>

          <div className={st.grid}>
            <div style={{ zIndex: 1 }}></div>
            <div className={st.content}>
              <AnimateText
                stagger={0.1}
                duration={0.4}
                highlight={highlightDescription}
                className={st.text}
              >
                {description}
              </AnimateText>
              {services && <List className={st.list} list={data.list}></List>}
              {achievements && (
                <CountList className={st.list} list={data.list}></CountList>
              )}
              {reviews && <ReviewsCarousel list={data.list} />}
            </div>
          </div>
        </Container>
      </div>

      {services && (
        <video
          autoPlay
          muted
          playsInline
          src="/video/phones.webm"
          className={st.video}
          style={{ left: "-5%", top: "18%", zIndex: 2 }}
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
