"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Carousel.module.css";
import Arrow from "../Arrow/Arrow";

const Carousel = ({ images, className }) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextImageSrc, setNextImageSrc] = useState(null);
  const [pendingDirection, setPendingDirection] = useState(null); // "next" or "prev"
  const [nextIndex, setNextIndex] = useState(null);
  const nextImageRef = useRef(null);

  const touchStartX = useRef(null);

  const handleNext = () => {
    if (isAnimating) return;
    const ni = (index + 1) % images.length;
    setNextImageSrc(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${images[ni].url}`
    );
    setNextIndex(ni);
    setPendingDirection("next");
    setIsAnimating(true);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const ni = (index - 1 + images.length) % images.length;
    setNextImageSrc(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${images[ni].url}`
    );
    setNextIndex(ni);
    setPendingDirection("prev");
    setIsAnimating(true);
  };

  // 🔁 Коли зображення підставлено — запускаємо анімацію
  useEffect(() => {
    if (!nextImageSrc || !pendingDirection || !nextImageRef.current) return;

    const offset = pendingDirection === "next" ? "100%" : "-100%";

    gsap.set(nextImageRef.current, { x: offset });

    gsap.to(nextImageRef.current, {
      x: "0%",
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        setIndex(nextIndex);
        setNextImageSrc(null);
        setPendingDirection(null);
        setNextIndex(null);
        setIsAnimating(false);
      },
    });
  }, [nextImageSrc, pendingDirection, nextIndex]);

  // 👉 Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // свайп вліво
      } else {
        handlePrev(); // свайп вправо
      }
    }

    touchStartX.current = null;
  };

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={{ pointerEvents: isAnimating ? "none" : "auto" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.inner}>
        {/* Поточне зображення */}
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${images[index].url}`}
          alt="current"
          fill
          className={styles.current}
        />

        {/* Наступне зображення */}
        {nextImageSrc && (
          <Image
            ref={nextImageRef}
            src={nextImageSrc}
            alt="next"
            fill
            className={styles.next}
            priority // щоб зменшити затримку
          />
        )}
      </div>

      <Arrow direction="left" onClick={handlePrev} className={styles.left} />
      <Arrow direction="right" onClick={handleNext} className={styles.right} />
    </div>
  );
};

export default Carousel;
