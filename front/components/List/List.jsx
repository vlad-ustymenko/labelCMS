"use client";
import React, { useEffect, useRef, useState } from "react";
import AnimateText from "../AnimateText/AnimateText";
import st from "./List.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const List = ({ className, list }) => {
  const itemsRef = useRef([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    itemsRef.current.forEach((el) => {
      const borderEl = el.querySelector(`.${st.borderLine}`);
      if (!borderEl) return;

      gsap.fromTo(
        borderEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: isMobile ? "body" : "[data-scroll-container]", // якщо ти використовуєш Locomotive Scroll
            start: "top 90%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    });
  }, [isMobile]);

  return (
    <ul className={`${st.list} ${className}`}>
      {list.map((item, i) => (
        <li
          key={i}
          className={st.listItem}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <AnimateText stagger={0.2} duration={0.5}>
            {item.paragraphs}
          </AnimateText>
          <div className={st.borderLine}></div>
        </li>
      ))}
    </ul>
  );
};

export default List;
