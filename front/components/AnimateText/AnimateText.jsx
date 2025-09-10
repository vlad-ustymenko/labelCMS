"use client";
import React, { useEffect, useRef, useState } from "react";
import st from "./AnimateText.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AnimateText = ({
  children,
  className,
  duration = 0.6,
  stagger = 0.1,
  highlight,
  firstWord,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const splitRef = useRef([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Анімація тексту
  useEffect(() => {
    if (!containerRef.current) return;

    // очищаємо попередні SplitType
    splitRef.current.forEach((split) => split.revert());
    splitRef.current = [];

    const spans = containerRef.current.querySelectorAll(`.${st.splitText}`);
    const allLines = [];

    spans.forEach((span) => {
      const split = new SplitType(span, { types: "lines" });
      splitRef.current.push(split);
      allLines.push(...split.lines);
    });

    if (allLines.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: isMobile ? "body" : "[data-scroll-container]",
          start: "top bottom",
          toggleActions: "restart none none reverse",
        },
      });

      tl.from(allLines, {
        rotateZ: -5,
        scaleY: 0,
        transformOrigin: "top left",
        duration,
        stagger,
      });
    }

    return () => {
      // очищаємо SplitType і ScrollTrigger при анмаунті
      splitRef.current.forEach((split) => split.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, duration, stagger]);

  if (!children) return null;

  // Функція підсвічування тексту
  const getHighlightedText = (text) => {
    if (firstWord) {
      const [first, ...rest] = text.split(" ");
      return (
        <>
          <span className={st.highlight}>{first}</span> {rest.join(" ")}
        </>
      );
    }

    if (!highlight) return text;

    const words = highlight.split(" ").filter(Boolean);
    return text.split(/(\s+)/).map((part, idx) =>
      words.includes(part) ? (
        <span key={idx} className={st.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className={className}>
      {children.split("\n").map((line, index) => (
        <div
          key={index}
          className={st.splitText}
          style={{ overflow: "hidden" }}
        >
          {getHighlightedText(line)}
        </div>
      ))}
    </div>
  );
};

export default AnimateText;
