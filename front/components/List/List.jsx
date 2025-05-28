"use client";
import React, { useEffect, useRef } from "react";
import AnimateText from "../AnimateText/AnimateText";
import st from "./List.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const List = ({ className, list }) => {
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((el) => {
      const borderEl = el.querySelector(`.${st.borderLine}`);
      if (!borderEl) return;

      gsap.fromTo(
        borderEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller: "[data-scroll-container]", // якщо ти використовуєш Locomotive Scroll
            start: "top 90%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <ul className={`${st.list} ${className}`}>
      {list.map((item, i) => (
        <li
          key={i}
          className={st.listItem}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <AnimateText>{item.paragraphs}</AnimateText>
          <div className={st.borderLine}></div>
        </li>
      ))}
    </ul>
  );
};

export default List;
