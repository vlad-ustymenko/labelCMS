"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Carousel.module.css";

// const images = ["/background.png", "/br_1.jpg", "/br_3.jpg"];

const Carousel = ({ images, className }) => {
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
    if (images.length === 1) {
      return;
    } else {
      const interval = setInterval(() => {
        if (!isAnimating) {
          handleNext();
        }
      }, 3000); // 1000 мс = 1 секунда

      return () => clearInterval(interval); // 🧹 Очищення
    }
  }, [isAnimating, index]);

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      onClick={handleNext}
      style={{ pointerEvents: isAnimating ? "none" : "auto" }}
    >
      <div className={styles.inner} ref={containerRef}>
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${images[index].url}`}
          alt="current"
          fill
          className={styles.current}
        />
        <Image
          ref={nextImageRef}
          src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${
            images[(index + 1) % images.length].url
          }`}
          alt="next"
          fill
          className={styles.next}
        />
      </div>
    </div>
  );
};

export default Carousel;
