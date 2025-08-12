"use client";
import React, { useEffect, useRef, useState } from "react";
import AnimateText from "../AnimateText/AnimateText";
import st from "./CountList.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CountList = ({ list, className }) => {
  const itemsRef = useRef([]);
  const numberRefs = useRef([]);
  const symbolRefs = useRef([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // Анімація бордерів
    itemsRef.current.forEach((el, index) => {
      const itemsEl = itemsRef.current[index].querySelector(
        `.${st.borderLine}`
      );
      if (!itemsEl) return;

      gsap.fromTo(
        itemsEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemsEl,
            scroller: isMobile ? "body" : "[data-scroll-container]",
            start: "top 90%",
            toggleActions: "restart none none reverse",
            markers: true,
          },
        }
      );
    });

    // Анімація чисел
    numberRefs.current.forEach((el, index) => {
      const numberEl = itemsRef.current[index].querySelector(
        `.${st.borderLine}`
      );

      if (!el) return;

      const targetValue = parseInt(el.dataset.value, 10);
      gsap.fromTo(
        el,
        { textContent: 0, opacity: 0 },
        {
          textContent: targetValue,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          snap: { textContent: 1 },
          modifiers: {
            textContent: (value) => parseInt(value, 10).toLocaleString("uk-UA"),
          },
          scrollTrigger: {
            trigger: numberEl,
            scroller: isMobile ? "body" : "[data-scroll-container]",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
            once: false,
          },
        }
      );
    });

    // Анімація символів
    symbolRefs.current.forEach((el, index) => {
      const symbolEl = itemsRef.current[index].querySelector(
        `.${st.borderLine}`
      );
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: symbolEl,
            scroller: isMobile ? "body" : "[data-scroll-container]",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
            once: false,
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
          <div className={st.counterWrapper}>
            <div className={st.counter}>
              <span
                className={st.number}
                ref={(el) => (numberRefs.current[i] = el)}
                data-value={item.count}
              >
                {item.count}
              </span>
              <span
                className={st.symbol}
                ref={(el) => (symbolRefs.current[i] = el)}
              >
                {item.symbol}
              </span>
            </div>
            <AnimateText stagger={0.2} duration={0.5} className={st.text}>
              {item.text}
            </AnimateText>
            {/* <div className={st.text}></div> */}
          </div>
          <div className={st.borderLine}></div>
        </li>
      ))}
    </ul>
  );
};

export default CountList;
