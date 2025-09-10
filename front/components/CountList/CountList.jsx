"use client";

import React, { useEffect, useRef, useState } from "react";
import AnimateText from "../AnimateText/AnimateText";
import st from "./CountList.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CountList = ({ list, className }) => {
  const itemsRefs = useRef([]);
  itemsRefs.current = [];
  const [isMobile, setIsMobile] = useState(false);

  const setRefs = (el, index) => {
    itemsRefs.current[index] = el;
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const createScrollTrigger = (el) => ({
        trigger: el,
        scroller: isMobile ? "body" : "[data-scroll-container]",
        start: "top bottom",
        toggleActions: "restart none none reverse",
      });

      itemsRefs.current.forEach((itemEl) => {
        if (!itemEl) return;

        const numberEl = itemEl.querySelector(`.${st.number}`);
        const symbolEl = itemEl.querySelector(`.${st.symbol}`);
        const borderEl = itemEl.querySelector(`.${st.borderLine}`);

        if (borderEl) {
          gsap.fromTo(
            borderEl,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 2,
              ease: "power3.out",
              scrollTrigger: createScrollTrigger(borderEl),
            }
          );
        }

        if (numberEl) {
          const targetValue = parseInt(numberEl.dataset.value, 10);
          gsap.fromTo(
            numberEl,
            { textContent: 0, opacity: 0 },
            {
              textContent: targetValue,
              opacity: 1,
              duration: 2,
              ease: "power3.out",
              snap: { textContent: 1 },
              modifiers: {
                textContent: (value) =>
                  parseInt(value, 10).toLocaleString("uk-UA"),
              },
              scrollTrigger: createScrollTrigger(borderEl),
            }
          );
        }

        if (symbolEl) {
          gsap.fromTo(
            symbolEl,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 2,
              ease: "power3.out",
              scrollTrigger: createScrollTrigger(borderEl),
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <ul className={`${st.list} ${className}`}>
      {list.map((item, i) => (
        <li key={i} className={st.listItem} ref={(el) => setRefs(el, i)}>
          <div className={st.counterWrapper}>
            <div className={st.counter}>
              <span className={st.number} data-value={item.count}>
                {item.count}
              </span>
              <span className={st.symbol}>{item.symbol}</span>
            </div>
            <AnimateText stagger={0.2} duration={0.5} className={st.text}>
              {item.text}
            </AnimateText>
          </div>
          <div className={st.borderLine}></div>
        </li>
      ))}
    </ul>
  );
};

export default CountList;
