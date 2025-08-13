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

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const spans = containerRef.current.querySelectorAll(`.${st.splitText}`);
    const allLines = [];

    spans.forEach((span) => {
      const split = new SplitType(span, { types: "lines" });
      allLines.push(...split.lines);
    });

    if (allLines.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: isMobile ? "body" : "[data-scroll-container]",
          start: "top 90%",
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, duration, stagger]);

  if (!children) return null;

  const getHighlightedText = (text) => {
    if (firstWord) {
      const [first, ...rest] = text.split(" ");
      return (
        <>
          <span className={st.highlight}>{first}</span>
          {rest.length > 0 ? " " + rest.join(" ") : ""}
        </>
      );
    }
    if (!highlight) return text;

    const words = highlight
      // .split(/[^\p{L}\p{N}]+/u) // Розділяє по всьому, що НЕ літера і НЕ цифра\
      .split(/([ -]+)/)
      .map((w) => w.trim())
      .filter(Boolean);

    if (words.length === 0) return text;

    const parts = text.match(/[\p{L}\p{N}]+|[^\p{L}\p{N}]/gu) || [];

    return parts.map((part, index) =>
      words.some((word) => part === word) ? (
        <span key={index} className={st.highlight}>
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
