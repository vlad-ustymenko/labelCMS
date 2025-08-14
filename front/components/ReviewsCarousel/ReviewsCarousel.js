"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import gsap from "gsap";
import styles from "./ReviewsCarousel.module.css";

export default function ReviewsCarousel({ list }) {
  const [index, setIndex] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const cardsRef = useRef([]);

  // відслідковуємо ширину
  useEffect(() => {
    const updateWidth = () => setViewWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // позиції слайдів залежно від розміру
  const positions = useMemo(() => {
    const configs = {
      mobile: [
        { scale: 0.6, x: -80, opacity: 0, zIndex: 3 },
        { scale: 0.8, x: -40, opacity: 0.6, zIndex: 4 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 40, opacity: 0.6, zIndex: 4 },
        { scale: 0.6, x: 80, opacity: 0, zIndex: 3 },
      ],
      desktop: [
        { scale: 0.6, x: -500, opacity: 0, zIndex: 3 },
        { scale: 0.8, x: -250, opacity: 0.6, zIndex: 4 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 250, opacity: 0.6, zIndex: 4 },
        { scale: 0.6, x: 500, opacity: 0, zIndex: 3 },
      ],
      tablet: [
        { scale: 0.6, x: -300, opacity: 0, zIndex: 3 },
        { scale: 0.8, x: -200, opacity: 0.6, zIndex: 4 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 200, opacity: 0.6, zIndex: 4 },
        { scale: 0.6, x: 300, opacity: 0, zIndex: 3 },
      ],
    };
    return viewWidth < 768
      ? configs.mobile
      : viewWidth > 1919
      ? configs.desktop
      : configs.tablet;
  }, [viewWidth]);

  // обчислюємо позицію для слайда
  const getPosition = useCallback(
    (i) => (i - index + list.length) % list.length,
    [index, list.length]
  );

  // анімація при зміні index
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const posIndex = getPosition(i);
      const { scale, x, opacity, zIndex } = positions[posIndex];

      gsap.to(card, {
        scale,
        x,
        opacity,
        duration: 0.6,
        ease: "power2.inOut",
      });
      card.style.zIndex = String(zIndex);
    });
  }, [index, positions, getPosition]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.carousel}>
        {list.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={styles.card}
          >
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.content}>{card.content}</p>
            <span className={styles.company}>{card.company}</span>
          </div>
        ))}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-left-icon lucide-chevron-left ${styles.prev}`}
          onClick={handlePrev}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-right-icon lucide-chevron-right ${styles.next}`}
          onClick={handleNext}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        {/* <button onClick={handlePrev} className={styles.prev}>
          Назад
        </button> */}
        {/* <button onClick={handleNext} className={styles.next}>
          Вперед
        </button> */}
      </div>

      <div className={styles.controls}></div>
    </div>
  );
}
