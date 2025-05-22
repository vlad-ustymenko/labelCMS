"use client";
import React, { useEffect, useRef, useState } from "react";
import st from "./AnimateText.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AnimateText = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

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
    if (!containerRef.current) return;

    const spans = containerRef.current.querySelectorAll(`.${st.splitText}`);
    const allH2Lines = [];

    spans.forEach((span) => {
      const split = new SplitType(span, { types: "lines" });
      allH2Lines.push(...split.lines);
    });

    if (allH2Lines.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: isMobile ? "body" : "[data-scroll-container]",
          start: "top 80%",
          markers: true,
          toggleActions: "restart none none reverse",
        },
      });

      tl.from(allH2Lines, {
        rotateZ: -5,
        scaleY: 0,
        transformOrigin: "top left",
        duration: 0.4,
        stagger: 0.1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div ref={containerRef}>
      {children.split("\n").map((line, index) => (
        <div key={index} className={st.splitText}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default AnimateText;
