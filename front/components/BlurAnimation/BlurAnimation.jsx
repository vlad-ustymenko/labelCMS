"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlurAnimation() {
  const containerRef = useRef();

  useEffect(() => {
    const words = gsap.utils.toArray(".blur-word");

    words.forEach((word) => {
      ScrollTrigger.create({
        trigger: word,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to(word, { filter: "blur(0px)", duration: 0.1 }),
        onLeave: () => gsap.to(word, { filter: "blur(10px)", duration: 0.1 }),
        onEnterBack: () =>
          gsap.to(word, { filter: "blur(0px)", duration: 0.1 }),
        onLeaveBack: () =>
          gsap.to(word, { filter: "blur(10px)", duration: 0.1 }),
      });
    });
  }, []);

  return (
    <section className="fullscreen-text" ref={containerRef}>
      <h1 className="blur-word">Перше</h1>
      <h1 className="blur-word">Друге</h1>
      <h1 className="blur-word">Третє</h1>
      <h1 className="blur-word">Четверте</h1>
    </section>
  );
}
