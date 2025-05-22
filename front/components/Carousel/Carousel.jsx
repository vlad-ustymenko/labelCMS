"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Carousel.module.css";

const images = ["/background.png", "/br_1.jpg", "/br_3.jpg"];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const nextImageRef = useRef(null);

  // 👉 Встановлюємо початкову позицію для nextImage
  useEffect(() => {
    if (nextImageRef.current) {
      gsap.set(nextImageRef.current, { x: "100%" });
    }
  }, []);

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    const nextIndex = (index + 1) % images.length;
    const nextImg = nextImageRef.current;

    gsap.set(nextImg, { x: "100%" });

    gsap.to(nextImg, {
      x: "0%",
      duration: 1,
      ease: "power8.out",
      onComplete: () => {
        setTimeout(() => {
          setIndex(nextIndex);
          gsap.set(nextImg, { x: "100%" });
          setIsAnimating(false);
        }, 50);
      },
    });
  };

  // 🔁 Автоперегортання
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 3000); // 1000 мс = 1 секунда

    return () => clearInterval(interval); // 🧹 Очищення
  }, [isAnimating, index]);

  return (
    <div
      className={styles.wrapper}
      onClick={handleNext}
      style={{ pointerEvents: isAnimating ? "none" : "auto" }}
    >
      <div className={styles.inner} ref={containerRef}>
        <Image
          src={images[index]}
          alt="current"
          fill
          className={styles.current}
          draggable={false}
        />
        <Image
          ref={nextImageRef}
          src={images[(index + 1) % images.length]}
          alt="next"
          fill
          className={styles.next}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Carousel;
