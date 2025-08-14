"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TextScramble() {
  const el = useRef(null);

  useEffect(() => {
    const chars = "ounawefpva9iwu8erhf"; // символи перебору
    const oldText = "Hello World";
    const newText = "Привіт Світ lwejnfiopwue niupwefpW";

    const length = Math.max(oldText.length, newText.length);
    let frame = 0;
    const framesTotal = 30; // швидкість
    const obj = { progress: 0 };

    gsap.to(obj, {
      progress: 1,
      duration: 1,
      ease: "none",
      onUpdate: () => {
        let output = "";
        for (let i = 0; i < length; i++) {
          if (Math.random() < obj.progress && newText[i]) {
            output += newText[i]; // показуємо правильну букву
          } else {
            output += chars[Math.floor(Math.random() * chars.length)] || "";
          }
        }
        el.current.textContent = output;
      },
    });
  }, []);

  return (
    <span
      ref={el}
      style={{
        display: "inline-block",
        fontFamily: "monospace",
        fontSize: "24px",
      }}
    >
      Hello World
    </span>
  );
}
